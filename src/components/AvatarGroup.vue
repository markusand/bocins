<template>
  <span class="avatar-group" :class="props">
    <slot />
  </span>
</template>

<script setup lang="ts">
export type AvatarGroupProps = {
  stacked?: boolean;
};

const props = defineProps<AvatarGroupProps>();

defineSlots<{ default: () => void; }>();
</script>

<style lang="scss" scoped>
.avatar-group {
  display: inline-flex;
  flex-direction: row-reverse;
  vertical-align: middle;

  // stylelint-disable-next-line selector-pseudo-class-no-unknown
  :deep(.avatar) {
    outline: 2px solid var(--color-bg, #fff);

    &:not(:first-child) {
      margin-right: calc(-1 * var(--overlap, 0.35) * var(--size));
      transition: all 0.3s ease-in-out;
    }
  }

  &.stacked {
    --overlap: 0.8;
    &:hover { --overlap: -0.125; }
  }
}
</style>
