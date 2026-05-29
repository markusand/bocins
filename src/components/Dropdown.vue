<template>
  <div :class="togglerClasses" :style>
    <slot name="toggler" :open :close>
      <button :popovertarget="id" :disabled tabindex="0">
        <slot name="label">
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
    :class="dropdownClasses"
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

export type DropdownPosition =
  | 'top-left' | 'top-in-left' | 'top' | 'top-in-right' | 'top-right'
  | 'right-in-top' | 'right' | 'right-in-bottom'
  | 'bottom-right' | 'bottom-in-right' | 'bottom' | 'bottom-in-left' | 'bottom-left'
  | 'left-in-bottom' | 'left' | 'left-in-top';

export type DropdownProps = {
  icon?: string;
  label?: string;
  disabled?: boolean;
  block?: boolean;
  width?: number | string;
  lazy?: boolean;
  position?: DropdownPosition;
};

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<DropdownProps>(), {
  label: '',
  position: 'bottom-in-left',
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
  'is-open': isOpen.value,
}]);

const dropdownClasses = computed(() => ['dropdown', `dropdown--${props.position}`]);

const CHEVRON_ROTATIONS: Record<string, string> = {
  top: '180deg',
  right: '-90deg',
  left: '90deg',
  bottom: '0deg',
};

const style = computed(() => {
  const direction = props.position?.split('-')[0] ?? 'bottom';
  return {
    ...toWidth(props.width),
    '--chevron-rotate': CHEVRON_ROTATIONS[direction] ?? '0deg',
  };
});

const onToggle = (event: ToggleEvent) => {
  isOpen.value = event.newState === 'open';
  if (isOpen.value) emit('open');
  else emit('close');
  emit('toggle', isOpen.value);
};
</script>

<style scoped>
.dropdown {
  --gap: var(--dropdown-margin, 0.125rem);

  all: unset;
  display: none;
  position: absolute;
  position-anchor: v-bind(anchor); /* stylelint-disable-line */
  inset: var(--position);
  margin: var(--margin);
  position-try-fallbacks: var(--fallback);

  &:popover-open { display: block; }

  /* Corners */
  &.dropdown--top-left {
    --position: auto anchor(left) anchor(top) auto;
    --fallback: --bottom-left, --top-right, --bottom-right;
  }

  &.dropdown--top-right {
    --position: auto auto anchor(top) anchor(right);
    --fallback: --bottom-right, --top-left, --bottom-left;
  }

  &.dropdown--bottom-right {
    --position: anchor(bottom) auto auto anchor(right);
    --fallback: --top-right, --bottom-left, --top-left;
  }

  &.dropdown--bottom-left {
    --position: anchor(bottom) anchor(left) auto auto;
    --fallback: --top-left, --bottom-right, --top-right;
  }

  /* Top family */
  &.dropdown--top-in-left {
    --position: auto auto anchor(top) anchor(left);
    --margin: var(--gap) 0;
    --fallback: --bottom-in-left, --top-in-right, --bottom-in-right;
  }

  &.dropdown--top {
    translate: -50% 0;

    --position: auto auto anchor(top) anchor(center);
    --margin: var(--gap) 0;
    --fallback: --bottom, --top-in-left, --bottom-in-left;
  }

  &.dropdown--top-in-right {
    --position: auto anchor(right) anchor(top) auto;
    --margin: var(--gap) 0;
    --fallback: --bottom-in-right, --top-in-left, --bottom-in-left;
  }

  /* Right family */
  &.dropdown--right-in-top {
    --position: anchor(top) auto auto anchor(right);
    --margin: 0 var(--gap);
    --fallback: --left-in-top, --right-in-bottom, --left-in-bottom;
  }

  &.dropdown--right {
    translate: 0 -50%;

    --position: anchor(center) auto auto anchor(right);
    --margin: 0 var(--gap);
    --fallback: --left, --right-in-top, --left-in-top;
  }

  &.dropdown--right-in-bottom {
    --position: auto auto anchor(bottom) anchor(right);
    --margin: 0 var(--gap);
    --fallback: --left-in-bottom, --right-in-top, --left-in-top;
  }

  /* Bottom family */
  &.dropdown--bottom-in-right {
    --position: anchor(bottom) anchor(right) auto auto;
    --margin: var(--gap) 0;
    --fallback: --top-in-right, --bottom-in-left, --top-in-left;
  }

  &.dropdown--bottom {
    translate: -50% 0;

    --position: anchor(bottom) auto auto anchor(center);
    --margin: var(--gap) 0;
    --fallback: --top, --bottom-in-left, --top-in-left;
  }

  &.dropdown--bottom-in-left {
    --position: anchor(bottom) auto auto anchor(left);
    --margin: var(--gap) 0;
    --fallback: --top-in-left, --bottom-in-right, --top-in-right;
  }

  /* Left family */
  &.dropdown--left-in-bottom {
    --position: auto anchor(left) anchor(bottom) auto;
    --margin: 0 var(--gap);
    --fallback: --right-in-bottom, --left-in-top, --right-in-top;
  }

  &.dropdown--left {
    translate: 0 -50%;

    --position: anchor(center) anchor(left) auto auto;
    --margin: 0 var(--gap);
    --fallback: --right, --left-in-top, --right-in-top;
  }

  &.dropdown--left-in-top {
    --position: anchor(top) anchor(left) auto auto;
    --margin: 0 var(--gap);
    --fallback: --right-in-top, --left-in-bottom, --right-in-bottom;
  }
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

  .chevron {
    rotate: var(--chevron-rotate, 0deg);
    transition: rotate 0.2s;
  }

  &.is-open .chevron { rotate: calc(var(--chevron-rotate, 0deg) + 180deg); }
}

