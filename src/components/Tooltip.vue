<template>
  <Popover class="tooltip" v-bind="props">
    <slot name="content">{{ text }}</slot>
    <template #anchor><slot /></template>
  </Popover>
</template>

<script setup lang="ts">
import Popover, { type PopoverProps } from './Popover.vue';

export type TooltipProps = {
  text?: string;
} & PopoverProps;

const props = defineProps<TooltipProps>();

defineSlots<{
  default: () => void;
  content?: () => void;
}>();
</script>

<style scoped>
.tooltip {
  --bg-color: var(--tooltip-bg-color, #333);
  --text-color: var(--tooltip-text-color, #fff);
  --spacing: var(--tooltip-spacing, 0.5rem 0.75rem);
  --border-color: none;
}
</style>
