<template>
  <picture class="icon" :class="{ [`icon--${props.size}`]: props.size }">
    <img v-svg-inline :src="props.src">
  </picture> 
</template>

<script setup lang="ts">
import { vSvgInline } from '/@/utils';

export type IconProps = {
  src: string;
  size?: 'small' | 'medium' | 'large';
};

const props = defineProps<IconProps>();
</script>

<style lang="scss" scoped>
.icon {
  --color: var(--icon-color, currentcolor);
  --size: var(--icon-size, 1.25rem);

  display: inline-block;
  vertical-align: middle;

  img,
  svg {
    display: block;
    flex: 0 0 var(--size);
    height: var(--size);
    width: var(--size);
    color: var(--color);
  }

  &--small { --size: 1rem; }
  &--medium { --size: 1.5rem; }
  &--large { --size: 2rem; }
}
</style>
