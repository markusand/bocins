<template>
  <details :class="classes" :open="isOpen" @toggle.stop="toggle">
    <summary class="collapser__toggler">
      <div class="collapser__title">
        <slot name="toggler" :open="isOpen">
          {{ title }}
        </slot>
      </div>
      <Icon src="chevron-down.svg" />
    </summary>
    <div class="collapser__content">
      <slot :open="isOpen" />
    </div>
  </details>
</template>

<script setup lang="ts">
import { ref, watch, computed, watchEffect, inject, useId, type Ref } from 'vue';
import Icon from './Icon.vue';

export type CollapserProps = {
  title?: string;
  open?: boolean; 
  name?: string;
  disabled?: boolean;
};

const props = withDefaults(defineProps<CollapserProps>(), {
  title: '',
  open: false,
  name: () => useId(),
});

defineSlots<{
  toggler: (props: { open: boolean }) => void;
  default: (props: { open: boolean }) => void;
}>();

const emit = defineEmits<{
  open: [name: string];
  close: [name: string];
  toggle: [name: string];
}>();

const isOpen = ref(props.open);

const classes = computed(() => ['collapser', {
  'is-disabled': props.disabled,
}]);

const toggle = (event: Event) => {
  const { open } = event.target as HTMLDetailsElement;
  isOpen.value = open;
};

// Inject state from (possible) Accordion parent
const accordion = inject<Ref<string> | null>('accordion', null);

// Update current Collapser state from props or Accordion
watchEffect(() => { isOpen.value = props.open || props.name === accordion?.value; });

watch(isOpen, open => {
  // Emit events
  if (open) emit('open', props.name);
  else emit('close', props.name);
  emit('toggle', props.name);

  // Update Accordion
  if (accordion && open) accordion.value = props.name;
});
</script>

<style scoped>
.collapser {
  --color: var(--collapser-color, transparent);
  --border: var(--collapser-border, none);
  --radius: var(--collapser-radius, 0.25rem);
  --spacing: var(--collapser-spacing, 0.75rem);

  padding: 0 0 0.1px;
  color: var(--color-text);
  background: var(--color-bg);

  & + & { border-top: 1px solid #8882; }

  .icon { --size: 1em; }
}

.collapser__toggler {
  list-style: none;
  display: flex;
  align-items: center;
  gap: var(--spacing);
  padding: var(--spacing);
  cursor: pointer;

  &::-webkit-details-marker,
  &::marker { display: none; }
}

.collapser__title { flex: 1; }

.collapser__content { margin: 0 var(--spacing) var(--spacing); }

.collapser[open] > .collapser__toggler .icon { transform: rotate(180deg); }
</style>
