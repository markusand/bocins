<template>
  <fieldset
    :class="['passcode', { invalid }]"
    :disabled="props.disabled"
    @click.prevent="focusLast">
    <input
      v-for="i in props.length"
      :key="i"
      v-model="passcode[i - 1]"
      type="password"
      maxlength="1"
      placeholder=" "
      autocomplete="off"
      :inputmode="props.numeric ? 'numeric' : 'text'"
      @input="next"
      @keydown.backspace="prev">
  </fieldset>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

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

<style lang="scss" scoped>
@import '../styles';

.passcode {
  --size: 2rem;

  display: inline-flex;
  gap: 0.5em;
  border: none;
  padding: 0;
  margin: 0;

  input {
    all: unset;
    font-size: var(--size);
    width: 1em;
    height: 1.5em;
    background: var(--color-bg, none);
    box-shadow:  0 0 0 var(--border-width, 1px) var(--color-border, #8886);
    color: var(--color-text, currentcolor);
    text-align: center;
    border-radius: var(--radius, 0.125em);

    &:not(:placeholder-shown),
    &:focus { --color-border: var(--color-accent, #333); }

    &:focus {
      --color-text: var(--color-accent, #333);
  
      outline: 0.125em solid color-mix(in srgb, var(--color-accent, #333) 10%, transparent);
    }
  }

  &.invalid input { @extend %invalid; }
  &:disabled input { @extend %disabled; }
}
</style>
