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
import { computed } from 'vue';
import { unique } from '/@/utils/string';

type Props = {
  name?: string;
  modelValue: number | undefined;
  max?: number | string;
};

const props = withDefaults(defineProps<Props>(), {
  name: unique(),
  modelValue: undefined,
  max: 5,
});

const emit = defineEmits<{
  'update:modelValue': [value: number | undefined],
}>();

const rating = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});
</script>
