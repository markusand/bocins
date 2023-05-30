<template>
  <Button
    :disabled="disabled"
    :primary="isChecked"
    :alert="alert"
    :flat="flat"
    :block="block"
    :loading="loading"
    :size="size"
    @click="check">
    <slot />
  </Button>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import Button from '../Button.vue';

defineOptions({ inheritAttrs: true });

const props = defineProps<{
  modelValue: T | T[];
  value?: T;
  silent?: boolean;
  // Modifiers
  alert?: boolean;
  flat?: boolean;
  block?: boolean;
  loading?: boolean;
  // State
  disabled?: boolean;
  // Size
  size?: number | string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean | T | T[] | undefined],
  change: [value: boolean | T | T[] | undefined],
}>();

const isChecked = computed(() => {
  const { modelValue, value } = props;
  return typeof modelValue === 'boolean'
    ? modelValue
    : value && Array.isArray(modelValue)
      ? modelValue.includes(value)
      : modelValue === value;
});

const check = () => {
  const { modelValue, value } = props;
  const update = typeof modelValue === 'boolean'
    ? !modelValue
    : value && Array.isArray(modelValue)
      ? modelValue.includes(value)
        ? modelValue.filter(item => item !== value)
        : [...modelValue, value]
      : value;
  emit('update:modelValue', update);
  emit('change', update);
};
</script>
