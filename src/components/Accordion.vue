<template>
  <div class="accordion">
    <slot :active :activate />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue';

defineSlots<{
  default: (props: { active: string | undefined, activate: (name?: string) => void }) => void;
}>();

const active = defineModel<string>();

const activate = (name?: string) => {
  active.value = name;
};

provide('accordion', { active, activate });
</script>
