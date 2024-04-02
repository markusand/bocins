<template>
  <Input
    v-bind="props"
    v-model="input"
    class="chips-input"
    @keydown.backspace="onBackspace">
    <template #prefix>
      <div v-if="items.length" class="chips-group">
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

<style lang="scss" scoped>
.chips-input {
  flex-wrap: wrap;
  gap: 0 var(--spacing);

  .chips-group {
    margin: calc(0.5 * var(--spacing)) calc(-0.5 * var(--spacing));
    display: flex;
    flex-wrap: wrap;
    gap: 0.125rem;
  
    .chip { margin: 0; }
  }

  &:not(:focus-within).invalid .chip { --color: currentcolor; }
}
</style>
