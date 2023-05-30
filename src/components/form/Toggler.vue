<template>
  <label :class="['toggler', { silent, block, switch: isSwitch }]">
    <input
      v-model="toggleValue"
      :type="type"
      :value="value"
      :disabled="disabled">
    <span v-if="isSwitch" class="switch__toggle" />
    <Icon v-else src="/icons/check.svg" class="toggler__toggle" />
    <span class="toggler__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import Icon from '../Icon.vue';

const props = defineProps<{
  modelValue: T | T[] | undefined;
  value?: T;
  label?: string;
  switch?: boolean;
  disabled?: boolean;
  block?: boolean;
  silent?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: T | T[] | undefined],
  change: [value: T | T[] | undefined],
}>();

const toggleValue = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value);
    emit('change', value);
  },
});

const isSwitch = computed(() => props.switch);

const type = computed(() => (
  typeof props.modelValue === 'boolean' || Array.isArray(props.modelValue) ? 'checkbox' : 'radio'
));
</script>

<style lang="scss" scoped>
.toggler {
  --background: var(--toggler-background, #aaa);
  --color: var(--toggler-color, var(--color-primary, #39f));
  --size: var(--toggler-size, 1em);
  --speed: var(--transition-speed, 0.3s);

  display: inline-flex;
  gap: 0.5em;
  align-items: center;
  vertical-align: middle;
  margin:
    calc(var(--input-padding, 0.5rem) + (1rem - var(--size)) / 2)
    var(--input-margin, 1px);

  input { display: none; }

  &.block {
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  &__toggle {
    --size: var(--toggler-size, 1em);

    color: var(--background);
    background: var(--background);
    display: block;
    border: 1px solid currentcolor;
    border-radius: var(--toggler-radius, 0.25rem);
    transform: scale(0.5);
    transition: all var(--speed) ease;
  }

  input[type="radio"] + &__toggle { border-radius: 50%; }

  input:checked + &__toggle {
    color: var(--color);
    background: transparent;
    transform: scale(1);
    animation: bounce var(--speed) forward;
  }

  &.silent &__toggle { display: none; }

  &:hover input:not(:disabled) + &__toggle {
    transform: scale(1);
    background: transparent;
  }

  input:disabled ~ * {
    opacity: 0.25;
    cursor: not-allowed;
  }
}

.switch {
  --size: var(--switch-size, 1.25em);
  --background: var(--switch-background, #8883);
  --color: var(--switch-color, var(--color-primary, #39f));
  --border: var(--switch-border, 1px solid #8886);
  --thumb: var(--switch-thumb, #fff);

  &__toggle {
    display: inline-block;
    vertical-align: middle;
    height: var(--size);
    width: calc(2 * var(--size));
    background: var(--background);
    border: var(--border);
    border-radius: var(--size);
    position: relative;
    cursor: pointer;
    transition: all var(--speed) ease;

    &::before {
      content: "";
      display: block;
      height: var(--size);
      width: var(--size);
      border-radius: 50%;
      background: var(--thumb);
      border: inherit;
      margin: -1px;
      position: absolute;
      left: 0;
      transition: inherit;
    }

    :checked + & {
      background: var(--color);
      border-color: var(--color);

      &::before { left: calc(100% - var(--size)); }
    }
  }
}
</style>
