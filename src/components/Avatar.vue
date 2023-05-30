<template>
  <span class="avatar" :data-initials="initials">
    <img v-if="src" :src="src">
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Props = {
  src?: string | null;
  name?: string;
};

const props = defineProps<Props>();

const initials = computed(() => {
  if (!props.name) return '';
  return props.name.split(' ').slice(0, 2).map(str => str.charAt(0)).join('');
});
</script>

<style lang="scss" scoped>
.avatar {
  --size: var(--avatar-size, 2rem);
  --radius: var(--avatar-radius, 15%);

  display: inline-block;
  flex: 0 0 var(--size);
  vertical-align: middle;
  position: relative;
  height: var(--size);
  width: var(--size);
  font-size: calc(var(--size) / 2.5);
  border-radius: var(--radius);

  &::before {
    content: attr(data-initials);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    color: var(--avatar-text-color, #000);
    background: var(--avatar-bgcolor, #ddd);
    border-radius: var(--radius);
    text-transform: uppercase;
    font-size: calc(0.5 * var(--size));
  }

  img {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    border-radius: var(--radius);
  }
}
</style>

<style lang="scss">
.avatar-group {
  display: flex;
  padding-left: 0.5rem;

  .avatar {
    margin-left: -0.5rem;
    outline: 2px solid var(--color-bg);
  }
}
</style>
