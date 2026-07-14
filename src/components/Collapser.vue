<template>
  <details :class="classes" :name :open @toggle.stop="toggle">
    <summary>
      <slot name="toggler" :open="isOpen">
        {{ title }}
      </slot>
      <Icon src="chevron-down.svg" />
    </summary>
    <slot :open="isOpen" />
  </details>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
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
watch(() => props.open, open => { isOpen.value = open; });

const classes = computed(() => ['collapser', {
  'is-disabled': props.disabled,
}]);

const toggle = (event: Event) => {
  isOpen.value = (event.target as HTMLDetailsElement).open;
  if (isOpen.value) emit('open');
  else emit('close');
  emit('toggle', isOpen.value);
};
</script>

<style scoped>
.collapser {
  --spacing: var(--collapser-spacing, 0.75rem);
  --separator-color: var(--collapser-separator-color, #8882);
  --timing: var(--collapser-timing, 0.3s);
  --text-color: var(--collapser-text-color, inherit);
  --bg-color: var(--collapser-bg-color, transparent);

  padding: 0 0 0.1px;
  color: var(--text-color);
  background: var(--bg-color);
  interpolate-size: allow-keywords;

  & + & { border-top: 1px solid var(--separator-color); }

  & > summary {
    list-style: none;
    display: flex;
    align-items: center;
    gap: var(--spacing);
    padding: var(--spacing);
    cursor: pointer;

    &::-webkit-details-marker,
    &::marker { display: none; }

    .icon {
      --icon-size: 1em;

      margin-left: auto;
      transition: transform var(--timing) ease;
    }
  }

  &::details-content {
    block-size: 0;
    overflow: hidden;
    padding: 0 var(--spacing);
    padding-bottom: 0;
    transition:
      padding-bottom var(--timing) ease,
      block-size var(--timing) ease,
      content-visibility var(--timing);
    transition-behavior: allow-discrete;
  }

  &[open] {
    & > summary > .icon { transform: rotate(180deg); }

    &::details-content {
      block-size: auto;
      padding-bottom: var(--spacing);
    }
  }
}
</style>
