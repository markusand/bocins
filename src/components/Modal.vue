<template>
  <dialog
    ref="modal"
    v-bind="$attrs"
    :style="`width:${props.size}${isNumber(props.size) ? 'rem' : ''}`"
    class="modal">
    <slot name="close" :close="close">
      <button
        v-if="props.closeable"
        class="modal__close"
        @click="close">
        &times;
      </button>
    </slot>
    <section class="modal__content">
      <slot :close="close" />
    </section>
    <footer v-if="slots.footer" class="modal__footer">
      <slot name="footer" :close="close" />
    </footer>
  </dialog>
  <slot
    name="toggle"
    :open="open"
    :close="close"
    :toggle="toggle" />
</template>

<script setup lang="ts">
import { ref, watch, useSlots, onMounted } from 'vue';
import { isNumber } from '/@/utils/number';

type Props = {
  open?: boolean;
  closeable?: boolean;
  size?: number | string;
};

const props = withDefaults(defineProps<Props>(), {
  size: 20,
});

const emit = defineEmits(['update:open', 'open', 'close', 'toggle']);

const slots = useSlots();

const modal = ref<HTMLDialogElement>();

const open = () => {
  if (modal.value) {
    modal.value.showModal();
    emit('open');
    emit('toggle', true);
    emit('update:open', true);

    const { clientHeight } = document.body;
    modal.value.classList.toggle('constrained', modal.value.offsetHeight > clientHeight * 0.9);
  }
};

const close = () => {
  modal.value?.close();
  emit('close');
  emit('toggle', false);
  emit('update:open', false);
};

const toggle = (toOpen = !modal.value?.open) => {
  if (toOpen) open();
  else close();
};

watch(() => props.open, toggle, { immediate: true });

onMounted(() => toggle(props.open));
</script>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  margin: 0;
  padding: 0;
  background: var(--modal-background, #fff);
  color: inherit;
  border: var(--modal-border, none);
  border-radius: var(--modal-border-radius, 0);
  max-width: 90%;
  max-height: none;
  overflow: visible;

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
</style>
