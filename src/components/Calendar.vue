<template>
  <div :class="classes">
    <header>
      <Button flat small even @click.prevent="month = month - 1">
        <Icon src="chevron-right.svg" />
      </Button>
      <Selector
        v-model="month" 
        :options="[...Array(12)].map((_, i) => i)"
        :formatter="i => months[i]" />
      <Selector v-model="year" :options="years" />
      <Button flat small even @click.prevent="month = month + 1">
        <Icon src="chevron-right.svg" />
      </Button>
    </header>
    <ul class="calendar__weekdays">
      <li v-for="day in weekDays" :key="day">{{ day }}</li>
    </ul>
    <ul class="calendar__days">
      <li v-for="day in days" :key="day.date.getTime()" :class="day.classes">
        <slot name="day" :day="day.date" :select="select">
          <button type="button" :disabled="day.disabled" @click.prevent="select(day.date)">
            {{ day.date.getDate() }}
          </button>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import {
  isEqual, isBefore, isAfter, isBetween,
  weekStart, weekEnd, monthStart, monthEnd,
  fromRange, addYears, CalendarNames,
  type Day,
} from '/@/utils';
import type { MaybeReadonly } from '/@/types';
import Button from './Button.vue';
import Icon from './Icon.vue';
import Selector from './Selector.vue';

export type MaybeDates = Day | [Day, Day];
export type SelectedDate = Date | [Date | undefined, Date | undefined];

export type CalendarProps = {
  notBefore?: Day;
  notAfter?: Day;
  excluded?: MaybeReadonly<MaybeDates[]>;
  allowed?: MaybeReadonly<MaybeDates[]>;
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

const props = withDefaults(defineProps<CalendarProps>(), {
  years: '-5:+5',
});

const selected = defineModel<SelectedDate>();

const classes = computed(() => ['calendar', {
  'is-disabled': props.disabled,
}]);

/* Header */
const cursor = ref<Date>(new Date());

watch(selected, date => {
  cursor.value = new Date(Array.isArray(date)
    ? date[1] ?? Date.now()
    : date ?? Date.now());
}, { immediate: true });

const month = computed({
  get: () => cursor.value.getMonth(),
  set: value => cursor.value = new Date(cursor.value.setMonth(value)),
});

const year = computed({
  get: () => cursor.value.getFullYear(),
  set: value => cursor.value = new Date(cursor.value.setFullYear(value)),
});

const weekDays = computed(() => CalendarNames.WEEKDAYS(props.locale, props.startSunday));
const months = computed(() => CalendarNames.MONTHS(props.locale));
const years = computed(() => {
  const [min, max] = props.years.split(':');
  const minYear = min.startsWith('-') ? addYears(new Date(), +min).getFullYear() : +min;
  const maxYear = max.startsWith('+') ? addYears(new Date(), +max).getFullYear() : +max;
  return [...Array(maxYear - minYear + 1)].map((_, i) => minYear + i);
});

/* Days */
const isInvalid = (date: Date): boolean => {
  const { notBefore, notAfter, excluded = [], allowed } = props;
  const match = (dates: MaybeDates) => Array.isArray(dates)
    ? isBetween(date, ...dates, true)
    : isEqual(date, dates);
  return isBefore(date, notBefore)
    || isAfter(date, notAfter)
    || excluded.some(match)
    || (allowed ? !allowed.some(match) : false);
};

const days = computed(() => {
  const start = monthStart(cursor.value);
  const end = monthEnd(cursor.value);

  const [first, last] = Array.isArray(selected.value)
    ? selected.value
    : [selected.value, selected.value];

  return fromRange(
    weekStart(start, props.startSunday),
    weekEnd(end, props.startSunday),
  ).map(day => {
    const disabled = isInvalid(day);
    return {
      date: day,
      disabled,
      classes: ['calendar__day', {
        'calendar__day--today': isEqual(day, new Date()),
        'calendar__day--start': isEqual(day, first),
        'calendar__day--end': isEqual(day, last),
        'calendar__day--range': first !== last && isBetween(day, first, last),
        'calendar__day--off': !isBetween(day, start, end, true),
        'is-disabled': disabled,
      }],
    };
  });
});

/* Selection */
let activeRange = false;
const select = (date: Date) => {
  const entry = days.value.find(day => day.date.getTime() === date.getTime());
  if (props.disabled || entry?.disabled) return;
  if (Array.isArray(selected.value)) {
    const start = activeRange ? selected.value[0] : undefined;
    selected.value = start
      ? isBefore(date, start) ? [date, start] : [start, date]
      : [date, date];
    activeRange = !activeRange;
    emit('select', [start, date]);
  } else {
    selected.value = date;
    emit('select', date);
  }
};
</script>

<style scoped>
/* stylelint-disable no-descending-specificity */
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
  position: relative;
  background: var(--color-bg);
  color: var(--color-text, currentcolor);
  
  button {
    all: unset;
    display: grid;
    width: 100%;
    aspect-ratio: 1;
    place-items: center;
    cursor: pointer;
    color: inherit;
    border-radius: var(--radius);
    padding: calc(0.5 * var(--spacing));
    box-sizing: border-box;
    
    &:is(:hover, :focus) {
      background: color-mix(in srgb, var(--color-accent, #333) 10%, transparent);
      border-radius: var(--radius);
    }
  }
}

.calendar__day--today {
  --color-text: var(--color-accent, #333);
  
  font-weight: bold;
}

.calendar__day--start,
.calendar__day--end,
.calendar__day--range {
  background: var(--color-accent, #333) !important;
  color: var(--color-text-accent, #fff);
  cursor: default;
}

.calendar__day--start,
.calendar__day:nth-child(7n + 1),
.calendar__day:not(.is-disabled) + .is-disabled,
.is-disabled + .calendar__day:not(.is-disabled) {
  border-top-left-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
}

.calendar__day--end,
.calendar__day:nth-child(7n),
.is-disabled:has(+ .calendar__day:not(.is-disabled)),
.calendar__day:not(.is-disabled):has(+ .is-disabled) {
  border-top-right-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
}

.calendar__day--off { opacity: 0.25; }
</style>
