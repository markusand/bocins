<template>
  <span :class="['b-chip', { primary }]">
    <slot>{{ text }}</slot>
    <slot v-if="closeable || slots.close" name="close">
      <a href="#" role="button" @click.prevent="emit('close')">&times;</a>
    </slot>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  text?: string;
  primary?: boolean;
  closeable?: boolean;
}>();

const emit = defineEmits<{ close: [] }>();

const slots = defineSlots<{
  default?: () => void;
  close?: () => void;
}>();
</script>
