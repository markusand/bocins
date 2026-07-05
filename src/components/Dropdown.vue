<template>
  <div :class="togglerClasses">
    <slot name="toggler" :open :close>
      <button type="button" :popovertarget="id" :disabled tabindex="0">
        <slot name="label" :open :close>
          <Icon v-if="icon" :src="icon" />
          <Icon v-else src="chevron-down.svg" class="chevron" />
          {{ label }}
        </slot>
      </button>
    </slot>
  </div>
  <div
    v-if="!disabled"
    :id
    ref="dropdown"
    class="dropdown"
    :style
    popover
    v-bind="$attrs"
    @toggle="onToggle">
    <slot v-if="!lazy || isOpen" :close />
  </div>
</template>

<script setup lang="ts">
import { ref, useId, useTemplateRef, computed } from 'vue';
import Icon from './Icon.vue';
import { toWidth } from '/@/utils';

export type DropdownPosition =
  | 'top-left' | 'top-start' | 'top' | 'top-end' | 'top-right'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'
  | 'bottom-left' | 'bottom-start' | 'bottom' | 'bottom-end' | 'bottom-right';

export type DropdownProps = {
  icon?: string;
  label?: string;
  disabled?: boolean;
  block?: boolean;
  width?: number | string;
  lazy?: boolean;
  position?: DropdownPosition;
};

const POSITIONS: Record<DropdownPosition, string> = {
  'top-left': 'block-start inline-start',
  'top-right': 'block-start inline-end',
  'bottom-start': 'block-end span-inline-end',
  'bottom': 'block-end span-all',
  'bottom-end': 'block-end span-inline-start',
  'bottom-left': 'block-end inline-start',
  'bottom-right': 'block-end inline-end',
  'top-start': 'block-start span-inline-end',
  'top': 'block-start span-all',
  'top-end': 'block-start span-inline-start',
  'right-start': 'inline-end span-block-end',
  'right': 'inline-end span-all',
  'right-end': 'inline-end span-block-start',
  'left-start': 'inline-start span-block-end',
  'left': 'inline-start span-all',
  'left-end': 'inline-start span-block-start',
};

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<DropdownProps>(), {
  label: '',
  position: 'bottom',
});

defineSlots<{
  default?: (props: { close: () => void }) => void;
  toggler?: (props: { open: () => void, close: () => void }) => void;
  label?: (props: { open: () => void, close: () => void }) => void;
}>();

const emit = defineEmits<{
  toggle: [open: boolean];
  open: [];
  close: [];
}>();

const id = useId();
const anchor = `--dropdown-${id}`;

const isOpen = ref(false);

const dropdown = useTemplateRef('dropdown');
const open = () => dropdown.value?.showPopover();
const close = () => dropdown.value?.hidePopover();

const togglerClasses = computed(() => ['toggler', {
  'is-block': props.block,
  'is-open': isOpen.value,
}]);

const style = computed(() => ({
  ...toWidth(props.width),
  '--position': POSITIONS[props.position],
  '--gap-x': /left|right/.test(props.position) ? 'var(--gap, 0)' : 0,
  '--gap-y': /top|bottom/.test(props.position) ? 'var(--gap, 0)' : 0,
}));

const onToggle = (event: ToggleEvent) => {
  isOpen.value = event.newState === 'open';
  if (isOpen.value) emit('open');
  else emit('close');
  emit('toggle', isOpen.value);
};
</script>

<style scoped>
.dropdown {
  --gap: var(--dropdown-gap, 0.25rem);
  --timing: var(--dropdown-timing, 0.2s);

  border: none;
  background: none;
  padding: 0;
  inset: auto;
  position: fixed;
  position-anchor: v-bind(anchor); /* stylelint-disable-line */
  position-area: var(--position, bottom);
  position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
  min-inline-size: anchor-size(inline);

  /* Transition */
  display: none;
  margin: 0;
  opacity: 0;
  transition:
    all var(--timing) linear,
    display var(--timing) allow-discrete,
    overlay var(--timing) allow-discrete;

  &:popover-open {
    display: block;
    opacity: 1;
    margin: var(--gap-y) var(--gap-x);
    
    @starting-style {
      opacity: 0;
      margin: 0;
    }
  }
}

.modal .dropdown { position: fixed; } /* Fix for Firefox */

.toggler {
  all: unset;
  display: inline-block;
  anchor-name: v-bind(anchor); /* stylelint-disable-line */

  button {
    all: unset;
    width: 100%;
    cursor: pointer;
    border-radius: var(--radius);

    &:focus-visible { background: #8881; }
  }
}
</style>
