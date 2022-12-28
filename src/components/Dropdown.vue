<template>
  <div :class="['dropdown', { disabled, top, right, block }]">
    <div class="dropdown__toggler" tabindex="0">
      <slot>
        {{ toggleText }}
        <icon src="/icons/chevron.svg" class="dropdown__chevron" />
      </slot>
    </div>
    <div v-if="!disabled" class="dropdown__container" tabindex="-1">
      <slot name="dropdown" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue';

type Props = {
  disabled?: boolean;
  right?: boolean;
  top?: boolean;
  toggleText?: string;
  block?: boolean; 
};

withDefaults(defineProps<Props>(), {
  toggleText: 'dropdown',
});
</script>

<style lang="scss" scoped>
.dropdown {
  display: inline-block;
  vertical-align: middle;
  position: relative;

  &__toggler { outline: 0; }
  &__chevron { height: 1em; }

  &__container {
    position: absolute;
    z-index: 2;
    margin: 2px 0;
    visibility: hidden;
    box-sizing: border-box;
    min-width: 100%;
    opacity: 0;
    transform-origin: top;
    transform: scaleY(0);
    transition: all 0.3s ease;

    :focus-within > &,
    &:hover {
      opacity: 1;
      transform: none;
      visibility: visible;
    }
  }

  &.top > &__container { bottom: 100%; }
  &.right > &__container { right: 0; }

  &.block { width: 100%; }

  &.disabled { cursor: not-allowed; }
}
</style>
