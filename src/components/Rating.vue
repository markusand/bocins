<template>
  <fieldset class="rating" :disabled @focusin="onFocusin" @keydown="onKeydown">
    <label v-for="i in +max" :key="i">
      <input v-model="rating" :value="i" type="radio">
      <slot><Icon src="star.svg" /></slot>
    </label>
  </fieldset>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import Icon from './Icon.vue';
import { useRovingTabindex } from '/@/utils';

const { onFocusin, onKeydown } = useRovingTabindex({ selector: 'input' });

export type RatingProps = {
  max?: number | string;
  disabled?: boolean;
};

withDefaults(defineProps<RatingProps>(), {
  max: 5,
});

const emit = defineEmits<{
  rate: [rating: number];
}>();

defineSlots<{
  default?: () => void;
}>();

const rating = defineModel<number | undefined>({ required: false, default: 0 });

watch(rating, value => value && emit('rate', value));
</script>

<style scoped>
.rating {
  --size: var(--rating-size, 1.25rem);
  --color: var(--rating-color, #fdcf10);

  padding: 0;
  border: 0;
  margin: 0;
  display: inline-flex;
  gap: 0.25em;
  align-items: center;
  vertical-align: middle;
  font-size: var(--size);
  cursor: pointer;

  label {
    color: var(--color);
    position: relative;
    cursor: inherit;

    input {
      font-size: inherit;
      appearance: none;
      display: block;
      width: 0.5em;
      aspect-ratio: 1;
      margin: 0.25em;
      background: #8886;
      border-radius: 50%;
      transform: scale(0.6);
      transition: all 0.3s ease;
      cursor: inherit;
      outline: none;
    }

    &:deep(.icon) {
      --size: 1em;

      position: absolute;
      top: 0;
      transform: scale(0);
      transition: all 0.3s ease;

      svg { 
        fill: var(--color);
        stroke: none;
      }
    }

    input:focus:deep(+ .icon svg) {
      stroke: color-mix(in srgb, var(--color) 50%, #fff);
    }
  }

  /* stylelint-disable-next-line no-descending-specificity */
  input:focus,
  &:not(:disabled) > label:hover input { transform: none; }

  &:has(:checked) :not(label:has(:checked) ~ label) {
    input { transform: scale(0) !important; }
    &:deep(.icon) { transform: none; }
  }

  &:disabled {
    --color: #8886;
  
    opacity: 0.5;
    cursor: not-allowed !important;
  }
}

</style>
