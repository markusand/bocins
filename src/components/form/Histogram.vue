<template>
  <ul
    v-if="sum"
    class="histogram"
    :style="`--width:${props.size}${isNumber(props.size) ? 'rem' : ''}`">
    <li
      v-for="(bar, i) in bars"
      :key="i"
      :class="bar.status"
      :style="`--height:${bar.height}%`">
      <span class="tooltip">
        <span class="tooltip__range">
          {{ bar.range.low }}{{ unit }} - {{ bar.range.high }}{{ unit }}
        </span>
        <span class="tooltip__ratio">{{ bar.ratio }}%</span>
      </span>
    </li>
  </ul>
  <p v-else class="histogram--empty">{{ props.emptyText }}</p>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { round, decimals, isNumber } from '/@/utils/number';

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
    const status = props.active[0] < high && low < props.active[1] ? 'active' : 'inactive';
    return { height, ratio, range: { low, high }, status };
  });
});
</script>

<style lang="scss" scoped>
.histogram {
  --speed: var(--transition-speed, 0.3s);

  all: unset;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: var(--histogram-height, 75px);
  width: var(--histogram-width, var(--width));

  li {
    flex: 1 0 auto;
    position: relative;
    height: var(--height, 0);
    transition: all var(--speed) ease;
    border-radius: var(--histogram-border-radius, 2px);
    margin: 0 var(--histogram-gap, 1px);

    &.active { background: var(--histogram-color-active, var(--color-primary, #39f)); }
    &.inactive { background: var(--histogram-color-inactive, #8883); }
  }

  .tooltip {
    background: #333;
    color: #fff;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    z-index: 1;
    font-size: 0.8em;
    padding: 0.5em 0.75em;
    border-radius: 4px;
    margin-bottom: 0.75em;
    text-align: center;

    &__range {
      opacity: 0.5;
      font-size: 0.75em;
      white-space: nowrap;
      display: block;
      margin-bottom: 0.25em;
    }

    &::after {
      content: "";
      border: 5px solid transparent;
      border-top-color: #333;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  li.active:hover .tooltip { display: block; }

  &--empty {
    padding: 1rem;
    text-align: center;
    color: #8888;
  }
}
</style>
