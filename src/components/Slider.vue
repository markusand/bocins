<template>
  <Slider
    v-model="slider"
    :min="+min"
    :max="+max"
    :interval="+step"
    :min-range="+step"
    :lazy="lazy"
    :marks="marks"
    :dot-size="20"
    contained
    :direction="vertical ? 'btt' : 'ltr'"
    class="b-slider"
    @change="(value, handler) => emit('change', { value, handler })">
    <template #dot="attrs"><slot name="dot" v-bind="attrs" /></template>
    <template #tooltip="attrs"><slot name="tooltip" v-bind="attrs" /></template>
    <template #mark="attrs"><slot name="mark" v-bind="attrs" /></template>
  </Slider>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Slider from 'vue-slider-component';

type Props = {
  modelValue: number | number[];
  min?: number | string;
  max?: number | string;
  step?: number | string;
  lazy?: boolean;
  marks?: number[] | Record<number, string>;
  vertical?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  lazy: false,
  marks: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [value: number | number[]],
  change: [ev: { value: number | number[], handler: number }],
}>();

type SlotProps = { pos: number; index: number; value: number; focus: boolean; disabled: boolean };

defineSlots<{
  dot?: (props: SlotProps) => void;
  tooltip?: (props: SlotProps) => void;
  mark?: (props: { label: number | string; pos: number; value: number; active: boolean }) => void;
}>();

const slider = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});
</script>
