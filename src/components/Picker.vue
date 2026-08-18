<template>
  <fieldset
    class="picker"
    tabindex="-1"
    :disabled
    @keydown="onKeydown"
    @focusin="onFocusin">
    <Toggler
      v-for="option, i in options"
      :key="keyAttr ? option[keyAttr] as string : i"
      v-model="selected"
      :value="option"
      :group="!Array.isArray(selected) ? groupName : undefined"
      :invalid>
      <slot :option>
        {{ formatter?.(option) || option }}
      </slot>
    </Toggler>
  </fieldset>
</template>

<script setup lang="ts" generic="T">
import { useId } from 'vue';
import Toggler from './Toggler.vue';
import { useRovingTabindex } from '/@/utils';
import type { KeyOfAttribute, MaybeReadonly } from '/@/types';

export type PickerProps<T> = {
  options: MaybeReadonly<T[]>,
  keyAttr?: T extends object
    ? KeyOfAttribute<T, string | number | symbol>
    : never;
  columns?: number;
  formatter?: (option: T) => string;
  invalid?: boolean;
  disabled?: boolean;
};

defineProps<PickerProps<T>>();

defineSlots<{
  default?: (props: { option: T }) => void;
}>();

const selected = defineModel<T | T[] | undefined>({ required: true });
const groupName = useId();

const { onFocusin, onKeydown } = useRovingTabindex({ selector: 'input', wrap: true });
</script>

<style scoped>
.picker {
  --spacing: var(--picker-spacing, 0.25rem);

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
