<template>
  <Teleport to="body" :disabled="!expanded">
    <picture :class="['image-expand', modifiers]">
      <img :src="expanded ? props.src : props.thumbnail || props.src" :alt="props.alt">
      <div class="image-expand__controls">
        <slot name="controls" />
        <ToggleButton v-model="expanded" even @click.stop>
          <Icon v-if="expanded" :src="`${config.iconPath}/collapse.svg`" />
          <Icon v-else :src="`${config.iconPath}/expand.svg`" />
        </ToggleButton>
      </div>
    </picture>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { config } from '/@/config';
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

const modifiers = computed(() => ({
  'image-expand--expanded': expanded.value,
}));
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

  &__controls {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.25rem;
  }

  &--expanded {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 9999;
  }
}
</style>
