<template>
  <Button :class="classes" v-bind="props" @click.prevent.stop="toggle">
    <slot />
  </Button>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import Button, { type ButtonProps } from './Button.vue';
import type { MaybeReadonly } from '/@/types';

export type ToggleButtonProps<T> = {
  value?: MaybeReadonly<T>;
  required?: boolean; 
} & ButtonProps;

const props = defineProps<ToggleButtonProps<T>>();

const selected = defineModel<T | T[] | undefined>({ required: true });

defineSlots<{
  default: () => void;
}>();

const classes = computed(() => {
  const active = typeof selected.value === 'boolean'
    ? selected.value
    : Array.isArray(selected.value)
      ? props.value && selected.value.includes(props.value)
      : selected.value === props.value;
  
  return ['toggle-button', {
    'toggle-button--active': active
  }];
});

const toggle = () => {
  selected.value = typeof selected.value === 'boolean'
    ? !selected.value as T
    : props.value && Array.isArray(selected.value)
      ? selected.value.includes(props.value)
        ? selected.value.filter(value => value !== props.value)
        : [...selected.value, props.value]
      : selected.value === props.value && !props.required
        ? undefined
        : props.value;
};
</script>

<style scoped>
.toggle-button {
  --active-color: var(--toggle-btn-active-color, color-mix(in srgb, var(--color) 75%, #000));

  &.toggle-button--active {
    --_color-state: var(--active-color) !important;
  }
}
</style>
