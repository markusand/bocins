<template>
  <Dropdown
    class="b-datepicker b-input"
    :style="`width:${props.size}${isNumber(props.size) ? 'rem' : ''}`">
    <template #toggler>
      <div class="b-datepicker__label">
        <template v-if="Array.isArray(date)">
          <span v-if="date[0] || date[1]">
            <slot name="date" :date="date[0]">{{ date[0] && props.formatter(date[0]) }}</slot>
            <slot name="separator"><span class="b-datepicker__separator">-</span></slot>
            <slot name="date" :date="date[0]">{{ date[1] &&props.formatter(date[1]) }}</slot>
          </span>
          <span v-else class="b-datepicker__placeholder">{{ props.placeholder }}</span>
        </template>
        <slot v-else-if="date" name="date" :date="date">{{ props.formatter(date) }}</slot>
        <span v-else class="b-datepicker__placeholder">{{ props.placeholder }}</span>
      </div>
      <Icon
        v-if="clearable && isSelected"
        src="/icons/close.svg"
        class="b-datepicker__clear"
        @click="clear" />
      <Icon
        v-else
        src="/icons/chevron-down.svg"
        class="b-datepicker__chevron" />
    </template>
    <Calendar v-model="date" v-bind="$attrs" class="b-datepicker__calendar" />
  </Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isNumber } from '/@/utils/number';
import Dropdown from '../Dropdown.vue';
import Calendar from './Calendar.vue';
import Icon from '../Icon.vue';

type SelectedDate = Date | undefined | [Date | undefined, Date | undefined];

type Props = {
  placeholder?: string;
  clearable?: boolean;
  formatter?: (date: Date) => string;
  size?: string | number;
};

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Pick a date',
  formatter: (date: Date) => date.toLocaleDateString(),
  size: 'calc(100% - 2 * var(--margin))',
});

defineSlots<{
  date?: (props: { date: Date | undefined }) => void;
  separator?: () => void;
}>();

const date = defineModel<SelectedDate>({ required: true });

const isSelected = computed(() => {
  return Array.isArray(date.value) ? date.value[0] || date.value[1] : date.value;
});

const clear = () => {
  date.value = Array.isArray(date.value) ? [undefined, undefined] : undefined;
};
</script>
