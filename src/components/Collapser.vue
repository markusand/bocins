<template>
  <details :class="classes" :open :name @toggle.stop="toggle">
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
import { ref, computed } from 'vue';
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
});

defineSlots<{
  toggler?: (props: { open: boolean }) => void;
  default: (props: { open: boolean }) => void;
}>();

const emit = defineEmits<{
  open: [];
  close: [];
  toggle: [open: boolean];
}>();

const isOpen = ref(props.open);

const classes = computed(() => ['collapser', {
  'is-disabled': props.disabled,
}]);

const toggle = (event: Event) => {
  isOpen.value = (event.target as HTMLDetailsElement).open;
  if (isOpen.value) emit('open');
  else emit ('close');
  emit('toggle', isOpen.value);
};
</script>

<style scoped>
.collapser {
  --spacing: var(--collapser-spacing, 0.75rem);
  --separator-color: var(--collapser-separator-color, #8882);

  padding: 0 0 0.1px;
  color: var(--text-color);
  background: var(--bg-color);

  & + & { border-top: 1px solid var(--separator-color); }

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
