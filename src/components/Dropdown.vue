<template>
  <div
    :class="classes"
    :style
    tabindex="0"
    @focusin="onFocus"
    @focusout="onFocus">
    <slot name="toggler">
      <Button :even="!label" :disabled>
        <Icon v-if="icon || !label" :src="icon" />
        {{ label }}
      </Button>
    </slot>
    <div v-if="isOpen" class="dropdown__overlay">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useId } from 'vue';
import Icon from './Icon.vue';
import Button from './Button.vue';
import { toWidth } from '/@/utils';

export type DropdownProps = {
  icon?: string;
  label?: string;
  top?: boolean;
  right?: boolean;
  disabled?: boolean;
  block?: boolean;
  width?: number | string;
};

const props = withDefaults(defineProps<DropdownProps>(), {
  icon: 'chevron-down.svg',
  label: '',
});

defineSlots<{
  default?: () => void;
  toggler?: () => void;
}>();

const emit = defineEmits<{
  open: [];
  close: [];
}>();

const classes = computed(() => {
  const { disabled, top, right, block } = props;
  return ['dropdown', {
    'dropdown--top': top,
    'dropdown--right': right,
    'dropdown--block': block,
    'dropdown--disabled': disabled,
  }];
});

const anchorId = useId();
const style = computed(() => ({
  ...toWidth(props.width),
  '--anchor-name': `--dropdown-${anchorId}`,
  '--position-anchor': `--dropdown-${anchorId}`,
}));

const isOpen = ref(false);

const onFocus = (event: FocusEvent) => {
  if (props.disabled) return;
  const current = event.currentTarget as HTMLElement;
  const related = event.relatedTarget as HTMLElement;
  if (!current?.contains(related)) {
    isOpen.value = event.type === 'focusin';
    if (isOpen.value) emit('open');
    else emit('close');
  }
};
</script>

<style scoped>
.dropdown {
  display: inline-flex;
  flex-direction: column;
  anchor-name: var(--anchor-name);

  &.dropdown--block {
    width: 100%;
    margin-inline: 0;
    flex: 0 0 100%;
  }

  .dropdown__overlay {
    position: absolute;
    top: anchor(bottom);
    left: anchor(left);
    position-anchor: var(--position-anchor);
    position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
    min-width: anchor-size(width, 0);
    max-width: var(--max-width, 100dvw);
    margin: 0.125rem 0;
    z-index: 2;
  }
}

:disabled .dropdown__overlay,
.dropdown--disabled .dropdown__overlay { display: none; }

.dropdown--top > .dropdown__overlay {
  bottom: anchor(top);
  top: unset;
}

.dropdown--right > .dropdown__overlay {
  left: unset;
  right: anchor(right);
}

@supports not (anchor-name: --position-anchor) {
  .dropdown__overlay {
    position: absolute;
    top: 100%;
    left: 0;
  }

  .dropdown--top > .dropdown__overlay {
    bottom: 100%;
    top: unset;
  }

  .dropdown--right > .dropdown__overlay {
    left: unset;
    right: 0;
  }
}
</style>
