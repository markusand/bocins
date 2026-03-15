<template>
  <div class="popover-wrapper" :tabindex="props.click ? -1 : undefined" :style="anchorStyles">
    <div :class="['popover', props.position || 'top']" :style="width">
      <slot />
    </div>
    <slot name="anchor" />
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue';
import { toWidth } from '../utils';

export type PopoverProps = {
  position?: 'bottom' | 'top' | 'left' | 'right';
  click?: boolean;
  width?: string | number;
};

const props = defineProps<PopoverProps>();

defineSlots<{
  default: () => void;
  anchor: () => void
}>();

const width = computed(() => toWidth(props.width ?? 'auto'));

const anchorStyles = computed(() => {
  const anchorId = useId();
  return {
    '--anchor-name': `--popover-${anchorId}`,
    '--position-anchor': `--popover-${anchorId}`,
  };
});
</script>

<style lang="scss" scoped>
.popover {
  position: fixed;
  position-anchor: var(--position-anchor);
  background: var(--color-bg, #fff);
  color: var(--color-text, currentcolor);
  padding: var(--spacing, 0);
  border-radius: 0.25rem;
  box-shadow: var(--shadow, 0 0 1rem 0.25rem #8882);
  display: none;
  z-index: 2;
  position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;

  &:hover,
  :focus > &,
  :not([tabindex]):hover > & { display: block; }

  &::before {
    content: "";
    position: absolute;
    border: 0.5rem solid transparent;
    transform: translateX(-50%);
  }

  &.bottom {
    top: anchor(bottom);
    left: anchor(center);
    margin: 0.5rem 0 0;
    transform: translateX(-50%);

    &::before {
      border-bottom-color: var(--color-bg, #fff);
      bottom: 100%;
      left: 50%;
    }
  }

  &.top {
    bottom: anchor(top);
    left: anchor(center);
    margin: 0 0 0.5rem;
    transform: translateX(-50%);

    &::before {
      border-top-color: var(--color-bg, #fff);
      top: 100%;
      left: 50%;
    }
  }

  &.left {
    right: anchor(left);
    top: anchor(center);
    margin: 0 0.5rem 0 0;
    transform: translateY(-50%);

    &::before {
      border-left-color: var(--color-bg, #fff);
      top: 50%;
      left: 100%;
      transform: translate(0, -50%);
    }
  }

  &.right {
    left: anchor(right);
    top: anchor(center);
    margin: 0 0 0 0.5rem;
    transform: translateY(-50%);

    &::before {
      border-right-color: var(--color-bg, #fff);
      top: 50%;
      right: 100%;
      transform: translate(0, -50%);
    }
  }

  /* Fallback for browsers without anchor positioning support */
  @supports not (anchor-name: --popover-anchor) {
    position: absolute;

    &.bottom {
      top: 100%;
      left: 50%;
    }

    &.top {
      bottom: 100%;
      left: 50%;
    }

    &.left {
      right: 100%;
      top: 50%;
    }

    &.right {
      left: 100%;
      top: 50%;
    }
  }

  &-wrapper {
    position: relative;
    display: inline-block;
    anchor-name: var(--anchor-name);
  }
}
</style>
