<template>
  <div v-if="isOpen" class="modal-fade" />
  <dialog
    v-if="isOpen"
    v-bind="$attrs"
    :style="`width:${props.size}${isNumber(props.size) ? 'rem' : ''}`"
    class="modal"
    open>
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
import { ref, watch, useSlots } from 'vue';
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

const isOpen = ref(props.open);
watch(isOpen, open => {
  emit(open ? 'open' : 'close');
  emit('toggle', open);
  emit('update:open');
});
watch(() => props.open, open => { isOpen.value = open; });

const open = () => { isOpen.value = true; };
const close = () => { isOpen.value = false; };
const toggle = () => { isOpen.value = !isOpen.value; };
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
  overflow: auto;
  background: var(--modal-background, #fff);
  color: inherit;
  border: var(--modal-border, none);
  border-radius: var(--modal-border-radius, 0);
  max-width: 90%;
  max-height: 90%;

  &__close {
    position: absolute;
    top: 0;
    right: 0;
  }

  &-fade {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 5;
    background: var(--modal-fade, #0006);
  }
}
</style>
