<template>
  <div class="b-rating">
    <template v-for="i in +props.max" :key="i">
      <input
        :id="`rating-${props.name}-${i}`"
        v-model="rating"
        :value="+props.max + 1 - i"
        type="radio">
      <label :for="`rating-${props.name}-${i}`" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { unique } from '/@/utils/string';

type Props = {
  name?: string;
  max?: number | string;
};

const props = withDefaults(defineProps<Props>(), {
  name: unique(),
  max: 5,
});

const rating = defineModel<number | undefined>({ required: true });
</script>
