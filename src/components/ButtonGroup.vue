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
    'btn-group--block': block,
  };
});

const width = computed(() => toWidth(props.width));
</script>

<style lang="scss" scoped>
@use '../styles';

.btn-group,
.input-group {
  padding: 0;
  border: 0;
  margin: 1px;
  display: inline-flex;
  vertical-align: middle;

  & > * {
    flex: 1 1 auto !important;
    &:focus-within { z-index: 1; }
  };

  & > :not(:first-child) :not(.dropdown__content *, .popover__content *),
  & > *:not(:first-child) {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    margin-left: calc(-1 * var(--border-width));
  }

  & > :not(:last-child) :not(.dropdown__content *, .popover__content *),
  & > *:not(:last-child) {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }

  &--block {
    @extend %block;

    display: flex;
  }
}
</style>
