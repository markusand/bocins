<template>
  <span :class="classes">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export type Props = {
  stacked?: boolean;
};

const props = defineProps<Props>();

defineSlots<{ default: () => void; }>();

const classes = computed(() => ['avatar-group', {
  'avatar-group--stacked': props.stacked,
}]);
</script>

<style scoped>
.avatar-group {
  display: inline-flex;
  flex-direction: row-reverse;
  vertical-align: middle;

  &:deep(.avatar) {
    outline: 2px solid var(--color-bg, #fff);

    &:not(:first-child) {
      margin-right: calc(-1 * var(--overlap, 0.35) * var(--size));
      transition: all 0.3s ease-in-out;
    }
  }

  &.avatar-group--stacked {
    --overlap: 0.8;
    &:hover { --overlap: -0.125; }
  }
}
</style>
