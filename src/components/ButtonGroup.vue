<template>
  <fieldset :class="classes" :style="width" :disabled>
    <slot />
  </fieldset>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonProps } from './Button.vue';
import { toWidth } from '/@/utils';

export type ButtonGroupProps = Pick<ButtonProps, 'block' | 'width' | 'disabled'>;

const props = defineProps<ButtonGroupProps>();

defineSlots<{
  default: () => void;
}>();

const classes = computed(() => ['btn-group', {
  'is-block': props.block,
}]);

const width = computed(() => toWidth(props.width));
</script>

<style scoped>
.btn-group,
.input-group {
  padding: 0;
  border: 0;
  margin: 1px;
  display: inline-flex;
  vertical-align: middle;

  & > * { z-index: 0; }

  /* Not first */
  &:deep(> :not(:first-child)) {
    &, & > .btn, & > .input, & .is-input {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
      margin-left: calc(-1 * var(--border-width));
    }
  }

  /* Not last of types */  
  &:deep(> :has(~ :is(.btn, .input))) {
    &, & > .btn, & > .input, & .is-input {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }

  &:deep(> :is(.btn)) {
    flex: 1 1 auto !important;

    &:focus-within { z-index: 1; }
  }
}
</style>
