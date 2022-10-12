<template>
  <span class="icon">
    <img v-svg-inline :src="props.src">
  </span>
</template>

<script setup lang="ts">
import vSvgInline from '/@/utils/svg-inline';

const props = defineProps<{ src: string }>();
</script>

<style lang="scss" scoped>
.icon {
  --size: var(--icon-size, 24px);

  vertical-align: middle;
  fill: currentcolor;
  display: inline-block;

  img,
  svg {
    height: var(--size);
    width: var(--size);
    flex: 0 0 var(--size);
    display: block;
  }

  .input &,
  .button & { --size: 1em; }

  .button &.unique { margin: 0 calc(-1 * var(--button-padding, 0.5rem)); }
}
</style>
