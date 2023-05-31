<template>
  <InputField
    v-model="number"
    :step="props.step"
    :min="props.min"
    :max="props.max"
    type="number"
    class="b-input--number">
    <template #prefix>
      <span
        :class="['b-input__control', { 'b-input__control--disabled': isMin }]"
        @click="change(-props.step)">
        &minus;
      </span>
    </template>
    <template #suffix>
      <span
        :class="['b-input__control', { 'b-input__control--disabled': isMax }]"
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
  modelValue: number;
  step?: number | string;
  min?: number | string;
  max?: number | string;
};

const props = withDefaults(defineProps<Props>(), {
  step: 1,
  min: -Infinity,
  max: Infinity,
});

const emit = defineEmits<{
  'update:modelValue': [value: number],
}>();


const number = computed({
  get: () => String(props.modelValue),
  set: value => emit('update:modelValue', +value),
});

const isMin = computed(() => (+number.value || Number.POSITIVE_INFINITY) <= +props.min);
const isMax = computed(() => (+number.value || Number.NEGATIVE_INFINITY) >= +props.max);

const change = (delta: number) => {
  const { step, min, max } = props;
  number.value = String(clamp(round((+number.value || 0) + delta, decimals(+step)), +min, +max));
};
</script>
