<template>
  <picture class="avatar">
    <img v-if="src" :src :alt="props.name">
    <div v-else class="initials">{{ initials }}</div>
    <div v-if="props.badge || props.badge === 0 || slots.badge" class="badge">
      <slot name="badge">
        {{ typeof props.badge === 'boolean' ? '' : props.badge }}
      </slot>
    </div>
  </picture>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export type AvatarProps = {
  name: string;
  src: string | null | undefined;
  badge?: boolean | number;
};

const props = defineProps<AvatarProps>();

const slots = defineSlots<{
  badge?: () => void;
}>();

const initials = computed(() => props.name.split(' ').slice(0, 2).map(str => str.charAt(0)).join(''));
</script>

<style lang="scss" scoped>
.avatar {
  --size: var(--avatar-size, 2rem);
  --radius: var(--avatar-radius, 15%);
  --color: var(--avatar-color, #8883);
  --color-text: var(--avatar-color-text, #888);

  display: inline-block;
  height: var(--size);
  width: var(--size);
  flex: 0 0 var(--size);
  vertical-align: middle;
  position: relative;
  border-radius: var(--radius);

  img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: var(--radius);
  }

  .initials {
    display: grid;
    place-content: center;
    aspect-ratio: 1;
    background: var(--color);
    color: var(--color-text);
    border-radius: var(--radius);
    font-size: calc(0.45 * var(--size));
    text-transform: uppercase;
    font-family: sans-serif;
  }

  .badge {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.25rem 0.35rem;
    background: var(--color-badge, #66b132);
    transform: translate(50%, -50%);
    border-radius: 1rem;
    font-size: 0.5rem;
    color: #fff;
    border: 1px solid var(--color-bg, #fff);
    line-height: 1;
    font-family: monospace;

    &:empty { padding: 0.25rem; }
  }
}
</style>
