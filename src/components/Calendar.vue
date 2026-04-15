<template>
  <div :class="['calendar', modifiers]">
    <header>
      <Button
        variant="flat"
        size="small"
        :disabled="props.disabled"
        even
        @click.prevent="month = month - 1">
        <Icon :src="`${config.iconPath}/chevron-right.svg`" />
      </Button>
      <Selector
        v-model="month" 
        :options="[...Array(12)].map((_, i) => i)"
        :formatter="i => months[i]"
        :disabled="props.disabled" />
      <Selector v-model="year" :options="years" :disabled="props.disabled" />
      <Button
        variant="flat"
        size="small"
        :disabled="props.disabled"
        even
        @click.prevent="month = month + 1">
        <Icon :src="`${config.iconPath}/chevron-right.svg`" />
      </Button>
    </header>
    <ul class="calendar__weekdays">
      <li v-for="day in weekDays" :key="day">{{ day }}</li>
    </ul>
    <ul class="calendar__days">
      <li v-for="day in days" :key="day.getTime()" :class="['calendar__day', status(day)]">
        <slot name="day" :day="day" :select="select">
          <button type="button" @click.prevent="select(day)">
            {{ day.getDate() }}
          </button>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { toRef, computed } from 'vue';
import { config } from '/@/config';
import {
  isEqual,
  isBefore,
  isAfter,
  isBetween,
  addYears,
  monthStart,
  monthEnd,
  CalendarNames,
  useCalendarCursor,
  type Day,
} from '/@/utils';
import Button from './Button.vue';
import Icon from './Icon.vue';
import Selector from './Selector.vue';
import type { MaybeReadonly } from '/@/types';

export type SelectedDate = Date | undefined | [Date | undefined, Date | undefined];

export type CalendarProps = {
  notBefore?: Day;
  notAfter?: Day;
  invalid?: MaybeReadonly<(Day | [Day, Day])[]>;
  valid?: MaybeReadonly<(Day | [Day, Day])[]>;
  locale?: string;
  years?: `${number}:${number}`;
  disabled?: boolean;
  startSunday?: boolean;
};

defineSlots<{
  day?: (props: { day: Date, select: (date: Date) => void }) => void
}>();

const emit = defineEmits<{
  select: [date: SelectedDate],
}>();

const props = defineProps<CalendarProps>();

const selected = defineModel<SelectedDate>({ required: true });
const { cursor, days, month, year } = useCalendarCursor(selected, toRef(props, 'startSunday'));

const isInvalid = (day: Date) => {
  const match = (dates: Day | [Day, Day]) => {
    return Array.isArray(dates)
      ? isBetween(day, ...dates, true)
      : isEqual(day, dates);
  };
  if (isBefore(day, props.notBefore)) return true;
  if (isAfter(day, props.notAfter)) return true;
  if (props.invalid) return props.invalid.some(match);
  if (props.valid) return !props.valid.some(match);
};

let activeRange = false;
const select = (day: Date) => {
  if (props.disabled || isInvalid(day)) return;
  if (Array.isArray(selected.value)) {
    const start = activeRange ? selected.value[0] : undefined;
    selected.value = start
      ? isBefore(day, start) ? [day, start] : [start, day]
      : [day, day];
    activeRange = !activeRange;
    emit('select', [start, day]);
  } else {
    selected.value = day;
    emit('select', day);
  }
};

const status = (day: Date) => {
  return {
    'calendar__day--today': isEqual(day, new Date()),
    'calendar__day--start': Array.isArray(selected.value)
      ? isEqual(day, selected.value[0])
      : isEqual(day, selected.value),
    'calendar__day--end': Array.isArray(selected.value)
      ? isEqual(day, selected.value[1])
      : isEqual(day, selected.value),
    'calendar__day--range': Array.isArray(selected.value) && isBetween(day, selected.value[0], selected.value[1]),
    'calendar__day--off': !isBetween(day, monthStart(cursor.value), monthEnd(cursor.value), true),
    'calendar__day--disabled': isInvalid(day),
    'is-disabled': isInvalid(day),
  };
};

const modifiers = computed(() => ({
  'calendar--disabled': props.disabled,
  'is-disabled': props.disabled,
}));

const weekDays = computed(() => CalendarNames.WEEKDAYS(props.locale, props.startSunday));
const months = computed(() => CalendarNames.MONTHS(props.locale));
const years = computed(() => {
  const [min, max] = props.years?.split(':') || ['-5', '+5'];
  const minYear = min.startsWith('-') ? addYears(new Date(), +min).getFullYear() : +min;
  const maxYear = max.startsWith('+') ? addYears(new Date(), +max).getFullYear() : +max;
  return [...Array(maxYear - minYear + 1)].map((_, i) => minYear + i);
});
</script>

<style scoped>

/* stylelint-disable no-descending-specificity */
/* stylelint-disable selector-pseudo-class-no-unknown */
.calendar {
  --spacing: var(--calendar-spacing, 0.5rem);
  --color-range: color-mix(in srgb, var(--color-accent, #333) 40%, transparent);
  --radius: var(--calendar-radius, 0.25rem);

  display: inline-flex;
  flex-direction: column;
  gap: var(--spacing);
  padding: var(--spacing);
  border-radius: var(--radius);
  background: var(--color-bg);
  color: var(--color-text, currentcolor);

  & > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .selector {
      &:deep(.selector__toggler) {
        --spacing: 0;
        --border-width: 0;
        --color-bg: none !important;
      }
      &:deep(.icon) { display: none; }
    }

    .btn:first-child .icon { transform: rotate(180deg); }
  }
}

.calendar__weekdays,
.calendar__days {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px 0;
}

.calendar__weekdays {
  font-size: 0.65em;
  text-transform: uppercase;
  opacity: 0.5;
  text-align: center;
}

.calendar__day {
  button {
    all: unset;
    display: grid;
    width: 100%;
    aspect-ratio: 1;
    place-items: center;
    padding: calc(0.5 * var(--spacing));
    box-sizing: border-box;
    background: var(--color-bg);
    cursor: pointer;
  }
}

.calendar__day--today {
  color: var(--color-accent, #333);
  font-weight: bold;
}

.calendar__day--range button { --color-bg: var(--color-range); }

.calendar__day--start,
.calendar__day--end {
  button {
    background: var(--color-accent, #333);
    color: var(--color-text-accent, #fff);
    cursor: default;
  }
}

.calendar__day--start,
.calendar__day:nth-child(7n + 1),
.calendar__day:not(.calendar__day--disabled) + .calendar__day--disabled,
.calendar__day--disabled + .calendar__day:not(.calendar__day--disabled) {
  button {
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
}

.calendar__day--end,
.calendar__day:nth-child(7n),
.calendar__day--disabled:has(+ .calendar__day:not(.calendar__day--disabled)),
.calendar__day:not(.calendar__day--disabled):has(+ .calendar__day--disabled) {
  button {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
}

.calendar__day--off { opacity: 0.25; }

.calendar--disabled {
  .calendar__day {
    --color-bg: none;
    --color: #8884;
    --color-range: #8882;
  }
}
</style>
