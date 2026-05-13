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
  --color: var(--chip-color, #888);
  --opacity: var(--chip-opacity, 5%);
  --_shade-color: color-mix(in srgb, var(--color) var(--opacity), transparent);
  --size: var(--chip-size, 0.8em);
  --border: var(--chip-border, inset 0 0 0 1px color-mix(in srgb, var(--color) 10%, transparent));

  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  vertical-align: middle;
  padding: 0.4em 0.6em;
  border-radius: var(--chip-radius, var(--radius, 0.25em));
  background: var(--_shade-color);
  color: var(--color);
  font-size: var(--size);
  white-space: nowrap;
  box-shadow: var(--border);
}

.chip__action {
  all: unset;
  padding: 0.125em;
  margin: 0 -0.2em 0 0;
  border-radius: 0.125em;
  cursor: pointer;
  line-height: 1;

  &:hover,
  &:focus { background: var(--_shade-color); }
}
</style>
