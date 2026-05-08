<template>
  <span class="chip">
    <slot>{{ text }}</slot>
    <button
      v-if="action"
      type="button"
      class="chip__action"
      @click.prevent="action">
      <slot name="action">&times;</slot>
    </button>
  </span>
</template>

<script setup lang="ts">
export type ChipProps = {
  text?: string;
  action?: () => void;
};

defineProps<ChipProps>();

defineSlots<{
  default?: () => void;
  action?: () => void;
}>();
</script>

<style scoped>
.chip {
  --color: var(--color-accent, #888);
  --opacity: var(--chip-opacity, 5%);
  --color-shade: color-mix(in srgb, var(--color) var(--opacity), transparent);
  --size: var(--chip-size, 0.8em);
  --border: var(--chip-border, inset 0 0 0 1px color-mix(in srgb, var(--color) 10%, transparent));
  --radius: var(--chip-radius, 0.25em);

  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  vertical-align: middle;
  padding: 0.4em 0.6em;
  border-radius: var(--radius);
  background: var(--color-shade);
  color: var(--color);
  font-size: var(--size);
  white-space: nowrap;
  box-shadow: var(--border);
}

.chip__action {
  all: unset;
  padding: 0 0.125rem;
  margin: 0 -0.2rem 0 0;
  border-radius: 0.125rem;
  cursor: pointer;

  &:hover,
  &:focus { background: var(--color-shade); }
}
</style>
