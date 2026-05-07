<template>
  <div v-if="id === active" class="tab-view">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';

export type Tab = {
  id: string;
  label?: string;
  disabled?: boolean;
};

defineProps<Tab>();
  
defineSlots<{
  default: () => void;
}>();

const active = inject<string | undefined>('active');
</script>
