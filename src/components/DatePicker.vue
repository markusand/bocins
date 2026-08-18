<template>
  <Dropdown class="datepicker" v-bind="props">
    <template #label>
      <span :class="togglerClasses" :style="toWidth(props.width)">
        <span v-if="isSelected(selected)" class="selected">
          <slot v-if="Array.isArray(selected)" name="dates" :dates="selected">
            <span class="range-dates">
              <span>{{ formatter?.(selected[0]) ?? selected[0] }}</span>
              <slot name="separator"><Icon src="arrow-right.svg" /></slot>
              <span>{{ formatter?.(selected[1]) ?? selected[1] }}</span>
            </span>
          </slot>
          <slot v-else name="date" :date="selected">
            {{ formatter?.(selected) || selected }}
          </slot>
        </span>
        <span v-else class="placeholder">
          <slot name="placeholder">{{ placeholder }}</slot>
        </span>
        <button
          v-if="clearable && isSelected(selected)"
          type="button"
          aria-label="Clear"
          @click.stop="clear">
          <Icon src="x.svg" />
        </button>
        <Icon v-else src="chevron-down.svg" />
      </span>
    </template>
    <div class="is-panel">
      <div
        v-if="presets || slots.presets"
        class="presets"
        @focusin="onFocusin"
        @keydown="onKeydown">
        <slot name="presets" :select>
          <template v-for="dates, name in presets" :key="name">
            <Button sm flat @click.stop="select(dates)">{{ name }}</Button>
          </template>
        </slot>
      </div>
      <Calendar v-model="selected" v-bind="props">
        <template #day="{ day }">
          <slot name="day" :day="day" />
        </template>
      </Calendar>
    </div>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Dropdown, { type DropdownProps } from './Dropdown.vue';
import Calendar, { type CalendarProps, type SelectedDate } from './Calendar.vue';
import { asDay, addDays, weekStart, monthStart, yearStart, useRovingTabindex, toWidth } from '/@/utils';
import Button from './Button.vue';
import Icon from './Icon.vue';

export type { SelectedDate };

export type DatePickerProps = {
  formatter?: (date: Date) => string;
  placeholder?: string;
  clearable?: boolean;
  invalid?: boolean;
  presets?: boolean;
} & Omit<DropdownProps, 'icon' | 'label'> & CalendarProps;

const props = withDefaults(defineProps<DatePickerProps>(), {
  placeholder: 'Select date',
  position: 'bottom-start',
});

const togglerClasses = computed(() => ['is-input', {
  'is-invalid': props.invalid,
  'is-disabled': props.disabled,
}]);

const slots = defineSlots<{
  date?: (props: { date: Date }) => void;
  dates?: (props: { dates: [Date, Date] }) => void;
  separator?: () => void;
  placeholder?: () => void;
  day?: (props: { day: Date }) => void;
  presets?: (props: { select: (dates: Date[]) => void }) => void;
}>();

const selected = defineModel<SelectedDate>();

const isSelected = (item: SelectedDate | undefined): item is Date | [Date, Date] => {
  return Array.isArray(item) ? !!item.filter(Boolean).length : item != null;
};

const clear = () => {
  selected.value = Array.isArray(selected.value)
    ? [undefined, undefined]
    : undefined;
};

const select = ([start, end]: Date[]) => {
  selected.value = end ? [asDay(start), asDay(end)] : asDay(start);
};

const presets = computed(() => {
  if (!props.presets) return null;
  const fmt = new Intl.RelativeTimeFormat(props.locale ?? 'en', { numeric: 'auto' });
  const today = new Date();
  const firstOfWeek = weekStart(today, props.startSunday);
  const firstOfMonth = monthStart();
  const firstOfYear = yearStart();
  const lastPastYear = addDays(firstOfYear, -1);
  return {
    [fmt.format(0, 'day')]: [today],
    [fmt.format(-1, 'day')]: [addDays(today, -1)],
    [fmt.format(-1, 'week')]: [weekStart(addDays(today, -7), props.startSunday), addDays(firstOfWeek, -1)],
    'WTD': [firstOfWeek, today],
    [fmt.format(-1, 'month')]: [monthStart(addDays(firstOfMonth, -1)), addDays(firstOfMonth, -1)],
    'MTD': [firstOfMonth, today],
    [fmt.format(-1, 'year')]: [yearStart(lastPastYear), lastPastYear],
    'YTD': [firstOfYear, today],
  };
});

const { onFocusin, onKeydown } = useRovingTabindex({ wrap: true });
</script>

<style scoped>
.range-dates {
  display: flex;
  align-items: center;
  gap: 0.5em;

  .icon { opacity: 0.25; }
}

.is-input {
  button {
    all: unset;
    display: flex;
    cursor: pointer;
  }
}

.is-panel {
  --border: var(--date-picker-border, 1px solid #8884);
  
  display: flex;

  .presets {
    min-height: 0;
    border-right: var(--border);
    display: flex;
    flex-direction: column;
    gap: 1px;
    overflow: auto;
    padding: 0.25em;
    white-space: nowrap;

    .btn {
      justify-content: start;
      gap: 0.5em;
      text-transform: capitalize;
    }
  }
}
</style>
