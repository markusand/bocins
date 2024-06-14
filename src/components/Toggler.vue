<template>
  <label class="toggler" :class="modifiers">
    <input
      v-model="selected"
      :value="props.value"
      :type="props.radio ? 'radio' : 'checkbox'"
      :disabled="props.disabled">
    <slot>{{ props.label }}</slot>
  </label>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';

export type TogglerProps<T> = {
  label?: string;
  value?: T;
  radio?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  block?: boolean;
};

const props = defineProps<TogglerProps<T>>();

defineSlots<{
  default?: () => void;
}>();

const selected = defineModel<T | T[] | undefined>({ required: true });

const modifiers = computed(() => {
  const { invalid, block } = props;
  return { invalid, block };
});
</script>

<style lang="scss" scoped>
@import '../styles';

/* stylelint-disable no-descending-specificity */

.toggler { 
  --color-bg: #8888;
  --scaledown: 0.5;

  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;

  input[type="checkbox"],
  input[type="radio"] {
    all: unset;
    appearance:none;
    display: block;
    height: var(--size, 0.75em);
    width: var(--size, 0.75em);
    flex: 0 0 var(--size, 0.75em);
    border-radius: 20%;
    transform: scale(var(--scaledown));
    background: var(--color-bg);
    border: 1px solid transparent;
    transition: all 0.3s ease;
    cursor: pointer;

    &:checked {
      background:
        var(--color-bg)
        url('/icons/check.svg')
        no-repeat
        center center
        !important;
      transform: none;
    }
  }

  input[type="radio"] { border-radius: 50%; }

  &:hover input:not(:disabled) {
    transform: none;
    background: none;
    border-color: var(--color-bg);
  }

  &:has(:checked) { --color-bg: var(--color-accent, #333); }

  &.invalid { --color-bg: var(--color-error, red); }
  &:has(:disabled) { @extend %disabled; }
}
</style>
