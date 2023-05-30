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
  open?: string | boolean | undefined;
  main?: boolean;
  disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  name: () => unique(),
  open: undefined,
});

const emit = defineEmits<{
  toggle: [attributes: Props];
  open: [attributes: Props];
  close: [attributes: Props];
  'update:open': [open: string | boolean | undefined];
}>();

defineSlots<{
  default?: (props: object) => void;
  title?: (props: object) => void;
  aside?: (props: object) => void;
}>();

const isOpen = computed(() => {
  const { name, main, open } = props;
  return typeof open === 'string'
    ? [name, ''].includes(open)
    : open ?? main;
});

const toggle = (event: Event) => {
  const { open } = event.target as HTMLDetailsElement;
  const attributes = { ...props, open };
  if (open) emit('open', attributes);
  else emit('close', attributes);
  emit('toggle', attributes);
  
  if (open) emit('update:open', props.name);
  else if (props.open === props.name) emit('update:open', undefined);
};
</script>

<style lang="scss" scoped>
.collapser {
  --padding: var(--collapser-padding, 0.75rem);
  --border: var(--collapser-border, 1px solid #8883);

  border: var(--border);
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
