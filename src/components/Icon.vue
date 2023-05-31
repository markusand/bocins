<template>
  <span class="b-icon">
    <img v-svg-inline :src="props.src">
  </span>
</template>

<script setup lang="ts">
import vSvgInline from '/@/utils/svg-inline';

const props = defineProps<{ src: string }>();
</script>
