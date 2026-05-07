<template>
  <Dropdown
    class="datepicker"
    v-bind="datepickerProps">
    <template #toggler>
      <div :class="togglerClasses">
        <div v-if="isSelected(selected)" class="datepicker__selected">
          <slot v-if="Array.isArray(selected)" name="dates" :dates="selected">
            <div class="datepicker__range-dates">
              <span>{{ formatter?.(selected[0]) ?? selected[0] }}</span>
              <Icon src="arrow-right.svg" />
              <span>{{ formatter?.(selected[1]) ?? selected[1] }}</span>
            </div>
          </slot>
          <slot v-else name="date" :date="selected">
            {{ formatter?.(selected) || selected }}
          </slot>
        </div>
        <div v-else class="placeholder">
          <slot name="placeholder">{{ placeholder }}</slot>
        </div>
        <Icon
          v-if="clearable && isSelected(selected)"
          src="x.svg"
          @click.prevent="clear" />
        <Icon v-else src="chevron-down.svg" />
      </div>
    </template>
    <Calendar v-model="selected" class="is-panel" v-bind="props">
      <template #day="{ day }">
        <slot name="day" :day="day" />
      </template>
    </Calendar>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Dropdown, { type DropdownProps } from './Dropdown.vue';
import Calendar, { type CalendarProps, type SelectedDate } from './Calendar.vue';
import Icon from './Icon.vue';

export type { SelectedDate };

export type DatePickerProps = {
  formatter?: (date: Date) => string;
  placeholder?: string;
  clearable?: boolean;
  invalid?: boolean;
} & Pick<DropdownProps, 'block' | 'width' | 'top' | 'right'>
  & CalendarProps;

const props = withDefaults(defineProps<DatePickerProps>(), {
  placeholder: 'Select date',
});

const datepickerProps = computed(() => {
  const { disabled, block, width, top, right } = props;
  return { disabled, block, width, top, right };
});

const togglerClasses = computed(() => ['is-selector-toggler', {
  'is-invalid': props.invalid,
  'is-disabled': props.disabled,
}]);

defineSlots<{
  date?: (props: { date: Date }) => void;
  dates?: (props: { dates: [Date, Date] }) => void;
  separator?: () => void;
  placeholder?: () => void;
  day?: (props: { day: Date }) => void;
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
</script>

<style scoped>
.datepicker__range-dates {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .icon { opacity: 0.25; }
}
</style>
