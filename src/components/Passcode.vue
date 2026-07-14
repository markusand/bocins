<template>
  <fieldset :class="classes" :disabled @click.stop="focusLast">
    <input
      v-for="i in length"
      :key="i"
      v-model="passcode[i - 1]"
      class="is-input"
      type="password"
      maxlength="1"
      placeholder=" "
      autocomplete="off"
      :inputmode="numeric ? 'numeric' : 'text'"
      @input="next"
      @keydown.backspace="prev">
  </fieldset>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

export type PasscodeProps = {
  length: number;
  invalid?: boolean;
  disabled?: boolean;
  numeric?: boolean
};

const props = defineProps<PasscodeProps>();

const emit = defineEmits<{
  change: [passcode: string];
  fill: [passcode: string];
}>();

const classes = computed(() => ['passcode', {
  'is-invalid': props.invalid,
}]);

const passcode = ref<string[]>(Array(props.length).fill(''));

watch(passcode, value => {
  const code = value.filter(Boolean).join('');
  if (code.length === props.length) emit('fill', code);
  emit('change', code);
}, { deep: true });

const next = (event: Event) => {
  const element = event.target as HTMLInputElement;
  const target = element.nextElementSibling as HTMLInputElement | undefined;
  if (!target || !element.value) return;
  else target.focus();
};

const prev = (event: Event) => {
  const element = event.target as HTMLInputElement;
  const target = element.previousElementSibling as HTMLInputElement | undefined;
  if (!target || element.value) return;
  target.focus();
};

const focusLast = (event: Event) => {
  const element = event.target as HTMLInputElement;
  const { length } = passcode.value.filter(Boolean);
  const last = length < props.length ? length : props.length - 1;
  const target = element.parentElement?.children[last] as HTMLInputElement | undefined;
  target?.focus();
};
</script>

<style scoped>
.passcode {
  --size: var(--passcode-size, 2rem);
  --gap: var(--passcode-gap, 0.5em);
  --bg-color: var(--passcode-bg-color, none);
  --text-color: var(--passcode-text-color, currentcolor);
  --border: var(--passcode-border, 1px solid #8886);

  display: inline-flex;
  gap: var(--gap);
  border: none;
  padding: 0;
  margin: 0;

  input {
    all: unset;
    font-size: var(--size);
    width: 1em;
    height: 1.5em;
    background: var(--bg-color);
    border: var(--border);
    color: var(--text-color);
    text-align: center;
    border-radius: var(--passcode-radius, var(--radius, 0.25em));
    transition: all 0.3s ease;
      
    &:not(:placeholder-shown),
    &:focus { border-color: var(--accent-color, #333); }
  }

  &.is-invalid { animation: shake 0.4s ease; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}
</style>
