<template>
  <span class="b-avatar" :data-initials="initials">
    <img v-if="src" :src="src" :alt="`${props.name} avatar`">
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Props = {
  src: string | null | undefined;
  name: string;
};

const props = defineProps<Props>();

const initials = computed(() => props.name.split(' ').slice(0, 2).map(str => str.charAt(0)).join(''));
</script>
