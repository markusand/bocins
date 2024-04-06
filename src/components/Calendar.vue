<template>
  <div :class="['calendar', { disabled }]">
    <header>
      <Button
        variant="flat"
        size="small"
        :disabled="props.disabled"
        even
        @click="month = month - 1">
        <Icon src="/@/assets/icons/chevron-right.svg" class="prev" />
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
        @click="month = month + 1">
        <Icon src="/@/assets/icons/chevron-right.svg" />
      </Button>
    </header>
    <ul class="weekdays">
      <li v-for="day in weekDays" :key="day">{{ day }}</li>
    </ul>
    <ul class="days">
      <li v-for="day in days" :key="day.getTime()" :class="['day', status(day)]">
        <slot name="day" :day="day" :select="select">
          <button @click="select(day)">
            {{ day.getDate() }}
          </button>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { toRef, computed } from 'vue';
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

export type SelectedDate = Date | undefined | [Date | undefined, Date | undefined];

export type CalendarProps = {
  notBefore?: Day;
  notAfter?: Day;
  invalid?: (Day | [Day, Day])[];
  valid?: (Day | [Day, Day])[];
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
    today: isEqual(day, new Date()),
    start: Array.isArray(selected.value)
      ? isEqual(day, selected.value[0])
      : isEqual(day, selected.value),
    end: Array.isArray(selected.value)
      ? isEqual(day, selected.value[1])
      : isEqual(day, selected.value),
    range: Array.isArray(selected.value) && isBetween(day, selected.value[0], selected.value[1]),
    off: !isBetween(day, monthStart(cursor.value), monthEnd(cursor.value), true),
    disabled: isInvalid(day),
  };
};

const weekDays = computed(() => CalendarNames.WEEKDAYS(props.locale, props.startSunday));
const months = computed(() => CalendarNames.MONTHS(props.locale));
const years = computed(() => {
  const [min, max] = props.years?.split(':') || ['-5', '+5'];
  const minYear = min.startsWith('-') ? addYears(new Date(), +min).getFullYear() : +min;
  const maxYear = max.startsWith('+') ? addYears(new Date(), +max).getFullYear() : +max;
  return [...Array(maxYear - minYear + 1)].map((_, i) => minYear + i);
});
</script>

<style lang="scss" scoped>
@import '../styles';

/* stylelint-disable no-descending-specificity */
/* stylelint-disable selector-pseudo-class-no-unknown */
.calendar {
  --spacing: 0.5rem;
  --color-accent: var(--calendar-color-highlight, #333);
  --color-accent-text: var(--calendar-color-accent-text, #fff);
  --color-range: color-mix(in srgb, var(--color-accent) 40%, transparent);
  --radius: 0.25rem;

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
      :deep(.toggler) {
        --spacing: 0;
        --border-width: 0;
      }
      :deep(.icon) { display: none; }
    }

    .prev { transform: rotate(180deg); }
  }

  .weekdays,
  .days {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px 0;
  }

  .weekdays {
    font-size: 0.65em;
    text-transform: uppercase;
    opacity: 0.5;
    text-align: center;
  }

  .day {
    button {
      all: unset;
      display: grid;
      width: 100%;
      aspect-ratio: 1;
      place-items: center;
      padding: calc(0.5 * var(--spacing));
      box-sizing: border-box;
      background: var(--color-bg);
      color: var(--color-text, inherit);
      cursor: pointer;
    }

    &.today {
      color: var(--color-accent);
      font-weight: bold;
    }
    
    &.range button { --color-bg: var(--color-range); }

    &.start,
    &.end {
      button {
        background: var(--color-accent);
        color: var(--color-accent-text);
        cursor: default;
      }
    }

    &.start,
    &:nth-child(7n + 1),
    &:not(.disabled) + .day.disabled,
    &.disabled + :not(.disabled) {
      button {
        border-top-left-radius: var(--radius);
        border-bottom-left-radius: var(--radius);
      }
    }

    &.end,
    &:nth-child(7n),
    &.disabled:has(+ .day:not(.disabled)),
    &:not(.disabled):has(+ .disabled) {
      button {
        border-top-right-radius: var(--radius);
        border-bottom-right-radius: var(--radius);
      }
    }

    &.off { opacity: 0.25; }

    &.disabled { @extend %disabled; }
  }

  &.disabled {
    @extend %disabled;
    
    .day {
      --color-bg: none;
      --color-accent: #8884;
      --color-range: #8882;
    }
  }
}
</style>
