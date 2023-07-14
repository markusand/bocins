<template>
  <Teleport :to="props.to">
    <dialog
      ref="modal"
      v-bind="$attrs"
      :style="`width:${props.size}${isNumber(props.size) ? 'rem' : ''}`"
      class="b-modal"
      @cancel="handleEscape"
      @close="closeModal">
      <slot name="close" :close="closeModal">
        <button
          v-if="props.closeable"
          class="b-modal__close"
          @click="closeModal">
          &times;
        </button>
      </slot>
      <section class="b-modal__content">
        <slot :close="closeModal" />
      </section>
      <footer v-if="slots.footer" class="b-modal__footer">
        <slot name="footer" :close="closeModal" />
      </footer>
    </dialog>
  </Teleport>
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
  to?: string;
  open?: boolean;
  closeable?: boolean;
  size?: number | string;
  backdrop?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  to: 'body',
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
