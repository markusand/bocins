<template>
  <Dropdown
    class="datepicker"
    v-bind="datepickerProps">
    <template #toggler>
      <div :class="['toggler', { invalid, disabled }]">
        <div v-if="isSelected(selected)" class="selected">
          <template v-if="isSelected(selected)">
            <slot v-if="Array.isArray(selected)" name="dates" :dates="selected">
              <div class="range-dates">
                <span>{{ props.formatter?.(selected[0]) ?? selected[0] }}</span>
                <Icon src="/icons/arrow-right.svg" class="separator" />
                <span>{{ props.formatter?.(selected[1]) ?? selected[1] }}</span>
              </div>
            </slot>
            <slot v-else name="date" :date="selected">
              {{ props.formatter?.(selected) || selected }}
            </slot>
          </template>
        </div>
        <div v-else class="placeholder">
          <slot name="placeholder">{{ props.placeholder || 'Select date' }}</slot>
        </div>
        <Icon
          v-if="props.clearable && isSelected(selected)"
          src="/icons/close.svg"
          @click.prevent="clear" />
        <Icon v-else src="/icons/chevron-down.svg" />
      </div>
    </template>
    <Calendar v-model="selected" v-bind="props">
      <template #day="{ day }">
        <slot name="day" :day="day" />
      </template>
    </Calendar>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Dropdown from './Dropdown.vue';
import Calendar, { type CalendarProps, type SelectedDate } from './Calendar.vue';
import Icon from './Icon.vue';

export type { SelectedDate };

export type DatePickerProps = {
  formatter?: (date: Date) => string;
  block?: boolean;
  width?: number | string;
  placeholder?: string;
  clearable?: boolean;
  top?: boolean;
  right?: boolean;
} & CalendarProps;

const props = defineProps<DatePickerProps>();

const datepickerProps = computed(() => {
  const { disabled, block, width, top, right } = props;
  return { disabled, block, width, top, right };
});

defineSlots<{
  date?: (props: { date: Date }) => void;
  dates?: (props: { dates: [Date, Date] }) => void;
  separator?: () => void;
  placeholder?: () => void;
  day?: (props: { day: Date }) => void;
}>();

const selected = defineModel<SelectedDate>();

const isSelected = (item: SelectedDate): item is Date | [Date, Date] => {
  return Array.isArray(item) ? !!item.filter(Boolean).length : item != null;
};

const clear = () => {
  selected.value = Array.isArray(selected.value)
    ? [undefined, undefined]
    : undefined;
};
</script>

<style lang="scss" scoped>
@import '../styles';

.datepicker {
  .toggler { @extend %selector-toggler; }
  .calendar { @extend %panel; }

  .range-dates {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .separator { opacity: 0.25; }
}
</style>
