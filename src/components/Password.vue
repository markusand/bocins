<template>
  <Input
    v-model="value"
    v-bind="props"
    :type
    :autocomplete="autocomplete ? 'current-password' : 'new-password'"
    :class="classes">
    <template #suffix>
      <Icon v-if="revealed" src="eye.svg" @click.prevent="toggle" />
      <Icon v-else src="eye-off.svg" @click.prevent="toggle" />
    </template>
  </Input>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Input, { type InputProps } from './Input.vue';
import Icon from './Icon.vue';

export type PasswordProps = {
  strength?: ((password: string) => boolean)[];
  autocomplete?: boolean;
} & Omit<InputProps, 'type' | 'suffix' | 'autocomplete'>;

const props = defineProps<PasswordProps>();

const value = defineModel<string>({ required: true });

const revealed = ref(false);
const type = computed(() => revealed.value ? 'text' : 'password');

const toggle = () => {
  revealed.value = !revealed.value;
};

const LEVELS: Record<string, number> = {
  strong: 75,
  moderate: 50,
  low: 0,
};

const strength = computed(() => {
  const validations = props.strength?.reduce((acc, fn) => acc + Number(fn(value.value)), 0) ?? 0;
  const points = validations / (props.strength?.length || 1) * 100;
  const level = Object.keys(LEVELS).find(key => points >= LEVELS[key]) || 'low';
  return { points, level };
});

const classes = computed(() => ['password', `password--${strength.value.level}`]);
</script>

<style scoped>
.password {
  --strong-color: var(--password-strong-color, #5aa45d);
  --moderate-color: var(--password-moderate-color, #e2a140);
  --low-color: var(--password-low-color, #ce4d44);

  position: relative;

  .icon {
    --size: 1em;

    cursor: pointer;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0.25em;
    left: 0.25em;
    width: calc(v-bind('strength.points') * 1% - 0.5em);
    height: 0.125em;
    transition: all 0.3s ease-in-out;
    border-radius: 0.125em;
  }

  &.password--strong::after { background: var(--strong-color); }
  &.password--moderate::after { background: var(--moderate-color); }
  &.password--low::after { background: var(--low-color); }
}
</style>
