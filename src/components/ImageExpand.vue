<template>
  <figure class="image-expand" :style>
    <img :src="thumbnail || src" :alt>
    <Button class="image-expand__toggle" even @click="open">
      <Icon src="expand.svg" />
    </Button>
    <dialog ref="dialog" @click.self="close" @cancel.prevent="close">
      <img :src :alt>
      <div class="image-expand__controls">
        <slot name="controls" />
        <Button even @click.stop="close">
          <Icon src="shrink.svg" />
        </Button>
      </div>
    </dialog>
  </figure>
</template>

<script setup lang="ts">
import { ref, computed, useId } from 'vue';
import Button from './Button.vue';
import Icon from './Icon.vue';

export type ImageExpandProps = {
  src: string;
  thumbnail?: string;
  alt: string;
};

defineProps<ImageExpandProps>();

defineSlots<{
  controls?: () => void;
}>();

const dialog = ref<HTMLDialogElement>();

const id = useId();
const style = computed(() => ({ '--vt-name': `image-expand-${id}` }));

const transition = (fn: () => void) => {
  if ('startViewTransition' in document) document.startViewTransition(fn);
  else fn();
};

const open = () => transition(() => dialog.value?.showModal());
const close = () => transition(() => dialog.value?.close());
</script>

<style scoped>
.image-expand {
  --bg-color: var(--image-expand-bg-color, #000a);
  --focus-shadow: 0 0 0 0.25rem color-mix(in srgb, currentcolor 5%, transparent);

  display: inline-block;
  position: relative;
  background: var(--bg-color);
  overflow: hidden;
  max-width: 100%;
  margin: 0;
  box-shadow: 0 0 0 0 transparent;

  &:focus-within { box-shadow: var(--focus-shadow); }

  & > img {
    height: 100%;
    width: 100%;
    display: block;
    object-fit: contain;
    view-transition-name: var(--vt-name);
  }

  dialog {
    border: none;
    padding: 0;
    margin: 0;
    width: 100dvw;
    height: 100dvh;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    background: var(--bg-color);

    & > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      view-transition-name: var(--vt-name);
    }
  }

  &:has(dialog[open]) > img { view-transition-name: none; }

  .image-expand__toggle,
  .image-expand__controls {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.25rem;
  }
}

</style>
