<template>
  <div :class="['hotkey', { active }]">
    <kbd v-for="key in combo" :key>
      <Icon v-if="ICONS[key]" :src="`/icons/${ICONS[key]}.svg`" />
      <small v-else-if="key === 'escape'" class="small">ESC</small>
      <span v-else>{{ key }}</span>
    </kbd>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Icon from './Icon.vue';

const props = defineProps<{
  keys: string;
  disabled?: boolean;
}>();

const isMac = navigator.platform.toUpperCase().includes('MAC');

const ICONS: Record<string, string> = {
  tab: 'arrow-right-to-line',
  backspace: 'delete',
  enter: 'corner-down-left',
  shift: 'arrow-big-up',
  meta: 'layout-grid',
  ...(isMac && {
    ctrl: 'chevron-up',
    meta: 'command',
    alt: 'option',
  }),
};

const emit = defineEmits<{
  press: [];
  release: [];
}>();

const active = ref(false);
const combo = computed(() => props.keys.split('+').map(key => key.trim().toLocaleLowerCase()));

const onKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return;
  const pressed = [
    event.ctrlKey && 'ctrl',
    event.metaKey && 'meta',
    event.shiftKey && 'shift',
    event.altKey && 'alt',
    event.key.toLowerCase(),
  ].filter(Boolean).join('+');
  if (pressed === combo.value.join('+')) {
    event.preventDefault();
    emit('press');
    active.value = true;
  }
};

const onKeyup = (event: KeyboardEvent) => {
  const match = event.key.toLowerCase() === combo.value.at(-1);
  if (active.value && match) {
    emit('release');
    active.value = false;
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown);
  document.addEventListener('keyup', onKeyup);
});

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown);
  document.removeEventListener('keyup', onKeyup);
});
</script>

<style scoped>
.hotkey {
  --color: #888;
  --color-active: #333;

  display: inline-flex;
  align-items: center;
  gap: 0.125em;
  color: var(--color);

  kbd {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.125em;
    font-size: 0.75em;
    background: color-mix(in srgb, currentcolor 10%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, currentcolor 10%, transparent);
    border-radius: 0.25em;
    padding: 0 0.5em;
    height: 1.75em;
    min-width: 1.75em;
    box-sizing: border-box;
    text-transform: capitalize;

    .icon { --size: 1em; display: block; }
  }

  &.active { color: var(--color-active); }
}
</style>
