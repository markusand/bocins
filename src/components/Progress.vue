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
  circular?: boolean;
};

const props = withDefaults(defineProps<ProgressProps>(), {
  max: 100,
});

const style = computed((): CSSProperties => {
  const fill = percent(+(props.value || 0), 0, +props.max);
  return {
    '--_fill': `${fill}%`,
  };
});

const classes = computed(() => ['progress', {
  'progress--circular': props.circular,
  'progress--indeterminate': props.value == null,
}]);
</script>

<style scoped>
.progress {
  --color: var(--progress-color, var(--accent-color, #333));
  --track-color: var(--progress-track-color, #8884);
  --height: var(--progress-height, 0.375rem);

  position: relative;
  display: block;
  height: var(--height);
  background: var(--track-color);
  border-radius: var(--height);
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: var(--_fill, 0%);
    background: var(--color);
    border-radius: inherit;
    transition: width 0.3s ease;
  }

  &.progress--indeterminate::after {
    width: 40%;
    transition: none;
    animation: progress-indeterminate 1.5s ease-in-out infinite;
  }
}

.progress--circular {
  --size: var(--progress-size, 3rem);
  --thickness: var(--progress-thickness, 0.25rem);

  display: inline-block;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  overflow: visible;
  background: conic-gradient(
    var(--color) var(--_fill, 0%),
    var(--track-color) var(--_fill, 0%)
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
