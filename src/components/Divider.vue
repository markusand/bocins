<template>
  <div class="divider">
    <slot>{{ props.label }}</slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label?: string;
}>();

defineSlots<{
  default: () => void;
}>();
</script>

<style lang="scss" scoped>
.divider {
  --color: var(--color-border, #8888);
  --margin: 2rem;

  display: flex;
  align-items: center;
  color: var(--color);
  margin: var(--margin) 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-top: 1px solid currentcolor;
    margin: 0 0.5rem;
  }

  &:empty::after { display: none; }
}
</style>
