<template>
  <Button
    :class="['toggle-button', { active }]"
    v-bind="props"
    @click="toggle">
    <slot />
  </Button>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import Button, { type ButtonProps } from './Button.vue';

export type ToggleButtonProps<T> = {
  value?: T;
  required?: boolean; 
} & ButtonProps;

const props = defineProps<ToggleButtonProps<T>>();

const selected = defineModel<boolean | T | T[] | undefined>({ required: true });

defineSlots<{
  default: () => void;
}>();

const active = computed(() => (
  typeof selected.value === 'boolean'
    ? selected.value
    : Array.isArray(selected.value)
      ? props.value && selected.value.includes(props.value)
      : selected.value === props.value
));

const toggle = () => {
  selected.value = typeof selected.value === 'boolean'
    ? !selected.value
    : props.value && Array.isArray(selected.value)
      ? selected.value.includes(props.value)
        ? selected.value.filter(value => value !== props.value)
        : [...selected.value, props.value]
      : selected.value === props.value && !props.required
        ? undefined
        : props.value;
};
</script>
