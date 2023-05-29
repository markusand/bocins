<template>
  <button
    :class="['button', modifiers]"
    :style="style"
    :type="type"
    :disabled="props.disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isNumber } from '/@/utils/number';

const props = defineProps<{
  // Modifiers
  primary?: boolean;
  alert?: boolean;
  outline?: boolean;
  flat?: boolean;
  block?: boolean;
  loading?: boolean;
  // State
  disabled?: boolean;
  // Button type shorthands
  submit?: boolean;
  reset?: boolean;
  // Size
  size?: number | string;
}>();

const type = computed(() => props.submit ? 'submit' : props.reset ? 'reset' : 'button');
const style = computed(() => `--width:${props.size}${isNumber(props.size) ? 'rem' : ''}`);
const modifiers = computed(() => {
  const { primary, alert, outline, flat, loading, block } = props;
  return { primary, alert, outline, flat, loading, block };
});
</script>

<style lang="scss" scoped>
.button {
  --padding: var(--button-padding, 0.5rem);
  --margin: var(--button-margin, 1px);
  --border-radius: var(--button-border-radius, 4px);
  --color: var(--button-color);
  --font-color: var(--button-font-color, inherit);
  --border: var(--button-border, 1px solid var(--color, #8886));

  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--padding);
  padding: var(--padding) calc(2 * var(--padding));
  margin: 1px;
  vertical-align: middle;
  text-align: center;
  color: var(--font-color);
  background: var(--color, #8882);
  border: var(--border);
  width: calc(var(--width) - 2 * var(--margin));
  border-radius: var(--border-radius);
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  line-height: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: all 0.3 ease;

  &.primary {
    --color: var(--color-primary);
    --font-color: #fff;
  }

  &.alert {
    --color: var(--color-alert);
    --font-color: #fff;
  }

  &.outline {
    color: var(--color);
    background: transparent;
  }

  &.flat {
    color: var(--color);
    background: transparent;
    border-color: transparent;
  }

  &.block {
    width: calc(100% - 2 * var(--margin));
  }

  &:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }

  &:not(:disabled):hover { filter: brightness(95%); }
}
</style>

<style lang="scss">
.button-group {
  --margin: var(--button-margin, 1px);

  display: inline-flex;
  align-items: stretch;
  flex-wrap: nowrap;
  margin: var(--margin);
  vertical-align: middle;

  & .button { margin: var(--margin) 0; }

  & > .button:not(:first-child),
  & > :not(:first-child) > .button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none;
  }

  & > .button:not(:last-child),
  & > :not(:last-child) > .button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
