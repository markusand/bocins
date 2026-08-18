<template>
  <div :class="['pull-to', { pulling: dY > 0, ready }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  threshold: number;
  onTrigger?: (dY: number) => Promise<void>;
}>();

const startY = ref(0);
const dY = ref(0);
const ready = ref(false);
const height = computed(() => `${dY.value}px`);

const onPullStart = (event: TouchEvent) => {
  if (window.scrollY > 0) return;
  startY.value = event.touches[0].clientY;
};

const onPull = (event: TouchEvent) => {
  if (!startY.value) return;
  dY.value = Math.max(0, event.touches[0].clientY - startY.value);
  ready.value = dY.value > props.threshold;
};

const onPullStop = async () => {
  if (!startY.value) return;
  if (ready.value) await props.onTrigger?.(dY.value);
  startY.value = 0;
  dY.value = 0;
  ready.value = false;
};

onMounted(() => {
  document.addEventListener("touchstart", onPullStart);
  document.addEventListener("touchmove", onPull);
  document.addEventListener("touchend", onPullStop);
});

onUnmounted(() => {
  document.removeEventListener("touchstart", onPullStart);
  document.removeEventListener("touchmove", onPull);
  document.removeEventListener("touchend", onPullStop);
});
</script>

<style scoped>
.pull-to {
  --timing: var(--pull-to-timing, 0.5s);
  --text-color: var(--pull-to-text-color, #8888);
  --text-color-ready: var(--pull-to-text-color-ready, inherit);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 0;
  overflow: hidden;
  color: var(--text-color);
  opacity: 0;
  transition: all var(--timing) ease;

  &.pulling {
    height: v-bind(height); /* stylelint-disable-line */
    opacity: 1;
    transition: opacity var(--timing) ease;
  }

  &.ready { color: var(--text-color-ready); }
}
</style>
