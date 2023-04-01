<template>
  <div ref="dropdown" :class="['dropdown', { disabled, top, right, block }]">
    <div class="dropdown__toggler" tabindex="0">
      <slot :close="close">
        {{ toggleText }}
        <icon src="/icons/chevron.svg" class="dropdown__chevron" />
      </slot>
    </div>
    <div v-if="!disabled" class="dropdown__container">
      <slot name="dropdown" :close="close" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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

const dropdown = ref<HTMLDivElement | null>(null);

const close = () => {
  const focused = dropdown.value?.querySelector(':focus') as HTMLElement;
  focused?.blur();
};
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
    transform: translateY(-0.5rem);
    transition: all 0.3s ease;

    :focus-within > &,
    &:hover {
      opacity: 1;
      transform: none !important;
      visibility: visible;
    }
  }

  &.top > &__container {
    bottom: 100%;
    transform: translateY(0.5rem);
  }

  &.right > &__container { right: 0; }

  &.block { width: 100%; }

  &.disabled { cursor: not-allowed; }
}
</style>
