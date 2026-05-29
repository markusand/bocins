<template>
  <Popover v-bind="props" :style="style">
    <slot name="content">{{ text }}</slot>
    <template #anchor>
      <slot><Icon src="info.svg" /></slot>
    </template>
  </Popover>
</template>

<script setup lang="ts">
import Popover, { type PopoverProps } from './Popover.vue';
import Icon from './Icon.vue';

export type TooltipProps = {
  text?: string;
} & PopoverProps;

const props = defineProps<TooltipProps>();

defineSlots<{
  default: () => void;
  content?: () => void;
}>();

const style = {
  '--popover-bg-color': 'var(--tooltip-bg-color, #333)',
  '--popover-text-color': 'var(--tooltip-text-color, #fff)',
  '--popover-border-color': 'transparent',
  '--popover-spacing': 'var(--tooltip-spacing, 0.5rem 0.75rem)',
};
</script>
