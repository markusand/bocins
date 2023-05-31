<template>
  <div :class="['b-calendar', { disabled }]">
    <header class="b-calendar__header">
      <a href="#" class="prev" @click.prevent="prevMonth" />
      <div class="b-calendar__label">
        <Selector v-model="cursorMonth" :options="monthRange" size="auto">
          <template #default="{ item: month }">
            {{ monthFormatter.format(new Date(today.getFullYear(), month as number)) }}
          </template>
        </Selector>
        <Selector v-model="cursorYear" :options="yearRange" size="auto" />
      </div>
      <a href="#" class="next" @click.prevent="nextMonth" />
    </header>
    <ul class="b-calendar__days">
      <li
        v-for="weekday in weekdayLabels"
        :key="weekday"
        class="b-calendar__weekday">
        {{ weekday }}
      </li>
      <li
        v-for="day in days"
        :key="day.date.toISOString()"
        :class="day.classes"
        @click="select(day)">
        <slot :day="day">{{ day.label }}</slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {
  add,
  startOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  isAfter,
  isBefore,
  isWithinInterval,
} from 'date-fns';

import Selector from './Selector.vue';

type DatesList = (string | Date | (string | Date)[])[];

type Day = {
  date: Date;
  label: number;
  disabled: boolean;
  classes: (string | Record<string, boolean>)[];
};

type Props = {
  modelValue?: Date;
  disabled?: boolean;
  notBefore?: string | number | Date;
  notAfter?: string | number | Date;
  invalid?: DatesList;
  valid?: DatesList;
  locale?: string;
  yearRange?: string;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  locale: 'en',
  notBefore: undefined,
  notAfter: undefined,
  invalid: undefined,
  valid: undefined,
  yearRange: '-10:+10',
});

const emit = defineEmits<{
  'update:modelValue': [date: Date | (Date | undefined)[] | undefined],
  select: [date: Date | (Date | undefined)[] | undefined],
}>();

defineSlots<{
  default?: (props: { day: Day }) => void;
}>();

const today = new Date();
const weekdayFormatter = new Intl.DateTimeFormat(props.locale, { weekday: 'short' });
const monthFormatter = new Intl.DateTimeFormat(props.locale, { month: 'long' });

const cursor = ref(startOfMonth(props.modelValue || new Date()));
// Update cursor if date changed externally
watch(() => props.modelValue, date => cursor.value = date || new Date());

const cursorMonth = computed({
  get: () => cursor.value.getMonth(),
  set: month => cursor.value = new Date(cursor.value.setMonth(month)),
});

const cursorYear = computed({
  get: () => cursor.value.getFullYear(),
  set: year => cursor.value = new Date(cursor.value.setFullYear(year)),
});

const prevMonth = () => cursor.value = add(cursor.value, { months: -1 });
const nextMonth = () => cursor.value = add(cursor.value, { months: 1 });

const weekdayLabels = eachDayOfInterval({
  start: startOfWeek(cursor.value, { weekStartsOn: 1 }),
  end: endOfWeek(cursor.value, { weekStartsOn: 1 }),
}).map(day => weekdayFormatter.format(day));

const monthRange = [...Array(12)].map((_, i) => i);

const yearRange = computed(() => {
  const [min, max] = props.yearRange.split(':');
  const minYear = props.notBefore
    ? new Date(props.notBefore).getFullYear()
    : min.startsWith('-') ? today.getFullYear() + +min : +min;
  const maxYear = props.notAfter
    ? new Date(props.notAfter).getFullYear()
    : max.startsWith('+') ? today.getFullYear() + +max : +max;
  return [...Array(maxYear - minYear + 1)].map((_, i) => minYear + i);
});

const isDisabled = (date: Date) => {
  const { notBefore, notAfter, invalid, valid } = props;
  const isLate = notAfter ? isAfter(date, startOfDay(new Date(notAfter))) : false;
  const isEarly = notBefore ? isBefore(date, startOfDay(new Date(notBefore))) : false;
  const matchDates = (range: DatesList) => range.some(dates => {
    if (!Array.isArray(dates)) return isSameDay(date, new Date(dates));
    return isWithinInterval(date, {
      start: startOfDay(new Date(dates[0])),
      end: startOfDay(new Date(dates[1])),
    });
  });
  const inInvalidRange = matchDates(invalid || []);
  const inValidRange = props.valid ? matchDates(valid || []) : true;
  return isLate || isEarly || inInvalidRange || !inValidRange;
};

const days = computed<Day[]>(() => {
  const start = startOfWeek(startOfMonth(cursor.value), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(cursor.value), { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end }).map(date => {
    const label = date.getDate();
    const disabled = isDisabled(date);
    const classes = ['b-calendar__day', {
      'b-calendar__day--disabled': disabled,
      'b-calendar__day--outsider': !isSameMonth(date, cursor.value),
      'b-calendar__day--selected': !!props.modelValue && isSameDay(date, props.modelValue),
      'b-calendar__day--today': isSameDay(date, today),
    }];
    return { date, label, disabled, classes };
  });
});

const select = (day: Day) => {
  if (!day.disabled) {
    const value = Array.isArray(props.modelValue)
      ? [props.modelValue[1] as Date | undefined, day.date]
      : day.date;
    emit('update:modelValue', value);
    emit('select', value);
  }
};
</script>
