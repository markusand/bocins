<template>
  <Dropdown class="datepicker">
    <div class="input" :style="`width:${props.size}${isNumber(props.size) ? 'rem' : ''}`">
      <div class="datepicker__label">
        <span v-if="date">{{ props.formatter(date) }}</span>
        <span v-else class="datepicker__placeholder">{{ props.placeholder }}</span>
      </div>
      <Icon
        v-if="clearable && date"
        src="/icons/close.svg"
        class="datepicker__clear"
        @click="clear" />
      <Icon
        v-else
        src="/icons/chevron-down.svg"
        class="datepicker__chevron" />
    </div>
    <template #dropdown>
      <Calendar v-model="date" v-bind="$attrs" class="datepicker__calendar" />
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isNumber } from '/@/utils/number';
import Dropdown from '../Dropdown.vue';
import Calendar from './Calendar.vue';
import Icon from '../Icon.vue';

type Props = {
  modelValue?: Date | undefined;
  placeholder?: string;
  clearable?: boolean;
  formatter?: (date: Date) => string;
  size?: string | number;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  placeholder: 'Pick a date',
  formatter: (date: Date) => date.toLocaleDateString(),
  size: 'calc(100% - 2 * var(--margin))',
});

const emit = defineEmits(['update:modelValue']);

const date = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const clear = () => emit('update:modelValue', undefined);
</script>

<style lang="scss" scoped>
.datepicker {
  &__label {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__clear,
  &__chevron { margin-left: 0.5em; }
  &__placeholder { opacity: 0.5; }

  &__calendar {
    border: var(--input-border, 1px solid #8886);
    border-radius: var(--input-border-radius, 4px);
    background: var(--input-background, var(--color-bg, inherit));
  }
}
</style>
