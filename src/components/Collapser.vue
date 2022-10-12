<template>
  <details class="collapser" :disabled="props.disabled">
    <summary class="collapser__toggler">
      <slot name="title" />
      <aside class="collapser__aside">
        <slot name="aside" />
      </aside>
      <icon
        src="/icons/chevron-right.svg"
        class="collapser__chevron" />
    </summary>
    <slot />
  </details>
</template>

<script setup lang="ts">
import Icon from './Icon.vue';

const props = defineProps<{
  disabled?: boolean;
}>();
</script>

<style lang="scss" scoped>
.collapser {
  --padding: var(--collapser-padding, 0.75rem);

  border: var(--collapser-border, 1px solid #0001);
  border-width: 1px 0;

  & + & { border-top: 0; }

  &__toggler {
    list-style: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: var(--padding);
    padding: var(--padding);

    &::-webkit-details-marker,
    &::marker { display: none; }
  }

  &__aside { margin-left: auto; }

  &__chevron {
    --size: 1em;

    [open] > summary & { transform: rotate(90deg); }
  }

  &[disabled="true"] {
    cursor: not-allowed;

    summary {
      pointer-events: none;
      opacity: 0.5;
    }
  }
}
</style>
