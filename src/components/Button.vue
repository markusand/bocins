<template>
  <button
    class="btn"
    :class="modifiers"
    :style="width"
    :disabled="props.disabled">
    <slot>{{ props.text }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { toWidth } from '/@/utils';

export type ButtonProps = {
  text?: string;
  variant?: 'ghost' | 'flat';
  size?: 'small' | 'large';
  width?: number | string;
  even?: boolean;
  block?: boolean;
  disabled?: boolean;
};

defineSlots<{
  default: () => void;
}>();

const props = defineProps<ButtonProps>();

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
  --spacing: 0.5rem;
  --radius: 0.25em;
  --color: #333;
  --state-color: var(--color);
  --color-hover: color-mix(in srgb, var(--color) 85%, #000);
  --color-active: color-mix(in srgb, var(--color) 85%, #fff);
  --color-disabled: #8882;
  --color-text: #fff;
  --border-width: 1px;

  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  padding: var(--spacing) calc(1.5 * var(--spacing));
  gap: var(--spacing);
  background: var(--state-color);
  box-shadow: inset 0 0 0 var(--border-width) var(--state-color);
  color: var(--color-text);
  border-radius: var(--radius);
  margin: 1px 0.5px;
  box-sizing: border-box;
  line-height: 1;
  cursor: pointer;

  &--small { --spacing: 0.25em; }
  &--large { --spacing: 0.75em; }

  &--even { padding: var(--spacing); }

  .btn-group--ghost &,
  &--ghost {
    background: none;
    color: var(--state-color);
  }

  .btn-group--flat &,
  &--flat {
    background: none;
    box-shadow: none;
    color: var(--state-color);
  }

  /* States */
  :disabled &,
  .disabled &,
  &:disabled {
    --state-color: var(--color-disabled);

    cursor: not-allowed;
    opacity: 0.5;
    color: #888;
  }

  &:not(:disabled) {
    &:hover { --state-color: var(--color-hover); }
  
    &:active,
    &.active { --state-color: var(--color-active); }
  }

  // stylelint-disable-next-line selector-pseudo-class-no-unknown
  :deep(.icon) { --size: 1em; }
}
</style>
