<template>
  <div :class="classes" :style @click.stop="onTrackClick">
    <input
      v-if="isRange(model)"
      type="range"
      v-bind="attrs"
      :value="model[0]"
      :aria-valuemax="model[1]"
      aria-label="Minimum"
      @input="onInput(0, $event)">
    <input
      type="range"
      v-bind="attrs"
      :value="isRange(model) ? model[1] : model ?? +min"
      :aria-valuemin="isRange(model) ? model[0] : undefined"
      :aria-label="isRange(model) ? 'Maximum' : undefined"
      @input="onInput(1, $event)">
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';
import { toWidth, clamp, percent } from '/@/utils';

export type SliderProps = {
  min?: number | string;
  max?: number | string;
  step?: number | string;
  gap?: number;
  disabled?: boolean;
  invalid?: boolean;
  block?: boolean;
  width?: number | string;
  inset?: boolean;
};

const props = withDefaults(defineProps<SliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  inset: false,
});

const model = defineModel<number | [number, number]>();

const isRange = (v: typeof model.value): v is [number, number] => Array.isArray(v);

const style = computed((): CSSProperties => {
  const [min, max] = isRange(model.value)
    ? model.value.map(v => percent(v, +props.min, +props.max))
    : [0, percent(model.value ?? 0, +props.min, +props.max)];
  return {
    ...toWidth(props.width),
    '--_low': min,
    '--_high': max,
  };
});

const classes = computed(() => ['slider', {
  'is-disabled': props.disabled,
  'is-invalid': props.invalid,
  'is-block': props.block,
  'slider--range': isRange(model.value),
  'slider--inset': props.inset,
}]);

const attrs = computed(() => {
  const { min, max, step, disabled } = props;
  return { min, max, step, disabled };
});

const snapToStep = (v: number) => {
  const snapped = Math.round((v - +props.min) / +props.step) * +props.step + +props.min;
  return clamp(snapped, +props.min, +props.max);
};

const onTrackClick = (event: MouseEvent) => {
  if (!isRange(model.value) || props.disabled) return;
  if (event.target instanceof HTMLInputElement) return; // Skip click on thumbs
  const { left, width } = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const { step, gap = step, min, max } = props;
  const clicked = snapToStep(+props.min + ((event.clientX - left) / width) * (+max - +min));
  const [low, high] = model.value;
  model.value = clicked <= low || (clicked < high && clicked - low <= high - clicked)
    ? [clamp(clicked, +props.min, high - +gap), high]
    : [low, clamp(clicked, low + +gap, +props.max)];
};

const onInput = (index: 0 | 1, event: Event) => {
  const { value } = event.target as HTMLInputElement;
  if (isRange(model.value)) {
    const { step, gap = step } = props;
    model.value = [
      index === 0 ? Math.min(+value, model.value[1] - +gap) : model.value[0],
      index === 1 ? Math.max(+value, model.value[0] + +gap) : model.value[1],
    ];
  } else model.value = +value;
};
</script>

<style scoped>
.slider {
  --width: var(--slider-width, 10rem);
  --color: var(--slider-color, var(--accent-color, currentcolor));
  --radius: var(--slider-radius, var(--thumb-size));
  --track-color: var(--slider-track-color, #8884);
  --track-height: var(--slider-track-height, 0.25rem);
  --thumb-size: var(--slider-thumb-size, 1rem);
  --thumb-width: var(--thumb-size);
  --thumb-height: var(--thumb-size);
  --thumb-color: var(--slider-thumb-color, #fff);
  --thumb-border: var(--slider-thumb-border, 1px solid #8888);
  --focus-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--color) 25%, transparent);

  position: relative;
  display: inline-flex;
  align-items: center;
  height: max(var(--track-height), var(--thumb-height));
  width: var(--width);
  vertical-align: middle;

  &::before,
  &::after {
    content: '';
    position: absolute;
    height: var(--track-height);
    left: calc(var(--thumb-width) / 2);
    right: calc(var(--thumb-width) / 2);
    border-radius: var(--radius);
    pointer-events: none;
    background: var(--track-color);
    z-index: 0;
  }

  &::after {
    background: linear-gradient(
      to right,
      transparent 0%,
      transparent var(--_min, calc(1% * var(--_low, 0))),
      var(--color) var(--_min, calc(1% * var(--_low, 0))),
      var(--color) var(--_max, calc(1% * var(--_high, 0))),
      transparent var(--_max, calc(1% * var(--_high, 0))),
      transparent 100%
    );
  }

  &.slider--inset::before, &.slider--inset::after { inset-inline: 0; }

  &.slider--inset::after {
    --_max: calc(1% * var(--_high, 0) - (var(--_high, 0) - 50) / 100 * var(--thumb-width));
  }

  &.slider--range.slider--inset::after {
    --_min: calc(1% * var(--_low, 0) - (var(--_low, 0) - 50) / 100 * var(--thumb-width)); 
  }

  input[type="range"] {
    appearance: none;
    position: absolute;
    width: 100%;
    background: transparent;
    margin: 0;
    padding: 0;
    height: var(--thumb-width);
    cursor: pointer;
    outline: none;
    z-index: 1;

    &::-webkit-slider-runnable-track {
      background: transparent;
    }

    &::-moz-range-track,
    &::-moz-range-progress {
      background: transparent;
    }

    &::-webkit-slider-thumb {
      appearance: none;
      width: var(--thumb-width);
      height: var(--thumb-height);
      background: var(--thumb-color);
      border: var(--thumb-border);
      border-radius: var(--radius);
      background-clip: content-box;
      cursor: pointer;
    }

    &::-moz-range-thumb {
      width: var(--thumb-width);
      height: var(--thumb-height);
      background: var(--thumb-color);
      border: var(--thumb-border);
      border-radius: var(--radius);
      cursor: pointer;
      background-clip: content-box;
      z-index: 1;
    }
    
    &:focus-visible {
      &::-webkit-slider-thumb { box-shadow: var(--focus-shadow); }
      &::-moz-range-thumb { box-shadow: var(--focus-shadow); }
    }
  }

  &.slider--range {
    cursor: pointer;

    input[type="range"] {
      pointer-events: none;

      &::-webkit-slider-thumb { pointer-events: auto; }
      &::-moz-range-thumb { pointer-events: auto; }
    }
  }

  &.is-disabled {
    --track-color: var(--slider-disabled-track-color, var(--bg-color, #8882));

    input::-webkit-slider-thumb { display: none; }
    input::-moz-range-thumb { display: none; }
  }
}
</style>
