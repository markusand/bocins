<template>
  <label :class="classes">
    <input
      v-model="selected"
      :type="props.radio ? 'radio' : 'checkbox'"
      :value
      :disabled>
    <slot>{{ label }}</slot>
  </label>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import checkSvg from '/@/assets/check.svg?raw';

export type Props<T> = {
  label?: string;
  value?: T;
  radio?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  block?: boolean;
};

const props = defineProps<Props<T>>();

defineSlots<{
  default?: () => void;
}>();

const selected = defineModel<T | T[] | undefined>({ required: true });

const classes = computed(() => ['toggler', {
  'toggler--invalid': props.invalid,
  'is-disabled': props.disabled,
  'is-block': props.block,
}]);

const checkiconurl = `url('data:image/svg+xml,${encodeURIComponent(checkSvg)}')`;
</script>

<style scoped>
.toggler { 
  --color-bg: var(--toggler-color, var(--color-border, #888));
  --scaledown: var(--toggle-scale, 0.5);

  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;

  input[type="radio"] { border-radius: 50% !important; }

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
        v-bind(checkiconurl)
        no-repeat
        center center
        !important;
      transform: none;
    }
  }

  &:focus-within,
  &:hover {
    input:not(:disabled) {
      transform: none;
      background: none;
      border-color: var(--color-bg);
    }
  }

  &:has(:checked) { --color-bg: var(--color-accent, #333); }
}

.toggler--invalid { --color-bg: var(--color-error, red); }
</style>
