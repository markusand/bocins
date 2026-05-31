<template>
  <Input
    v-bind="props"
    v-model="input"
    class="chips-input"
    @keydown.backspace="onBackspace">
    <template #prefix>
      <div v-if="items.length" class="chips-input__group">
        <TransitionGroup name="chip">
          <Chip
            v-for="item in items"
            :key="item"
            :action="() => remove(item)">
            {{ item }}
          </Chip>
        </TransitionGroup>
      </div>
    </template>
  </Input>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Input, { type InputProps } from './Input.vue';
import Chip from './Chip.vue';

export type ChipsInputProps = {
  separator?: string;
} & Omit<InputProps, 'prefix' | 'type'>;

const props = withDefaults(defineProps<ChipsInputProps>(), {
  separator: ','
});

const items = defineModel<string[]>({ required: true });
const input = ref('');

watch(input, text => {
  const parts = text.split(props.separator).map(part => part.trim());
  if (parts.length > 1) {
    items.value = [...new Set([...items.value, ...parts.filter(Boolean)])];
    input.value = '';
  } 
});

const remove = (item: string) => {
  const i = items.value.indexOf(item);
  if (i >= 0) items.value.splice(i, 1);
};

const onBackspace = (event: Event) => {
  const { value } = event.target as HTMLInputElement;
  if (!value && items.value.length) remove(items.value.at(-1)!);
};
</script>

<style scoped>
.chips-input {
  --spacing: var(--chips-input-spacing, 0.5rem);
  --chip-color: var(--chips-input-color, #888);

  flex-wrap: wrap;
  gap: 0 var(--spacing);

  &:deep(input) {
    padding: 0.375em 0;
    flex: 1 1 4em;
  }

  &:deep(> .icon) { padding: 0; }

  &.is-invalid .chip { --color: currentcolor; }
}

.chips-input__group {
  margin: calc(0.25 * var(--spacing)) 0;
  margin-left: calc(-0.75 * var(--spacing));
  display: flex;
  flex-wrap: wrap;
  gap: 0.125rem;

  /* stylelint-disable-next-line no-descending-specificity */
  .chip { margin: 0; }
}

.chip-enter-active,
.chip-leave-active {
  transition: all 0.3s ease;
}

.chip-enter-from,
.chip-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
