<template>
  <div class="divider">
    <slot>{{ label }}</slot>
  </div>
</template>

<script setup lang="ts">
export type DividerProps = {
  label?: string;
};

defineProps<DividerProps>();

defineSlots<{
  default?: () => void;
}>();
</script>

<style scoped>
.divider {
  --color: var(--divider-color, #8888);
  --margin: var(--divider-margin, 2rem);
  --line-opacity: var(--divider-line-opacity, 75%);

  display: flex;
  align-items: center;
  color: var(--color);
  margin: var(--margin) 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-top: 1px solid color-mix(in srgb, currentcolor var(--line-opacity), transparent);
    margin: 0 0.5rem;
  }

  &:empty::after { display: none; }
}
</style>
