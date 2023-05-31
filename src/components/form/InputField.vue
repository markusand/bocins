<template>
  <span
    class="b-input"
    :class="classes"
    :style="`--width:${props.size}${isNumber(props.size) ? 'rem' : ''}`">
    <span v-if="props.prefix || slots.prefix" class="b-input__prefix">
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
      class="b-input__clear"
      @click="clear" />
    <span v-if="props.suffix || slots.suffix" class="b-input__suffix">
      <slot name="suffix">{{ props.suffix }}</slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isNumber } from '/@/utils/number';
import Icon from '../Icon.vue';

export type InputTypes = 'text'
| 'color'
| 'password'
| 'datetime-local'
| 'email'
| 'month'
| 'number'
| 'search'
| 'tel'
| 'time'
| 'url'
| 'week';

type Props = {
  modelValue: string;
  type?: InputTypes;
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

const emit = defineEmits<{
  'update:modelValue': [value: string],
}>();

const slots = defineSlots<{
  prefix?: (props: object) => any;
  suffix?: (props: object) => any;
}>();

const value = computed({
  get: () => String(props.modelValue),
  set: newValue => emit('update:modelValue', newValue),
});

const classes = computed(() => {
  const { disabled, block } = props;
  const classArray = Array.isArray(props.class) ? props.class : [props.class];
  return [...classArray, { disabled, block }];
});

const clear = () => emit('update:modelValue', '');
</script>

<script lang="ts">
export default { inheritAttrs: false };
</script>
