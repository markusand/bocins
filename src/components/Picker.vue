<template>
  <fieldset class="picker" :disabled="props.disabled">
    <Toggler
      v-for="option, i in props.options"
      :key="props.keyAttr ? option[props.keyAttr] as string : i"
      v-model="selected"
      :value="option"
      :invalid="props.invalid"
      :radio="!Array.isArray(selected)">
      <slot :option="option">
        {{ props.formatter?.(option) || option }}
      </slot>
    </Toggler>
  </fieldset>
</template>

<script setup lang="ts" generic="T">
import Toggler from './Toggler.vue';
import { type KeyOfAttribute } from '/@/types';

export type PickerProps<T> = {
  options: T[],
  keyAttr?: T extends object
    ? KeyOfAttribute<T, string | number | symbol>
    : never;
  columns?: number;
  formatter?: (option: T) => string;
  invalid?: boolean;
  disabled?: boolean;
};

const props = defineProps<PickerProps<T>>();

defineSlots<{
  default?: (props: { option: T }) => void;
}>();

const selected = defineModel<T | T[] | undefined>({ required: true });
</script>

<style lang="scss" scoped>
.picker {
  --spacing: 0.25rem;

  margin: 0;
  padding: var(--spacing);
  border: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing) calc(3 * var(--spacing));

  .toggler {
    --cols: v-bind(columns || -1);

    flex: 0 0 calc((100% / var(--cols)) - ((var(--cols) - 1) * var(--spacing)));
    box-sizing: border-box;
  }
}
</style>
