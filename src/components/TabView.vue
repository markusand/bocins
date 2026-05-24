<template>
  <Transition :name="transition">
    <div
      v-if="id === active"
      :id
      :aria-labelledby="`${id}-tab`"
      class="tab-view"
      role="tabpanel">
      <slot />
    </div>
  </Transition>
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
const transition = inject<string>('transition', '');
</script>

<style scoped>
.tab-slide-x-enter-active,
.tab-slide-x-leave-active {
  --timing: var(--tabs-timing, 0.25s);

  transition: opacity var(--timing) ease, translate var(--timing) ease;
}

.tab-slide-x-enter-from {
  opacity: 0;
  translate: calc(var(--tab-direction, 1) * 100%) 0;
}

.tab-slide-x-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.tab-slide-x-leave-to {
  opacity: 0;
  translate: calc(var(--tab-direction, 1) * -100%) 0;
}

.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: opacity var(--tabs-timing, 0.25s) ease;
}

.tab-fade-enter-from,
.tab-fade-leave-to {
  opacity: 0;
}

.tab-fade-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.tab-slide-y-enter-active {
  position: relative;
  z-index: 1;
  transition: opacity var(--tabs-timing, 0.25s) ease, translate var(--tabs-timing, 0.25s) ease;
}

.tab-slide-y-enter-from {
  opacity: 0;
  translate: 0 -1rem;
}

.tab-slide-y-leave-active {
  position: absolute;
  inset: 0;
  animation: tab-hold var(--tabs-timing, 0.25s) forwards;
}

@keyframes tab-hold {
  to { opacity: 1; }
}
</style>
