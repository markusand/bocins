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
  variant?: 'ghost' | 'flat';
  size?: 'small' | 'large';
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
  const { variant, size, even, block } = props;
  return {
    [`btn--${variant}`]: !!variant,
    [`btn--${size}`]: !!size,
    'btn--even': even,
    block,
  };
});

const width = computed(() => toWidth(props.width));
</script>

<style lang="scss" scoped>
.btn {
  --spacing: var(--btn-spacing, 0.5rem);
  --radius: var(--btn-radius, 0.25em);
  --color: var(--btn-color, #333);
  --color-text: var(--btn-color-text, #fff);
  --color-state: var(--color);
  --color-hover: color-mix(in srgb, var(--color) 85%, #000);
  --color-active: var(--btn-color-active, color-mix(in srgb, var(--color) 85%, #fff));
  --border-width: var(--btn-border-width, 1px);

  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  padding: var(--spacing) calc(1.5 * var(--spacing));
  gap: var(--spacing);
  background: var(--color-state);
  box-shadow: inset 0 0 0 var(--border-width) var(--color-state);
  color: var(--color-text);
  border-radius: var(--radius);
  box-sizing: border-box;
  line-height: 1;
  cursor: pointer;

  &--small { --spacing: 0.25em; }
  &--large { --spacing: 0.75em; }

  &--even { padding: var(--spacing); }

  .btn-group--ghost &,
  &--ghost {
    background: none;
    color: var(--color-state);
  }

  .btn-group--flat &,
  &--flat {
    background: none;
    box-shadow: none;
    color: var(--color-state);
  }

  /* States */
  :disabled &,
  .disabled &,
  &:disabled {
    --color-state: color-mix(in srgb, var(--color-disabled, #8886) 10%, transparent);

    cursor: not-allowed;
    color: var(--color-disabled, #8886);
  }

  &:not(:disabled) {
    &:hover { --color-state: var(--color-hover); }
  
    &:active,
    &.active { --color-state: var(--color-active); }
  }

  // stylelint-disable-next-line selector-pseudo-class-no-unknown
  :deep(.icon) { --size: 1em; }
}
</style>
