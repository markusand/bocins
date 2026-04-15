<template>
  <Input
    v-bind="props"
    v-model="input"
    class="chips-input"
    @keydown.backspace="onBackspace">
    <template #prefix>
      <div v-if="items.length" class="chips-input__group">
        <Chip
          v-for="item in items"
          :key="item"
          :close="() => remove(item)"
          primary>
          {{ item }}
        </Chip>
      </div>
    </template>
  </Input>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Input, { type InputProps } from './Input.vue';
import Chip from './Chip.vue';

const SEPARATOR = ',';

export type ChipsInputProps = {
  separator?: string;
} & Omit<InputProps, 'prefix' | 'type'>;

const props = defineProps<ChipsInputProps>();

const items = defineModel<string[]>({ required: true });
const input = ref('');

watch(input, text => {
  const parts = text.split(props.separator || SEPARATOR).map(part => part.trim());
  if (parts.length > 1) {
    items.value = [...new Set([...items.value, ...parts.filter(Boolean)])];
    input.value = '';
  } 
});

const remove = (item: string) => items.value.splice(items.value.indexOf(item), 1);

const onBackspace = (event: Event) => {
  const { value } = event.target as HTMLInputElement;
  if (!value && items.value.length) remove(items.value.at(-1)!);
};
</script>

<style scoped>
.chips-input {
  flex-wrap: wrap;
  gap: 0 var(--spacing);

  /* stylelint-disable-next-line selector-pseudo-class-no-unknown */
  &:deep(input) {
    padding: 0.375rem 0;
    flex: 1 1 4rem;
  }

  /* stylelint-disable-next-line selector-pseudo-class-no-unknown */
  &:deep(> .icon) { padding: 0; }

  &:not(:focus-within).input--invalid .chip { --color: currentcolor; }
}

.chips-input__group {
  margin: calc(0.25 * var(--spacing)) calc(-0.75 * var(--spacing));
  display: flex;
  flex-wrap: wrap;
  gap: 0.125rem;

  /* stylelint-disable-next-line no-descending-specificity */
  .chip { margin: 0; }
}
</style>
