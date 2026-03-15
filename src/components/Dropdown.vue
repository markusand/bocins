<template>
  <div class="dropdown" :class="modifiers" :style="styles" @click.stop>
    <div class="toggler" tabindex="0">
      <slot name="toggler">
        <Button
          v-bind="props.toggler"
          :even="!props.label"
          :disabled="props.disabled"
          block>
          {{ props.label }}
          <Icon :src="`${config.iconPath}/chevron-down.svg`" class="chevron" />
        </Button>
      </slot>
    </div>
    <div v-if="!props.disabled" class="container" tabindex="-1">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue';
import { config } from '/@/config';
import Icon from './Icon.vue';
import Button, { type ButtonProps } from './Button.vue';
import { toWidth } from '/@/utils';

export type DropdownProps = {
  label?: string;
  top?: boolean;
  right?: boolean;
  disabled?: boolean;
  block?: boolean;
  width?: number | string;
  toggler?: Omit<ButtonProps, 'block' | 'width' | 'disabled'>;
};

const props = defineProps<DropdownProps>();

defineSlots<{
  default?: () => void;
  toggler?: () => void;
}>();

const modifiers = computed(() => {
  const { disabled, top, right, block } = props;
  return {
    top,
    right,
    block,
    disabled,
  };
});

const styles = computed(() => {
  const anchorId = useId();
  return {
    ...toWidth(props.width),
    '--anchor-name': `--dropdown-${anchorId}`,
    '--position-anchor': `--dropdown-${anchorId}`,
  };
});
</script>

<style lang="scss" scoped>
.dropdown {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: visible;
  box-sizing: border-box;
  anchor-name: var(--anchor-name);

  .container {
    display: none;
    position: fixed;
    position-anchor: var(--position-anchor);
    top: anchor(bottom);
    left: anchor(left);
    position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
    z-index: 2;
    box-sizing: border-box;
    margin: 0.125rem 0;
    width: fit-content;
  }

  &.top > .container {
    bottom: anchor(top);
    top: unset;
  }

  &.right > .container {
    left: unset;
    right: anchor(right);
  }

  /* Fallback for browsers without anchor positioning support */
  @supports not (anchor-name: --dropdown-anchor) {
    .container {
      position: absolute;
      top: 100%;
      left: 0;
    }

    &.top > .container {
      bottom: 100%;
      top: unset;
    }

    &.right > .container {
      left: unset;
      right: 0;
    }
  }

  .toggler:focus-within + .container,
  .container:hover,
  .container:focus,
  .container:focus-within { display: block; }

  &.disabled {
    cursor: not-allowed;

    & * { pointer-events: none; }
  }
}
</style>
