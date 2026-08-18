<template>
  <button
    type="button"
    :class="classes"
    :style="width"
    :disabled>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { toWidth } from '/@/utils';

type VariantProps = { flat?: true; ghost?: false } | { flat?: false; ghost?: true };
type SizeProps    = { sm?: true;   lg?: false }    | { sm?: false;   lg?: true };

export type ButtonProps = VariantProps & SizeProps & {
  width?: number | string;
  even?: boolean;
  block?: boolean;
  disabled?: boolean;
};

const props = defineProps<ButtonProps>();

defineSlots<{
  default: () => void;
}>();

const classes = computed(() => {
  const variant = props.flat ? 'flat' : props.ghost ? 'ghost' : false;
  const size = props.sm ? 'small' : props.lg ? 'large' : false;
  return ['btn', {
    [`btn--${variant}`]: !!variant,
    [`btn--${size}`]: !!size,
    'btn--even': props.even,
    'is-block': props.block,
  }];
});

const width = computed(() => toWidth(props.width));
</script>

<style scoped>
.btn {
  --spacing: var(--btn-spacing, 0.5rem);
  --color: var(--btn-color, #333);
  --text-color: var(--btn-text-color, #fff);
  --border-width: var(--btn-border-width, 1px);
  --radius: var(--btn-radius, 0.25em);
  --hover-color: color-mix(in srgb, var(--color) 90%, #000);
  --color-state: var(--color);

  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  padding: var(--spacing) calc(1.25 * var(--spacing));
  gap: var(--spacing);
  background: var(--color-state);
  box-shadow: inset 0 0 0 var(--border-width) var(--color-state);
  color: var(--text-color);
  border-radius: var(--radius);
  box-sizing: border-box;
  line-height: 1;
  cursor: pointer;
  transition: all 0.3s ease;

  /* States */
  &.btn--even { padding: var(--spacing); }

  &.btn--small {
    --spacing: calc(0.75 * var(--btn-spacing, 0.5rem));

    font-size: 0.75em;
  }

  &.btn--large {
    --spacing: calc(1.25 * var(--btn-spacing, 0.5rem));

    font-size: 1.25em;
  }

  &.btn--ghost {
    background: none;
    color: var(--color-state);

    &:not(:disabled):is(:hover, :focus-visible) {
      background: var(--color-state);
      color: var(--text-color);
    }
  }

  &.btn--flat {
    background: transparent;
    box-shadow: none;
    color: var(--color-state);

    &:not(:disabled):is(:hover, :focus-visible) {
      background: color-mix(in srgb, var(--color) 5%, transparent);
    }
  }

  &:deep(.icon) { --icon-size: 1em; }
}

.btn:disabled,
:disabled .btn,
.is-disabled .btn {
  --color-state: color-mix(in srgb, var(--disabled-color, #8886) 10%, transparent) !important;
  
  cursor: not-allowed;
  color: var(--disabled-color, #8886);
}

.btn:not(:disabled):is(:hover, :focus-visible) { --color-state: var(--hover-color); }
</style>
