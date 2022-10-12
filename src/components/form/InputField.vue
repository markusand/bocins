<template>
  <span
    class="input"
    :class="classes"
    :style="`--width:${props.size}${isNumber(props.size) ? 'rem' : ''}`">
    <span v-if="props.prefix || slots.prefix" class="input__prefix">
      <slot name="prefix">{{ props.prefix }}</slot>
    </span>
    <input
      v-model="value"
      :type="props.type"
      v-bind="$attrs"
      :disabled="props.disabled">
    <Icon
      v-if="props.clearable && value"
      src="/icons/close.svg"
      class="input__clear"
      @click="clear" />
    <span v-if="props.suffix || slots.suffix" class="input__suffix">
      <slot name="suffix">{{ props.suffix }}</slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { isNumber } from '/@/utils/number';
import Icon from '../Icon.vue';

type Props = {
  modelValue: any;
  type?: string;
  class?: string | Record<string, boolean> | string[];
  prefix?: string;
  suffix?: string;
  size?: number | string;
  block?: boolean;
  clearable?: boolean;
  disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  class: undefined,
  prefix: undefined,
  suffix: undefined,
  size: 10,
});

const emit = defineEmits(['update:modelValue']);

const slots = useSlots();

const value = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue),
});

const classes = computed(() => {
  const { disabled, block } = props;
  const classArray = Array.isArray(props.class) ? props.class : [props.class];
  return [...classArray, { disabled, block }];
});

const clear = () => emit('update:modelValue', undefined);
</script>

<script lang="ts">
export default { inheritAttrs: false };
</script>
