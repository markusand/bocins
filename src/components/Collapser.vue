<template>
  <details class="collapser" :open="isOpen" @toggle="toggle">
    <summary class="toggler">
      <div class="title">
        <slot name="toggler" :open="hasBeenOpen">
          {{ props.title }}
        </slot>
      </div>
      <Icon src="/icons/chevron-down.svg" class="chevron" />
    </summary>
    <div class="content">
      <slot :open="hasBeenOpen" />
    </div>
  </details>
</template>

<script setup lang="ts">
import { ref, computed, inject, type Ref } from 'vue';
import Icon from './Icon.vue';

export type CollapserProps = {
  title?: string;
  open?: boolean; 
  name?: string;
};

const props = withDefaults(defineProps<CollapserProps>(), {
  title: '',
  open: false,
  name: () => Math.random().toString(36).slice(2),
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

const accordion = inject<{
  active: Ref<string | undefined>,
  activate: (nam?: string) => void,
} | null>('accordion', null);

const hasBeenOpen = ref(props.open); // Triggered programmatically
const isOpen = computed(() => props.open || accordion?.active.value === props.name); // Triggered automatically

const toggle = (event: Event) => {
  const { open } = event.target as HTMLDetailsElement;
  if (open) {
    accordion?.activate(props.name);
    emit('open', props.name);
  } else {
    if (accordion?.active.value === props.name) accordion.activate();
    emit('close', props.name);
  }
  hasBeenOpen.value = open;
  emit('toggle', props.name);
};
</script>

<style lang="scss" scoped>
.collapser {
  --color: transparent;
  --border: none;
  --radius: 0.25rem;
  --spacing: 0.75rem;

  padding: 0 0 0.1px;

  & + & { border-top: 1px solid #8882; }

  & > .toggler {
    list-style: none;
    display: flex;
    align-items: center;
    gap: var(--spacing);
    padding: var(--spacing);
    cursor: pointer;

    &::-webkit-details-marker,
    &::marker { display: none; }

    & > .title { flex: 1; }
  }

  & > .content { margin: 0 var(--spacing) var(--spacing); }

  
  .chevron { --size: 1em; }
  &[open] > summary .chevron { transform: rotate(180deg); }

  &[disabled="true"] {
    cursor: not-allowed;

    summary {
      pointer-events: none;
      opacity: 0.5;
    }
  }
}
</style>
