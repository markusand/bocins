<template>
  <div
    :class="classes"
    :style
    role="progressbar"
    aria-valuemin="0"
    :aria-valuemax="+max"
    :aria-valuenow="value != null ? +value : undefined" />
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';
import { percent } from '/@/utils';

export type ProgressProps = {
  value?: number | string;
  max?: number | string;
  ring?: boolean;
};

const props = withDefaults(defineProps<ProgressProps>(), {
  max: 100,
});

const style = computed((): CSSProperties => {
  if (props.value == null) return {};
  const fill = percent(+props.value, 0, +props.max);
  const colorVar = fill >= 100 ? '--progress-color-complete'
    : fill >= 66 ? '--progress-color-high'
    : fill >= 33 ? '--progress-color-mid'
    : '--progress-color-low';
  const fallback = 'var(--progress-color, var(--accent-color, #333))';
  return {
    '--fill': `${fill}%`,
    '--color': `var(${colorVar}, ${fallback})`,
  };
});

const classes = computed(() => ['progress', {
  'progress--ring': props.ring,
  'progress--indeterminate': props.value == null,
}]);
</script>

<style scoped>
.progress {
  /* ponytail: fallback, overridden by inline style when value is set */
  --color: var(--progress-color, var(--accent-color, #333));
  --track-color: var(--progress-track-color, #8884);
  --size: var(--progress-size, auto);
  --height: var(--progress-height, 0.5rem);
  --radius: var(--progress-radius, var(--height));
  
  position: relative;
  display: block;
  height: var(--height);
  width: var(--size);
  background: var(--track-color);
  border-radius: var(--radius);
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: var(--fill, 0%);
    background: var(--color);
    border-radius: inherit;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    transition: width 0.3s ease;
  }

  &.progress--indeterminate::after {
    width: 40%;
    transition: none;
    animation: progress-indeterminate 1.5s ease-in-out infinite;
  }
}

.progress--ring {
  --size: var(--progress-size, 5rem);
  --thickness: var(--progress-thickness, 0.5rem);

  display: inline-block;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  overflow: visible;
  background: conic-gradient(
    var(--color) var(--fill, 0%),
    var(--track-color) var(--fill, 0%)
  );
  mask: radial-gradient(
    farthest-side,
    transparent calc(100% - var(--thickness)),
    black calc(100% - var(--thickness))
  );

  &::after { content: none; }

  &.progress--indeterminate {
    background: conic-gradient(var(--color) 30%, var(--track-color) 30%);
    animation: progress-spin 1s linear infinite;
  }
}

@keyframes progress-indeterminate {
  0% { left: -40%; }
  100% { left: 100%; }
}

@keyframes progress-spin {
  to { rotate: 1turn; }
}
</style>
