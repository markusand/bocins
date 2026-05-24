<template>
  <div class="popover" :tabindex="props.click ? -1 : undefined" :style="anchorStyles">
    <div :class="classes" :style="width">
      <slot />
    </div>
    <slot name="anchor" />
  </div>
</template>

<script setup lang="ts">
import { computed, useId, type CSSProperties } from 'vue';
import { toWidth } from '../utils';

export type PopoverProps = {
  position?: 'bottom' | 'top' | 'left' | 'right';
  click?: boolean;
  width?: string | number;
};

const props = withDefaults(defineProps<PopoverProps>(), {
  position: 'top',
  width: 'auto',
});

defineSlots<{
  default: () => void;
  anchor: () => void
}>();

const width = computed((): CSSProperties | null => toWidth(props.width));

const anchorId = useId();
const anchorStyles = computed(() => ({
  '--anchor-name': `--popover-${anchorId}`,
  '--position-anchor': `--popover-${anchorId}`,
}));

const classes = computed(() => ['popover__content', `popover__content--${props.position}`]);
</script>

<style scoped>
.popover {
  --spacing: var(--popover-spacing, 0);
  --timing: var(--popover-timing, 0.2s);

  position: relative;
  display: inline-block;
  anchor-name: var(--anchor-name);
  outline: 0;
}

.popover__content {
  position: fixed;
  position-anchor: var(--position-anchor);
  background: var(--bg-color, #fff);
  color: var(--text-color, currentcolor);
  padding: var(--spacing);
  border-radius: var(--popover-radius, var(--radius, 0.25rem));
  box-shadow: 0 0 0 1px var(--border-color, #8882);
  display: none;
  opacity: 0;
  translate: var(--translate, 0);
  z-index: 2;
  position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
  transition:
    opacity var(--timing) ease,
    translate var(--timing) ease,
    display var(--timing) allow-discrete;

  &:hover,
  :focus > &,
  :not([tabindex]):hover > & {
    display: block;
    opacity: 1;
    translate: none;

    @starting-style {
      opacity: 0;
      translate: var(--translate, 0);
    }
  }

  &::before, &::after {
    --color: var(--bg-color, #fff);

    content: "";
    position: absolute;
    border: 0.5rem solid transparent;
    transform: translateX(-50%);
  }

  &::before {
    --color: var(--border-color, #8882);

    border-width: calc(0.5rem + 1.5px);
  }
}

.popover__content--bottom {
  --translate: 0 -0.35rem;

  top: anchor(bottom);
  left: anchor(center);
  margin: 0.5rem 0 0;
  transform: translateX(-50%);

  &::before, &::after {
    border-bottom-color: var(--color);
    bottom: 100%;
    left: 50%;
  }
}

.popover__content--top {
  --translate: 0 0.35rem;

  bottom: anchor(top);
  left: anchor(center);
  margin: 0 0 0.5rem;
  transform: translateX(-50%);

  &::before, &::after {
    border-top-color: var(--color);
    top: 100%;
    left: 50%;
  }
}

.popover__content--left {
  --translate: 0.35rem 0;

  right: anchor(left);
  top: anchor(center);
  margin: 0 0.5rem 0 0;
  transform: translateY(-50%);

  &::before, &::after {
    border-left-color: var(--color);
    top: 50%;
    left: 100%;
    transform: translate(0, -50%);
  }
}

.popover__content--right {
  --translate: -0.35rem 0;

  left: anchor(right);
  top: anchor(center);
  margin: 0 0 0 0.5rem;
  transform: translateY(-50%);

  &::before, &::after {
    border-right-color: var(--color);
    top: 50%;
    right: 100%;
    transform: translate(0, -50%);
  }
}

/* Fallback for browsers without anchor positioning support */
@supports not (anchor-name: --popover-anchor) {
  .popover__content {
    position: absolute;
  }

  .popover__content--bottom {
    top: 100%;
    left: 50%;
  }

  .popover__content--top {
    bottom: 100%;
    left: 50%;
  }

  .popover__content--left {
    right: 100%;
    top: 50%;
  }

  .popover__content--right {
    left: 100%;
    top: 50%;
  }
}
</style>
