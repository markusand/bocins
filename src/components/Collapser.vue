<template>
  <details
    class="b-collapser"
    :disabled="props.disabled"
    :open="isOpen"
    @toggle="toggle">
    <summary class="b-collapser__toggler">
      <slot name="title" />
      <aside class="b-collapser__aside">
        <slot name="aside" />
      </aside>
      <icon
        src="/icons/chevron-right.svg"
        class="b-collapser__chevron" />
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
  default?: () => void;
  title?: () => void;
  aside?: () => void;
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
