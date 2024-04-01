<template>
  <span class="chip">
    <slot>{{ props.text }}</slot>
    <button
      v-if="props.close"
      class="close"
      @click.prevent="props.close">
      <slot name="close">&times;</slot>
    </button>
  </span>
</template>

<script setup lang="ts">
export type ChipProps = {
  text?: string;
  close?: () => void;
};

const props = defineProps<ChipProps>();

defineSlots<{
  default?: () => void;
  close?: () => void;
}>();
</script>

<style lang="scss" scoped>
.chip {
  --color: var(--color-accent, #888);
  --opacity: 15%;
  --color-shade: color-mix(in srgb, var(--color) var(--opacity), transparent);
  --size: 0.8em;
  --radius: 0.25em;

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

  button.close {
    all: unset;
    padding: 0 0.125rem;
    margin: 0 -0.2rem 0 0;
    border-radius: 0.125rem;
    cursor: pointer;

    &:hover,
    &:focus { background: var(--color-shade); }
  }
}
</style>
