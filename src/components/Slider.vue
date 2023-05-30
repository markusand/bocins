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

<style lang="scss">
.vue-slider {
  --color: var(--slider-color, var(--color-primary, #39f));
  --size: var(--slider-size, 150px);
  --weight: var(--slider-weight, 4px);

  z-index: 0;

  &-rtl,
  &-ltr {
    width: var(--size) !important;
    height: var(--weight) !important;
    margin: 0.5rem 0;
  }

  &-ttb,
  &-btt {
    height: var(--size) !important;
    width: var(--weight) !important;
    margin: 0 auto;
  }

  &-rail {
    background-color: var(--slider-color-rail, #8883);
    border-radius: 4px;
  }

  &-process {
    background-color: var(--color);
    border-radius: 4px;
  }

  &-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &-dot {
    &-handle {
      cursor: pointer;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: var(--slider-color-handle, #fff);
      box-shadow: var(--slider-shadow-handle, 0 0 0 1px #8888);
      box-sizing: border-box;

      &-disabled { display: none; }
    }

    &-tooltip-inner {
      font-size: 0.9rem;
      white-space: nowrap;
      padding: 0.25rem 0.4rem;
      text-align: center;
      color: #fff;
      border-radius: 0.25rem;
      background-color: var(--color);
    }
  }

  &-mark {
    z-index: 1;

    &-step {
      width: 50%;
      height: 100%;
      background: #8888;
    }

    &-label {
      font-size: 0.75em;
      white-space: nowrap;
      margin-top: 0.75em !important;
      opacity: 0.4;
    }
  }
}
</style>
