<template>
  <Input
    v-model="value"
    v-bind="props"
    :type="type"
    :class="['password', strength.level]">
    <template #suffix>
      <Icon v-if="revealed" src="/@/assets/icons/eye.svg" @click="toggle" />
      <Icon v-else src="/@/assets/icons/eye-off.svg" @click="toggle" />
    </template>
  </Input>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Input, { type InputProps } from './Input.vue';
import Icon from './Icon.vue';

export type PasswordProps = {
  strength?: ((password: string) => boolean)[], 
} & Omit<InputProps, 'type' | 'suffix'>;

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

</script>

<style lang="scss" scoped>
.password {
  position: relative;

  .icon {
    --size: 1em;

    cursor: pointer;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0.25rem;
    left: 0.25rem;
    width: calc(v-bind('strength.points') * 1% - 0.5rem);
    height: 0.125rem;
    transition: all 0.3s ease-in-out;
    border-radius: 0.125rem;
  }

  &.strong::after { background: #5aa45d; }
  &.moderate::after { background: #e2a140; }
  &.low::after { background: #ce4d44; }
}
</style>
