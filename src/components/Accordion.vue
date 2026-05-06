<template>
  <div class="accordion">
    <slot :active />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue';

defineSlots<{
  default: (props: { active: string | undefined }) => void;
}>();

const active = defineModel<string>();

provide('accordion', active);
</script>
