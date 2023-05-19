<template>
  <button
    :class="['button', { primary, alert, outline, flat, loading, block }]"
    :style="`--width:${props.size}${isNumber(props.size) ? 'rem' : ''}`"
    :type="props.submit ? 'submit' : props.reset ? 'reset' : 'button'"
    :disabled="props.disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { isNumber } from '/@/utils/number';
const props = defineProps<{
  primary?: boolean;
  alert?: boolean;
  outline?: boolean;
  flat?: boolean;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  submit?: boolean;
  reset?: boolean;
  size?: number | string;
}>();
</script>

<style lang="scss" scoped>
.button {
  --padding: var(--button-padding, 0.5rem);
  --margin: var(--button-margin, 1px);
  --border-radius: var(--button-border-radius, 4px);
  --color: var(--button-color);
  --font-color: var(--button-font-color, #606068);
  --border: var(--button-border, 1px solid var(--color, rgba(0 0 0 / 20%)));

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
  background: var(--color, rgba(0 0 0 / 5%));
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

  .button-group & {
    margin: 0;

    &:active { z-index: 1; }

    &:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: none;
    }

    &:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &:not(:disabled):hover { filter: brightness(95%); }

  .input-group .dropdown__dropdown &,
  .button-group .dropdown__toggler & {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
  }
}
</style>

<style>
.button-group {
  --margin: var(--button-margin, 1px);

  display: inline-flex;
  align-items: stretch;
  flex-wrap: nowrap;
  margin: var(--margin);
  vertical-align: middle;
}
</style>
