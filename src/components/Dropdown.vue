<template>
  <div class="dropdown" :class="modifiers" :style="styles" @click.stop>
    <div class="dropdown__toggler" tabindex="0">
      <slot name="toggler">
        <Button
          v-bind="props.toggler"
          :even="!props.label"
          :disabled="props.disabled"
          block>
          {{ props.label }}
          <Icon :src="`${config.iconPath}/chevron-down.svg`" />
        </Button>
      </slot>
    </div>
    <div v-if="!props.disabled" class="dropdown__content" tabindex="-1">
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
    'dropdown--top': top,
    'dropdown--right': right,
    'dropdown--block': block,
    'dropdown--disabled': disabled,
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
@use '../styles';

.dropdown {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: visible;
  box-sizing: border-box;
  anchor-name: var(--anchor-name);

  &__content {
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

  &--top > &__content {
    bottom: anchor(top);
    top: unset;
  }

  &--right > &__content {
    left: unset;
    right: anchor(right);
  }

  /* Fallback for browsers without anchor positioning support */
  @supports not (anchor-name: --dropdown-anchor) {
    &__content {
      position: absolute;
      top: 100%;
      left: 0;
    }

    &--top > &__content {
      bottom: 100%;
      top: unset;
    }

    &--right > &__content {
      left: unset;
      right: 0;
    }
  }

  &__toggler:focus-within + &__content,
  &__content:hover,
  &__content:focus,
  &__content:focus-within { display: block; }

  &--disabled {
    cursor: not-allowed;

    & * { pointer-events: none; }
  }

  &--block { @extend %block; }

  .icon { --size: 1em; }
}
</style>
