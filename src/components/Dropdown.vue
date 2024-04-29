<template>
  <div class="dropdown" :class="modifiers" :style="width">
    <div class="dropdown__toggler" tabindex="0">
      <slot name="toggler">
        <Button
          v-bind="props.toggler"
          :even="!props.label"
          :disabled="props.disabled"
          block>
          {{ props.label }}
          <Icon src="/icons/chevron-down.svg" class="chevron" />
        </Button>
      </slot>
    </div>
    <div v-if="!props.disabled" class="dropdown__container">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
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
    block,
    disabled,
  };
});

const width = computed(() => toWidth(props.width));
</script>

<style lang="scss" scoped>
.dropdown {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: visible;
  box-sizing: border-box;

  &__container {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 2;
    box-sizing: border-box;
    margin: 0.125rem 0;
  }

  &--top > &__toggler .chevron { transform: rotate(180deg); }

  &--top > &__container {
    bottom: 100%;
    top: unset;
  }

  &--right > &__container {
    left: unset;
    right: 0;
  }

  &__container:hover,
  &__toggler:focus-within + &__container { display: block; }

  &.disabled {
    cursor: not-allowed;

    & * { pointer-events: none; }
  }
}
</style>
