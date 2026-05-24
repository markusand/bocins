<template>
  <Teleport :to>
    <dialog
      ref="modal"
      class="modal is-panel"
      v-bind="props"
      :style="size"
      @cancel="handleEscape"
      @close="close">
      <slot name="close" :close>
        <button
          v-if="closeable"
          type="button"
          class="modal__close"
          @click.stop="close">
          &times;
        </button>
      </slot>
      <slot :close :open="isOpen" />
    </dialog>
  </Teleport>
  <slot name="toggler" :open :close :toggle />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { toWidth, toHeight } from '/@/utils';

type Action = () => void;

export type ModalProps = {
  to?: string;
  closeable?: boolean;
  width?: number | string;
  height?: number | string;
  plain?: boolean;
};

const props = withDefaults(defineProps<ModalProps>(), {
  to: 'body',
  height: 'content-fit',
});

const emit = defineEmits<{
  open: [];
  close: [];
}>();

defineSlots<{
  default?: (props: { close: Action; open: boolean }) => void;
  close?: (props: { close: Action }) => void;
  toggler?: (props: { open: Action; close: Action; toggle: Action }) => void;
}>();

const modal = ref<HTMLDialogElement>();
const isOpen = defineModel<boolean>('open', { default: false });

const size = computed(() => ({
  ...toWidth(props.width),
  ...toHeight(props.height),
}));

watch(isOpen, open => {
  if (open) {
    if (!modal.value?.open) {
      if (props.plain) modal.value?.show();
      else modal.value?.showModal();
    }
    emit('open');
  } else {
    modal.value?.close();
    emit('close');
  }
}, { immediate: true, flush: 'post' });

const open = () => { isOpen.value = true; };
const close = () => { isOpen.value = false; };
const toggle = () => { isOpen.value = !isOpen.value; };

const handleEscape = (event: Event) => {
  if (!props.closeable) {
    event.preventDefault();
    event.stopPropagation();
  }
};
</script>

<style scoped>
.modal {
  --border: var(--modal-border, 1px solid var(--border-color, #8884));
  --radius: var(--modal-radius, 0.25rem);
  --max-width: var(--modal-max-width, calc(100% - 2rem));
  --max-height: var(--modal-max-height, calc(100% - 2rem));
  --backdrop-color: var(--modal-backdrop-color, #0006);
  --backdrop-filter: var(--modal-backdrop-filter, none);
  --translate: var(--modal-in-translate, 0 25%);
  --timing: var(--modal-timing, 0.3s);

  position: fixed;
  inset: 0;
  margin: auto;
  z-index: 5;
  color: inherit;
  box-sizing: border-box;
  border: var(--border);
  border-radius: var(--radius);
  max-width: var(--max-width);
  max-height: var(--max-height);
  outline: none;
  opacity: 0;
  translate: var(--translate);
  interpolate-size: allow-keywords;
  transition:
    all var(--timing) ease,
    display var(--timing) allow-discrete,
    overlay var(--timing) allow-discrete;

  &::backdrop {
    opacity: 0;
    background: var(--backdrop-color);
    backdrop-filter: var(--backdrop-filter);
    transition:
      all var(--timing),
      display var(--timing) allow-discrete,
      overlay var(--timing) allow-discrete;
  }

  &[open] {
    opacity: 1;
    translate: none;

    &::backdrop { opacity: 1; }
  }

  @starting-style {
    &[open] {
      opacity: 0;
      translate: var(--translate);

      &::backdrop { opacity: 0; }
    }
  }

  .modal__close {
    all: unset;
    position: absolute;
    top: 0;
    right: 0;
    width: fit-content;
    padding: 0.125rem;
    margin: 0.25rem 0.5rem;
    font-size: 1.25rem;
    cursor: pointer;
    opacity: 0.5;

    &:hover { opacity: 1; }
  }
}
</style>
