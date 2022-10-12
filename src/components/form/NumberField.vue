<template>
  <InputField
    v-model="number"
    type="number"
    class="input--number">
    <template #prefix>
      <span
        :class="['input__control', { 'input__control--disabled': isMin }]"
        @click="change(-props.step)">
        &minus;
      </span>
    </template>
    <template #suffix>
      <span
        :class="['input__control', { 'input__control--disabled': isMax }]"
        @click="change(+props.step)">
        &plus;
      </span>
    </template>
  </InputField>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { clamp, round, decimals } from '/@/utils/number';
import InputField from './InputField.vue';

type Props = {
  modelValue: number | undefined;
  step?: number | string;
  min?: number | string;
  max?: number | string;
};

const props = withDefaults(defineProps<Props>(), {
  step: 1,
  min: -Infinity,
  max: Infinity,
});

const emit = defineEmits(['update:modelValue']);

const number = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const isMin = computed(() => (number.value || Number.POSITIVE_INFINITY) <= +props.min);
const isMax = computed(() => (number.value || Number.NEGATIVE_INFINITY) >= +props.max);

const change = (delta: number) => {
  const { step, min, max } = props;
  number.value = clamp(round((number.value || 0) + delta, decimals(+step)), +min, +max);
};
</script>

<style lang="scss" scoped>
.input {
  &__control {
    opacity: 0.5;
    cursor: pointer;
    user-select: none;

    &--disabled {
      pointer-events: none;
      color: transparent;
    }
  }
}
</style>

<style lang="scss">
.input--number {
  text-align: center;
}
</style>
