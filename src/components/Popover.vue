<template>
  <Dropdown v-bind="props" :position :style>
    <template #label="{ open, close }">
      <div
        class="anchor"
        @mouseenter="hoverable ? open() : undefined"
        @mouseleave="hoverable ? close() : undefined">
        <slot name="anchor" :open :close />
      </div>
    </template>
    <template #default="{ close }">
      <div class="popover">
        <slot :close />
      </div>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Dropdown, { type DropdownProps } from './Dropdown.vue';

export type PopoverProps = {
  hoverable?: boolean;
} & Omit<DropdownProps, 'icon' | 'label'>;

const props = withDefaults(defineProps<PopoverProps>(), {
  position: 'top',
});

defineSlots<{
  default: (props: { close: () => void }) => void;
  anchor: (props: { open: () => void, close: () => void }) => void;
}>();

const style = computed(() => ({
  '--bg': 'var(--popover-bg, #333)',
  '--gap': 'var(--popover-gap, 0.25rem)',
  '--direction': props.position.replace(/-.*/, ''),
}));
</script>

<style scoped>
.popover {
  --bg-color: var(--popover-bg-color, #fff);
  --text-color: var(--popover-text-color, inherit);
  --spacing: var(--popover-spacing, 0);
  --border: var(--popover-border, 1px solid #8888);
  --radius: var(--popover-radius, 0.25rem);

  background: var(--bg-color);
  color: var(--text-color);
  border: var(--border);
  box-sizing: border-box;
  border-radius: var(--radius);
  padding: var(--spacing);
  margin: var(--gap, 0);

  &::before {
    content: '';
    width: calc(2 * var(--gap));
    aspect-ratio: 1;
    background: var(--bg-color);
    border: var(--border);
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
    inset: auto;
    position: fixed;
    position-anchor: var(--anchor);
    position-area: var(--direction, bottom);
    margin: var(--gap, 0);
    
    @container style(--direction: left) {
      rotate: -45deg;
      
      @container anchored(fallback: flip-inline) {
        position-area: right;
        rotate: 134deg;
      }
    }

    @container style(--direction: right) {
      rotate: 135deg;

      @container anchored(fallback: flip-inline) {
        position-area: left;
        rotate: -45deg;
      }
    }

    @container style(--direction: top) {
      rotate: 45deg;
    
      @container anchored(fallback: flip-block) {
        position-area: bottom;
        rotate: 225deg;
      }
    }

    @container style(--direction: bottom) {
      rotate: 225deg;

      @container anchored(fallback: flip-block) {
        position-area: top;
        rotate: 45deg;
      }
    }
  }
}
</style>
