<template>
  <div
    :class="classes"
    :style
    tabindex="0"
    @focusin="onFocus"
    @focusout="onFocus">
    <slot name="toggler">
      <Button :even="!label">
        <Icon v-if="icon || !label" :src="icon" />
        {{ label }}
      </Button>
    </slot>
    <div v-if="isOpen" class="overlay">
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
  width: undefined,
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
    'is-top': top,
    'is-right': right,
    'is-block': block,
    'is-disabled': disabled,
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
    isOpen.value = event.type === 'focusin'
    if (isOpen.value) emit('open')
    else emit('close');
  }
};
</script>

<style scoped>
.dropdown {
  display: inline-flex;
  flex-direction: column;
  anchor-name: var(--anchor-name);

  .overlay {
    position: absolute;
    top: anchor(bottom);
    left: anchor(left);
    position-anchor: var(--position-anchor);
    position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
    min-width: anchor-size(width, 0); /* var(--min-width, 0); */
    max-width: var(--max-width, 100dvw);
    margin: 0.125rem 0;
    z-index: 2;
  }
}

:disabled .overlay,
.is-disabled .overlay { display: none; }

.is-top > .overlay {
  bottom: anchor(top);
  top: unset;
}

.is-right > .overlay {
  left: unset;
  right: anchor(right);
}

@supports not (anchor-name: --position-anchor) {
  .overlay {
    position: absolute;
    top: 100%;
    left: 0;
  }

  .is-top > .overlay {
    bottom: 100%;
    top: unset;
  }

  .is-right > .overlay {
    left: unset;
    right: 0;
  }
}
</style>
