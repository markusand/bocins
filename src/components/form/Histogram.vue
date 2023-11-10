<template>
  <ul
    v-if="sum"
    class="b-histogram"
    :style="`--width:${props.size}${isNumber(props.size) ? 'rem' : ''}`">
    <li
      v-for="(bar, i) in bars"
      :key="i"
      :class="bar.status"
      :style="`--height:${bar.height}%`">
      <span class="tooltip">
        <span class="tooltip__range">
          <slot name="range" :bar="bar">
            {{ bar.range.low }}{{ unit }} - {{ bar.range.high }}{{ unit }}
          </slot>
        </span>
        <span class="tooltip__ratio">{{ bar.ratio }}%</span>
      </span>
    </li>
  </ul>
  <div v-else class="b-histogram--empty">
    <slot name="empty">
      <p>{{ props.emptyText }}</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { round, decimals, isNumber } from '/@/utils/number';

export type HistogramBar = {
  height: number;
  ratio: number;
  range: {
    low: number;
    high: number;
  };
  status: 'active' | 'inactive';
};

type Props = {
  data: number[];
  min?: number | string;
  max?: number | string;
  active?: number[];
  unit?: string;
  size?: number | string;
  emptyText?: string;
};

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 0,
  active: () => [0, 100],
  unit: undefined,
  size: 10,
  emptyText: 'No data to show',
});

defineSlots<{
  range?: (props: { bar: HistogramBar }) => void;
  empty?: () => void;
}>();

const sum = computed(() => props.data.reduce((acc, value) => acc + value, 0));

const bars = computed(() => {
  const highest = Math.max(...props.data);
  const step = (+props.max - +props.min) / props.data.length;
  const precision = decimals(step);  
  return props.data.map((value, i) => {
    const low = round(+props.min + (i * step), precision);
    const high = round(low + step, precision);
    const height = 2 + (value * 100) / highest || 2;
    const ratio = round(value * 100 / sum.value, 1) || 0;
    const status = props.active[0] < high && low < props.active[1] ? 'active' as const : 'inactive' as const;
    return { height, ratio, range: { low, high }, status };
  });
});
</script>
