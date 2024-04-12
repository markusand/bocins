<template>
  <div v-if="props.id === active" class="tab-view">
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

const props = defineProps<Tab>();
const active = inject<string | undefined>('active');
</script>
