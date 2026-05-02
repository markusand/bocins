<template>
  <Teleport :to>
    <dialog
      ref="modal"
      class="modal is-panel"
      v-bind="props"
      :style="size"
      @cancel="handleEscape"
      @close="close">
      <slot name="close" :close="close">
        <button
          v-if="closeable"
          type="button"
          class="modal__close"
          @click.stop="close">
          &times;
        </button>
      </slot>
      <section v-if="!!isOpen" class="modal__content">
        <slot :close="close" />
      </section>
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
  width: 20,
  height: 'content-fit',
});

const emit = defineEmits<{
  open: [];
  close: [];
}>();

defineSlots<{
  default?: (props: { close: Action }) => void;
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
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  margin: 0;
  padding: 0;
  color: inherit;
  border: none;
  max-width: 90%;
  max-height: 80%;
  overflow: visible;

  &::backdrop { background: var(--color-fade, #0006); }
}

.modal__close {
  all: unset;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.125rem;
  margin: 0.25rem 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;
  opacity: 0.5;

  &:hover { opacity: 1; }
}

.modal__content {
  height: 100%;
  box-sizing: border-box;
}
</style>
