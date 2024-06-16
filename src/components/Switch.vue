<template>
  <label class="switch">
    <input
      v-model="selected"
      :disabled="props.disabled"
      :value="props.value"
      :type="type">
  </label>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import type { MaybeReadonly } from '/@/types';

const props = defineProps<{
  value?: MaybeReadonly<T>;
  disabled?: boolean;
}>();

const selected = defineModel<T | T[] | undefined>({ required: true });

const type = computed(() => {
  const isCheckbox = typeof selected.value === 'boolean' || Array.isArray(selected.value);
  return isCheckbox ? 'checkbox' : 'radio';
});
</script>

<style lang="scss" scoped>
.switch {
	--size: 1.25rem;
	--spacing: 0.125rem;

	display: inline-flex;
  align-items: center;
	height: var(--size);
	border-radius: var(--size);
	vertical-align: middle;
	box-sizing: border-box;
	cursor: pointer;
	aspect-ratio: 2 / 1;
	overflow: hidden;

  input {
    all: unset;
    height: calc(100% - 2 * var(--spacing));
    box-sizing: border-box;
    margin: var(--spacing);
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--color-thumb, #fff);
    outline: calc(var(--size) + var(--spacing)) solid var(--color-off, #8884);
    transition: all 0.3s ease;

    &:checked {
      margin-left: calc(50% + var(--spacing));
      outline-color: var(--color-on, #7c7);
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  &:has(input:disabled) { cursor: not-allowed; }
}
</style>
