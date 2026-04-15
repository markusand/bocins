<template>
  <picture class="cover">
    <img :src="props.src">
    <div class="license">
      {{ props.license }}
    </div>
  </picture>
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string;
  license: string;
}>();
</script>

<style scoped>
.cover {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
}

.cover img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.cover .license {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0.5rem;
  color: #fff;
  font-size: 0.5rem;
  font-family: sans-serif;
  z-index: 1;
  opacity: 0.5;
}
</style>
