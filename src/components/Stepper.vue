<template>
  <Input
    v-model.number="value"
    v-bind="props"
    :invalid="isInvalid"
    type="number"
    class="stepper">
    <template #prefix>
      <button :disabled="isMin" @click.stop="decrease()">
        <Icon src="/icons/minus.svg" />
      </button>
    </template>
    <template #suffix>
      <button :disabled="isMax" @click.stop="increase()">
        <Icon src="/icons/plus.svg" />
      </button>
    </template>
  </Input>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Input, { type InputProps } from './Input.vue';
import Icon from './Icon.vue';

export type StepperProps = {
  min?: number | string;
  max?: number | string;
  step?: number | string;
} & Omit<InputProps, 'type' | 'prefix' | 'suffix'>;

const props = withDefaults(defineProps<StepperProps>(), {
  min: -Infinity,
  max: Infinity,
  step: 1,
});

const value = defineModel<number | undefined>({ required: true });

const isInvalid = computed(() => {
  const outRange = value.value != null && (value.value < +props.min || value.value > +props.max);
  return props.invalid || outRange;
});
const isMin = computed(() => value.value != null && value.value <= +props.min);
const isMax = computed(() => value.value != null && value.value >= +props.max); 

const increase = (step = +props.step) => {
  const { min, max } = props;
  value.value = Math.max(+min, Math.min(+max, (value.value || 0) + step));
};

const decrease = (step = +props.step) => increase(-1 * step);
</script>

<style lang="scss" scoped>
.stepper {
  text-align: center;

  button {
    all: unset;
    cursor: pointer;
    border-radius: 0.125rem;
    display: block;

    &:focus { background: #8882; }

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.25;
    }

    .icon { --size: 1rem; }
  }
}
</style>
