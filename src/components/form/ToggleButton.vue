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
  change: [value: boolean | T | T[] | undefined],
}>();

const toggle = defineModel<boolean | T | T[] | undefined>({ required: true });

const isChecked = computed(() => (typeof toggle.value === 'boolean'
  ? toggle.value
  : props.value && Array.isArray(toggle.value)
    ? toggle.value.includes(props.value)
    : toggle.value === props.value
));

const check = () => {
  const value = typeof toggle.value === 'boolean'
    ? !toggle.value
    : props.value && Array.isArray(toggle.value)
      ? toggle.value.includes(props.value)
        ? toggle.value.filter(item => item !== props.value)
        : [...toggle.value, props.value]
      : props.value;
  toggle.value = value;
  emit('change', value);
};
</script>
