<template>
  <div :class="togglerClasses" :style>
    <slot name="toggler" :open :close>
      <button :popovertarget="id" :disabled tabindex="0">
        <slot name="label">
          <Icon v-if="icon || !label" :src="icon" />
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
    popover=""
    v-bind="$attrs"
    @toggle="onToggle">
    <slot v-if="!lazy || isOpen" :close />
  </div>
</template>

<script setup lang="ts">
import { ref, useId, useTemplateRef, computed } from 'vue';
import Icon from './Icon.vue';
import { toWidth } from '/@/utils';

export type DropdownProps = {
  icon?: string;
  label?: string;
  disabled?: boolean;
  block?: boolean;
  width?: number | string;
  lazy?: boolean;
};

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<DropdownProps>(), {
  icon: 'chevron-down.svg',
  label: '',
});

defineSlots<{
  default?: (props: { close: () => void }) => void;
  toggler?: (props: { open: () => void, close: () => void }) => void;
  label?: () => void;
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
}]);

const style = computed(() => toWidth(props.width));

const onToggle = (event: ToggleEvent) => {
  isOpen.value = event.newState === 'open';
  if (isOpen.value) emit('open');
  else emit('close');
  emit('toggle', isOpen.value);
};
</script>

<style scoped>
.dropdown {
  all: unset;
  display: none;
  position: absolute;
  margin: 0.125rem 0;
  position-anchor: v-bind(anchor); /* stylelint-disable-line */
  top: anchor(bottom);
  left: anchor(left);
  position-try-fallbacks: --flip-y, --flip-x, --flip-both;

  &:popover-open { display: block; }
}

.modal .dropdown { position: fixed; } /* Fix for Firefox */

.toggler {
  all: unset;
  display: inline-block;
  vertical-align: middle;
  anchor-name: v-bind(anchor); /* stylelint-disable-line */

  button {
    all: unset;
    width: 100%;
    cursor: pointer;
    border-radius: var(--radius);

    &:focus-visible { background: #8881; }
  }
}

@position-try --flip-y {
  inset: auto auto anchor(top) anchor(left);
}

@position-try --flip-x {
  inset: anchor(bottom) anchor(right) auto auto
}

@position-try --flip-both {
  inset: auto anchor(right) anchor(top) auto;
}
</style>
