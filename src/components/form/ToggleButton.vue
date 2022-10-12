<template>
  <Button
    :disabled="props.disabled"
    :primary="isChecked"
    @click="check">
    <slot />
  </Button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from '../Button.vue';

type Props = {
  modelValue: any;
  value?: any;
  disabled?: boolean;
  silent?: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const isChecked = computed(() => {
  const { modelValue, value } = props;
  return typeof modelValue === 'boolean'
    ? modelValue
    : Array.isArray(modelValue)
      ? modelValue.includes(value)
      : modelValue === value;
});

const check = () => {
  const { modelValue, value } = props;
  const update = typeof modelValue === 'boolean'
    ? !modelValue
    : Array.isArray(modelValue)
      ? modelValue.includes(value)
        ? modelValue.filter(item => item !== value)
        : [...modelValue, value]
      : value;
  emit('update:modelValue', update);
};
</script>
