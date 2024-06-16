<template>
  <fieldset
    class="btn-group"
    :class="modifiers"
    :style="width"
    :disabled="props.disabled">
    <slot />
  </fieldset>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonProps } from './Button.vue';
import { toWidth } from '/@/utils';

export type ButtonGroupProps = Pick<ButtonProps, 'variant' | 'block' | 'width' | 'disabled'>;

const props = defineProps<ButtonGroupProps>();

defineSlots<{
  default: () => void;
}>();

const modifiers = computed(() => {
  const { variant, block } = props;
  return {
    [`btn-group--${variant}`]: !!variant,
    block,
  };
});

const width = computed(() => toWidth(props.width));
</script>

<style lang="scss">
.btn-group,
.input-group {
  padding: 0;
  border: 0;
  margin: 1px;
  display: inline-flex;
  vertical-align: middle;

  .btn,
  .input { flex: 1; };

  & > :not(:first-child) .btn,
  .btn:not(:first-child),
  & > :not(:first-child) .input,
  .input:not(:first-child),
  & > :not(:first-child) .toggler {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    margin-left: calc(-1 * var(--border-width));
  }

  & > :not(:last-child) .btn,
  .btn:not(:last-child),
  & > :not(:last-child) .input,
  .input:not(:last-child),
  & > :not(:last-child) .toggler {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }

  &.block { display: flex; }
}
</style>
