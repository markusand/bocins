<template>
  <Dropdown v-bind="props" :position>
    <template #label>
      <slot name="anchor" />
    </template>
    <template #default>
      <div class="popover" :class="position">
        <slot />
      </div>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import Dropdown, { type DropdownProps } from './Dropdown.vue';

export type PopoverProps = Omit<DropdownProps, 'icon' | 'label'>;

const props = defineProps<PopoverProps>();

defineSlots<{
  default: () => void;
  anchor: () => void;
}>();
</script>

<style scoped>
.popover {
  --color: var(--popover-bg-color, var(--bg-color, #f00));
  --text-color: var(--popover-text-color, currentcolor);
  --border-color: var(--popover-border-color, #888);
  --timing: var(--popover-timing, 0.2s);
  --arrow-offset: var(--popover-arrow-offset, 0.75rem);

  position: relative;
  background: var(--color);
  color: var(--text-color);
  padding: var(--popover-spacing, 0);
  border: 1px solid var(--border-color);
  border-radius: var(--popover-radius, var(--radius, 0.25rem));

  &::before, &::after {
    content: "";
    position: absolute;
    border: 0.5rem solid transparent;
  }

  &::before { border-width: calc(0.5rem + 1.5px); }

  /* Top family: arrow at bottom edge, pointing down */
  &:is(.top-left, .top-in-left, .top, .top-in-right, .top-right) {
    margin-bottom: calc(0.5rem + var(--gap, 0rem));

    &::before, &::after {
      top: 100%;
      left: 50%;
      translate: -50% 0;
      border-top-color: var(--color);
    }

    &::before { border-top-color: var(--border-color); }
  }

  /* Bottom family: arrow at top edge, pointing up */
  &:is(.bottom-right, .bottom-in-right, .bottom, .bottom-in-left, .bottom-left) {
    margin-top: calc(0.5rem + var(--gap, 0rem));

    &::before, &::after {
      bottom: 100%;
      left: 50%;
      translate: -50% 0;
      border-bottom-color: var(--color);
    }

    &::before { border-bottom-color: var(--border-color); }
  }

  /* Right family: arrow at left edge, pointing left */
  &:is(.right-in-top, .right, .right-in-bottom) {
    margin-left: calc(0.5rem + var(--gap, 0rem));

    &::before, &::after {
      right: 100%;
      top: 50%;
      translate: 0 -50%;
      border-right-color: var(--color);
    }

    &::before { border-right-color: var(--border-color); }
  }

  /* Left family: arrow at right edge, pointing right */
  &:is(.left-in-bottom, .left, .left-in-top) {
    margin-right: calc(0.5rem + var(--gap, 0rem));

    &::before, &::after {
      left: 100%;
      top: 50%;
      translate: 0 -50%;
      border-left-color: var(--color);
    }

    &::before { border-left-color: var(--border-color); }
  }

  /* Near-left edge (top/bottom families) */
  &:is(.top-in-left, .bottom-in-left) {
    &::before, &::after {
      left: var(--arrow-offset);
      translate: 0 0;
    }

    &::before { translate: -1.5px 0; }
  }

  /* Near-right edge (top/bottom families) */
  &:is(.top-in-right, .bottom-in-right) {
    &::before, &::after {
      left: auto;
      right: var(--arrow-offset);
      translate: 0 0;
    }

    &::before { translate: 1.5px 0; }
  }

  /* Near-top edge (right/left families) */
  &:is(.right-in-top, .left-in-top) {
    &::before, &::after {
      top: var(--arrow-offset);
      translate: 0 0;
    }

    &::before { translate: 0 -1.5px; }
  }

  /* Near-bottom edge (right/left families) */
  &:is(.right-in-bottom, .left-in-bottom) {
    &::before, &::after {
      top: auto;
      bottom: var(--arrow-offset);
      translate: 0 0;
    }

    &::before { translate: 0 1.5px; }
  }

  /* Corners: no arrow, sharp corner toward anchor */
  &:is(.top-left, .top-right, .bottom-right, .bottom-left) {
    margin: 0;
    &::before, &::after { display: none; }
  }

  &.top-left { border-bottom-right-radius: 0; }
  &.top-right { border-bottom-left-radius: 0; }
  &.bottom-right { border-top-left-radius: 0; }
  &.bottom-left { border-top-right-radius: 0; }
}

.toggler {
  display: inline-block;
  anchor-name: v-bind(anchor); /* stylelint-disable-line */
}
</style>
