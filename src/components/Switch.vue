<template>
  <label class="switch">
    <input
      v-model="selected"
      :disabled
      :value
      :type
      @change="onChange">
  </label>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import type { MaybeReadonly } from '/@/types';

export type SwitchProps<T> = {
  value?: MaybeReadonly<T>;
  disabled?: boolean;
};

const props = defineProps<SwitchProps<T>>();

const emit = defineEmits<{
  toggle: [value: T | T[] | undefined | boolean]
}>();

const selected = defineModel<T | T[] | boolean | undefined>();

const type = computed(() => {
  const isCheckbox = typeof selected.value === 'boolean' || Array.isArray(selected.value);
  return isCheckbox ? 'checkbox' : 'radio';
});

const onChange = (event: Event) => {
  const { checked } = event.target as HTMLInputElement;
  const value = props.value
    ? checked ? props.value : undefined
    : selected.value ?? checked;
  emit('toggle', value);
};
</script>

<style scoped>
.switch {
	--size: var(--switch-size, 1.25rem);
	--spacing: var(--switch-spacing, 0.125rem);
  --on-color: var(--switch-on-color, #7c7);
  --off-color: var(--switch-off-color, #8884);
  --thumb-color: var(--switch-thumb-color, #fff);

	display: inline-flex;
	flex-shrink: 0;
	height: var(--size);
	border-radius: var(--size);
	vertical-align: middle;
	box-sizing: border-box;
	cursor: pointer;
	aspect-ratio: 2 / 1;
	overflow: hidden;
  background: var(--off-color);

  &:has(:checked) { background: var(--on-color); }

  &:focus-within { box-shadow: inset 0 0 0 1px var(--off-color); }

  input {
    all: unset;
    margin: var(--spacing);
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--thumb-color);
    transition: all 0.3s ease;

    &:checked { margin-left: calc(50% + var(--spacing)); }

    &:disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  &:has(input:disabled) { cursor: not-allowed; }
}
</style>
