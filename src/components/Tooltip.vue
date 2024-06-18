<template>
  <Popover class="tooltip" v-bind="props">
    {{ props.text }}
    <template #anchor><slot /></template>
  </Popover>
</template>

<script setup lang="ts">
import Popover, { type PopoverProps } from './Popover.vue';

const props = defineProps<{
  text: string;
} & PopoverProps>();

defineSlots<{
  default: () => void
}>();
</script>

<style lang="scss" scoped>
.tooltip {
  --color-bg: var(--tooltip-color, #333);
  --color-text: var(--tooltip-text-color, #fff);
  --spacing: var(--tooltip-spacing, 0.5rem 0.75rem);
}
</style>
