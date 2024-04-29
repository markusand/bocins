<template>
  <Teleport to="body">
    <dialog
      ref="modal"
      class="modal"
      v-bind="props"
      :style="size"
      @cancel="handleEscape"
      @close="close">
      <slot name="close" :close="close">
        <button
          v-if="props.closeable"
          type="button"
          class="modal__close"
          @click.prevent="close">
          &times;
        </button>
      </slot>
      <section class="modal__content">
        <slot :close="close" />
      </section>
    </dialog>
  </Teleport>
  <slot name="toggler" :open="open" :close="close" :toggle="toggle" />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { toWidth, toHeight } from '/@/utils';

type Action = () => void;

export type ModalProps = {
  open?: boolean;
  closeable?: boolean;
  width?: number | string;
  height?: number | string;
  plain?: boolean;
};

const props = defineProps<ModalProps>();

const emit = defineEmits<{
  'update:open': [isOpen: boolean];
  open: [];
  close: [];
  toggle: [isOpen: boolean];
}>();

defineSlots<{
  default?: (props: { close: Action }) => void;
  close?: (props: { close: Action }) => void;
  toggler?: (props: { open: Action; close: Action; toggle: Action }) => void;
}>();

const modal = ref<HTMLDialogElement>();

const size = computed(() => ({
  ...toWidth(props.width ?? 20),
  ...toHeight(props.height ?? 'content-fit'),
}));

const open = () => {
  if (props.plain) modal.value?.show();
  else modal.value?.showModal();
  emit('open');
  emit('update:open', true);
};

const close = () => {
  modal.value?.close();
  emit('close');
  emit('update:open', false);
};

const toggle = () => {
  const isOpen = modal.value?.open ?? false;
  if (isOpen) close();
  else open();
  emit('toggle', !isOpen);
  emit('update:open', !isOpen);
};

watch(() => props.open, toggle);

const handleEscape = (event: Event) => {
  if (!props.closeable) {
    event.preventDefault();
    event.stopPropagation();
  }
};

onMounted(() => props.open && open());
</script>

<style lang="scss" scoped>
@import '../styles';

.modal {
  @extend %panel;

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

  &__close {
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

  &::backdrop { background: var(--color-fade, #0006); }
}
</style>

<style>
dialog::backdrop { background: red; }
</style>
