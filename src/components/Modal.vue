<template>
  <dialog
    ref="modal"
    v-bind="$attrs"
    :style="`width:${props.size}${isNumber(props.size) ? 'rem' : ''}`"
    class="modal"
    @cancel="handleEscape"
    @close="closeModal">
    <slot name="close" :close="closeModal">
      <button
        v-if="props.closeable"
        class="modal__close"
        @click="closeModal">
        &times;
      </button>
    </slot>
    <section class="modal__content">
      <slot :close="closeModal" />
    </section>
    <footer v-if="slots.footer" class="modal__footer">
      <slot name="footer" :close="closeModal" />
    </footer>
  </dialog>
  <slot
    name="toggle"
    :open="openModal"
    :close="closeModal"
    :toggle="toggleModal" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { isNumber } from '/@/utils/number';

type Props = {
  open?: boolean;
  closeable?: boolean;
  size?: number | string;
  backdrop?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  open: false,
  size: 20,
  backdrop: true,
});

const emit = defineEmits<{
  'update:open': [value: boolean];
  open: [];
  close: [];
  toggle: [value: boolean];
}>();

const slots = defineSlots<{
  default?: (props: { close: () => void }) => any;
  close?: (props: { close: () => void }) => any;
  footer?: (props: { close: () => void }) => any;
  toggle?: (props: { open: () => void; close: () => void; toggle: () => void }) => any;
}>();

const modal = ref<HTMLDialogElement>();

const toggleModal = (open = !modal.value?.open || false) => {
  if (props.open !== undefined) {
    if (open) {
      if (props.backdrop) modal.value?.showModal();
      else modal.value?.show();
    } else modal.value?.close();
    emit('toggle', open);
    emit('update:open', open);
    if (open) emit('open');
    else emit('close');
  }
  const { clientHeight } = document.body;
  modal.value?.classList.toggle('constrained', modal.value.offsetHeight > clientHeight * 0.9);
};

const openModal = () => toggleModal(true);
const closeModal = () => toggleModal(false);

watch(() => props.open, toggleModal);

const handleEscape = (event: Event) => {
  if (!props.closeable) {
    event.preventDefault();
    event.stopPropagation();
  }
};
</script>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 5;
  margin: 0;
  padding: 0;
  background: var(--modal-background, var(--color-bg, inherit));
  color: inherit;
  border: var(--modal-border, none);
  border-radius: var(--modal-border-radius, 0);
  max-width: 90%;
  max-height: none;
  overflow: visible;

  &[open] { animation: fadein 0.5s ease forwards; }

  &.constrained {
    overflow: auto;
    max-height: 90%;
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
  }

  &::backdrop { background: var(--modal-fade, #0006); }
}

@keyframes fadein {
  0% {
    transform: translate(-50%, calc(-50% - 0.5rem));
    opacity: 0;
  }

  100% { transform: translate(-50%, -50%); }
}
</style>
