<template>
  <section class="section">
    <h3>Sliders<em>Select values by dragging sliders</em></h3>

    <!-- Single sliders -->
    <div class="stack">
      <label class="label">
        <em>
          Simple
          <span class="right">{{ data.single }}ºC</span>
        </em>
        <Slider
          v-model="data.single"
          :min="10"
          :max="30"
          tooltip="none" />
      </label>

      <label class="label">
        <em>Enhanced</em>
        <Slider
          v-model="data.single"
          :min="10"
          :max="30"
          :marks="marks" />
      </label>
    </div>

    <!-- Range sliders -->
    <div class="stack">
      <label class="label">
        <em>
          Range
          <span class="right">{{ data.range[0] }}m- {{ data.range[1] }}m</span>
        </em>
        <Slider
          v-model="data.range"
          :min="histogram.min"
          :max="histogram.max"
          tooltip="none" />
      </label>

      <label class="label">
        <em>Multirange</em>
        <Slider
          v-model="data.multiRange"
          :min="0"
          :max="100" />
      </label>
    </div>

    <!-- Composed sliders -->
    <label class="label">
      <em>Histogram</em>
      <div class="histoslider">
        <Histogram
          v-bind="histogram"
          :active="data.range"
          unit="m" />
        <Slider
          v-model="data.range"
          :min="histogram.min"
          :max="histogram.max"
          :marks="histogramMarks"
          :contained="false" />
      </div>
    </label>

    <label class="label">
      <em>Vertical</em>
      <Slider
        v-model="data.single"
        min="10"
        max="30"
        tooltip="none"
        vertical />
    </label>

    <fieldset class="label">
      <legend>Rating</legend>
      <Rating v-model="data.rating" />
    </fieldset>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Histogram, Rating, Slider } from '/@/components';

const marks = { 10: '', 14: '14ºC', 19: '19ºC', 25: '25ºC', 30: '' };

const histogram = {
  min: 0,
  max: 20,
  data: [...Array(20)].map((_, i) => 1 / Math.pow(Math.E, (Math.pow(i - 10, 2)) / (2 * 10))), // Gaussian distribution
};

const histogramMarks = [...Array(5)].map((_, i) => i * (histogram.max - histogram.min) / 4);

const data = reactive({
  single: 21,
  range: [histogram.min, histogram.max],
  multiRange: [10, 20, 30, 40, 80],
  rating: undefined,
});
</script>

<style lang="scss">
.histoslider { padding: 0.5rem 0.75rem; }
</style>