/* Corners */
@position-try --top-left {
  inset: auto anchor(left) anchor(top) auto;
  margin: var(--gap);
}

@position-try --top-right {
  inset: auto auto anchor(top) anchor(right);
  margin: var(--gap);
}

@position-try --bottom-right {
  inset: anchor(bottom) auto auto anchor(right);
  margin: var(--gap);
}

@position-try --bottom-left {
  inset: anchor(bottom) anchor(left) auto auto;
  margin: var(--gap);
}

/* Top family */
@position-try --top-in-left {
  inset: auto auto anchor(top) anchor(left);
  margin: var(--gap) 0;
}

@position-try --top {
  inset: auto auto anchor(top) anchor(center);
  margin: var(--gap) 0;
}

@position-try --top-in-right {
  inset: auto anchor(right) anchor(top) auto;
  margin: var(--gap) 0;
}

/* Right family */
@position-try --right-in-top {
  inset: anchor(top) auto auto anchor(right);
  margin: 0 var(--gap);
}

@position-try --right {
  inset: anchor(center) auto auto anchor(right);
  margin: 0 var(--gap);
}

@position-try --right-in-bottom {
  inset: auto auto anchor(bottom) anchor(right);
  margin: 0 var(--gap);
}

/* Bottom family */
@position-try --bottom-in-right {
  inset: anchor(bottom) anchor(right) auto auto;
  margin: var(--gap) 0;
}

@position-try --bottom {
  inset: anchor(bottom) auto auto anchor(center);
  margin: var(--gap) 0;
}

@position-try --bottom-in-left {
  inset: anchor(bottom) auto auto anchor(left);
  margin: var(--gap) 0;
}

/* Left family */
@position-try --left-in-bottom {
  inset: auto anchor(left) anchor(bottom) auto;
  margin: 0 var(--gap);
}

@position-try --left {
  inset: anchor(center) anchor(left) auto auto;
  margin: 0 var(--gap);
}

@position-try --left-in-top {
  inset: anchor(top) anchor(left) auto auto;
  margin: 0 var(--gap);
}
</style>
