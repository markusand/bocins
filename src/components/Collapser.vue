<template>
  <details
    class="collapser"
    :disabled="props.disabled"
    :open="isOpen"
    @toggle="toggle">
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
import { computed } from 'vue';
import Icon from './Icon.vue';
import { unique } from '/@/utils/string';

type Props = {
  name?: string;
  open?: boolean;
  accordion?: string | undefined;
  main?: boolean;
  disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  name: () => unique(),
  accordion: undefined,
});

const emit = defineEmits(['toggle', 'open', 'close', 'update:accordion']);

const isOpen = computed(() => {
  const { accordion, name, main, open } = props;
  return accordion === name || (!accordion && main) || open;
});

const toggle = (event: Event) => {
  const { open } = event.target as HTMLDetailsElement;
  const { name, accordion } = props;
  const attributes = { open, name };
  emit(open ? 'open' : 'close', attributes);
  emit('toggle', attributes);

  if (open) emit('update:accordion', name);
  else if (accordion === name) emit('update:accordion', undefined);
};
</script>

<style lang="scss" scoped>
.collapser {
  --padding: var(--collapser-padding, 0.75rem);

  border: var(--collapser-border, 1px solid #8883);
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
