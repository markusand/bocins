<template>
  <button
    class="btn"
    type="button"
    :class="modifiers"
    :style="width"
    :disabled="props.disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { toWidth } from '/@/utils';

export type ButtonProps = {
  flat?: boolean;
  ghost?: boolean;
  sm?: boolean;
  lg?: boolean; 
  width?: number | string;
  even?: boolean;
  block?: boolean;
  disabled?: boolean;
};

const props = defineProps<ButtonProps>();

defineSlots<{
  default: () => void;
}>();

const modifiers = computed(() => {
  const { flat, ghost, sm, lg, even, block } = props;
  const variant = flat ? 'flat' : ghost ? 'ghost' : false;
  const size = sm ? 'small' : lg ? 'large' : false;
  return {
    [`is-${variant}`]: !!variant,
    [`is-${size}`]: !!size,
    'is-even': even,
    'is-block': block,
  };
});

const width = computed(() => toWidth(props.width));
</script>

<style scoped>
.btn {
  --spacing: var(--btn-spacing, 0.5rem);
  --radius: var(--btn-radius, 0.25em);
  --color: var(--btn-color, #333);
  --color-text: var(--btn-color-text, #fff);
  --color-state: var(--color);
  --color-hover: color-mix(in srgb, var(--color) 90%, #000);
  --border-width: var(--btn-border-width, 1px);

  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  padding: var(--spacing) calc(1.25 * var(--spacing));
  gap: var(--spacing);
  background: var(--color-state);
  border: var(--border-width) solid var(--color-state);
  color: var(--color-text);
  border-radius: var(--radius);
  box-sizing: border-box;
  line-height: 1;
  cursor: pointer;

  /* States */
  &.is-even { padding: var(--spacing); }
  &.is-block { display: flex; }

  &.is-small {
    --spacing: calc(0.75 * var(--btn-spacing, 0.5rem));
    font-size: 0.75em;
  }

  &.is-large {
    --spacing: calc(1.25 * var(--btn-spacing, 0.5rem));
    font-size: 1.25em;
  }
  
  &.is-ghost {
    background: none;
    color: var(--color-state);

    &:not(:disabled):hover {
      background: var(--color-state);
      color: var(--color-text);
    }
  }

  &.is-flat {
    background: transparent;
    border-color: transparent;
    color: var(--color-state);

    &:not(:disabled):hover {
      background: color-mix(in srgb, var(--color) 5%, transparent);
    }
  }

  &:not(:disabled):hover { --color-state: var(--color-hover); }

  /* stylelint-disable-next-line selector-pseudo-class-no-unknown */
  &:deep(.icon) { --size: 1em; }
}

.btn:disabled,
:disabled .btn,
.disabled .btn {
  --color-state: color-mix(in srgb, var(--color-disabled, #8886) 10%, transparent) !important;
  
  cursor: not-allowed !important;
  color: var(--color-disabled, #8886) !important;
}
</style>
