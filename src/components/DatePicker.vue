<template>
  <Dropdown
    class="datepicker"
    v-bind="datepickerProps">
    <template #toggler>
      <div :class="['datepicker__toggler', 'is-selector-toggler', togglerModifiers]">
        <div v-if="isSelected(selected)" class="datepicker__selected">
          <template v-if="isSelected(selected)">
            <slot v-if="Array.isArray(selected)" name="dates" :dates="selected">
              <div class="datepicker__range-dates">
                <span>{{ props.formatter?.(selected[0]) ?? selected[0] }}</span>
                <Icon :src="`${config.iconPath}/arrow-right.svg`" />
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
          :src="`${config.iconPath}/close.svg`"
          @click.prevent="clear" />
        <Icon v-else :src="`${config.iconPath}/chevron-down.svg`" />
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
import { config } from '/@/config';
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

const togglerModifiers = computed(() => ({
  'datepicker__toggler--invalid': props.invalid,
  'datepicker__toggler--disabled': props.disabled,
}));

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

<style scoped>
.datepicker__range-dates {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .icon { opacity: 0.25; }
}
</style>
