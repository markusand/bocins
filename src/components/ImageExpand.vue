<template>
  <Teleport to="body" :disabled="!expanded">
    <picture :class="['image-expand', { expanded }]">
      <img :src="expanded ? props.src : props.thumbnail || props.src" :alt="props.alt">
      <div class="controls">
        <slot name="controls" />
        <ToggleButton v-model="expanded" even @click.prevent>
          <Icon v-if="expanded" src="/icons/collapse.svg" />
          <Icon v-else src="/icons/expand.svg" />
        </ToggleButton>
      </div>
    </picture>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ToggleButton from './ToggleButton.vue';
import Icon from './Icon.vue';

const props = defineProps<{
  src: string;
  thumbnail?: string;
  alt: string;
}>();

defineSlots<{
  controls: () => void;
}>();

const expanded = ref(false);
</script>

<style lang="scss" scoped>
.image-expand {
  display: inline-block;
  position: relative;
  background: var(--color-bg, #000d);
  overflow: hidden;
  max-width: 100%;

  & > img {
    height: 100%;
    width: 100%;
    display: block;
    object-fit: contain;
  }

  .controls {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.25rem;
  }

  &.expanded {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 9999;
  }
}
</style>
