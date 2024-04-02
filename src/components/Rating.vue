<template>
  <fieldset class="rating" :disabled="props.disabled">
    <label v-for="i in +props.max" :key="i">
      <input v-model="rating" :value="+props.max + 1 - i" type="radio">
      <slot><Icon src="/@/assets/icons/star.svg" /></slot>
    </label>
  </fieldset>
</template>

<script setup lang="ts">
import Icon from './Icon.vue';

const props = withDefaults(defineProps<{
  max: number | string;
  disabled?: boolean;
}>(), {
  max: 5,
});

const rating = defineModel<number | undefined>({ required: true });
</script>

<style lang="scss" scoped>
.rating {
  --size: 1.25rem;

  padding: 0;
  border: 0;
  margin: 0;
  display: inline-flex;
  gap: 0.25em;
  flex-direction: row-reverse;
  align-items: center;
  vertical-align: middle;
  font-size: var(--size);
  cursor: pointer;

  label {
    color: var(--color, #fdcf10);
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
    }

    // stylelint-disable-next-line selector-pseudo-class-no-unknown
    :deep(.icon) {
      --size: 1em;

      position: absolute;
      top: 0;
      transform: scale(0);
      transition: all 0.3s ease;
    }
  }

  &:not(:disabled) > label:hover input { transform: none; }

  label:has(:checked),
  label:has(:checked) ~ label {
    // stylelint-disable-next-line no-descending-specificity
    input { transform: scale(0); }
    // stylelint-disable-next-line selector-pseudo-class-no-unknown
    :deep(.icon) { transform: none; }
  }

  &:disabled {
    --color: #8886;
  
    opacity: 0.5;
    cursor: not-allowed !important;
  }
}

</style>
