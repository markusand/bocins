<template>
  <picture :class="['icon', size && `icon--${size}`]">
    <img v-svg-inline :src>
  </picture>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { vSvgInline } from '/@/utils';
import { config } from '/@/config';

export type IconProps = {
  src: string;
  size?: 'small' | 'medium' | 'large';
};

const props = defineProps<IconProps>();

const src = computed(() => (
  /^(https?:)?\//.test(props.src)
    ? props.src
    : `${config.iconPath}/${props.src}`
));
</script>

<style scoped>
.icon {
  --color: var(--icon-color, currentcolor);
  --size: var(--icon-size, 1.25rem);

  display: inline-block;
  vertical-align: middle;
  flex: 0 0 auto;

  img,
  svg {
    display: block;
    flex: 0 0 var(--size);
    height: var(--size);
    width: var(--size);
    max-width: none;
    color: var(--color);
  }

  &.icon--small { --size: 1rem; }
  &.icon--medium { --size: 1.5rem; }
  &.icon--large { --size: 2rem; }
}
</style>
