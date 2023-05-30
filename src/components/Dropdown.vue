<template>
  <div ref="dropdown" :class="['dropdown', { disabled, top, right, block }]" tabindex="0">
    <slot name="toggler" :close="close">
      {{ props.label }}
      <Icon src="/icons/chevron-down.svg" class="dropdown__chevron" />
    </slot>
    <div v-if="!disabled" class="dropdown__container">
      <slot :close="close" />
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
  label?: string;
  block?: boolean; 
};

const props = withDefaults(defineProps<Props>(), {
  label: 'Dropdown',
});

defineSlots<{
  default?: (props: { close: () => void }) => any;
  toggler?: (props: { close: () => void }) => any;
}>();

const dropdown = ref<HTMLDivElement | null>(null);

const close = () => {
  const focused = dropdown.value?.querySelector(':focus') as HTMLElement;
  focused?.blur();
};
</script>

<style lang="scss" scoped>
.dropdown {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  position: relative;
  overflow: visible;

  &__container {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    margin: 2px -2px;
    visibility: hidden;
    box-sizing: border-box;
    opacity: 0;
    transition: all 0.3s ease;
    transform: translateY(-0.5rem);

    :focus-within > &,
    &:hover {
      opacity: 1;
      visibility: visible;
      transform: none !important;
    }
  }

  &.top > &__container {
    bottom: 100%;
    top: unset;
    transform: translateY(0.5rem);
  }

  &.right > &__container {
    left: unset;
    right: 0;
  }

  &.block { width: 100%; }

  &.disabled { cursor: not-allowed; }
}
</style>
