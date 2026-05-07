<template>
  <Popover class="tooltip" v-bind="props">
    <slot name="content">{{ text }}</slot>
    <template #anchor><slot /></template>
  </Popover>
</template>

<script setup lang="ts">
import Popover, { type Props as PopoverProps } from './Popover.vue';

export type Props = {
  text?: string;
} & PopoverProps;

const props = defineProps<Props>();

defineSlots<{
  default: () => void;
  content?: () => void;
}>();
</script>

<style scoped>
.tooltip {
  --color-bg: var(--tooltip-color, #333);
  --color-text: var(--tooltip-text-color, #fff);
  --spacing: var(--tooltip-spacing, 0.5rem 0.75rem);
  --color-border: none;
}
</style>
