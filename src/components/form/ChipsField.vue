<template>
  <InputField v-model="input" class="chips-field" @keydown="handleKey">
    <template v-if="modelValue.length" #prefix>
      <ul class="chips-field__chips">
        <li v-for="chip in modelValue" :key="chip" class="chip">
          {{ chip }}
          <a href="#" @click.prevent="deleteChip(chip)">&times;</a>
        </li>
      </ul>
    </template>
  </InputField>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputField from './InputField.vue';

type Props = {
  modelValue: string[];
  separator?: string;
};

const props = withDefaults(defineProps<Props>(), {
  separator: ',',
});

const emit = defineEmits(['update:modelValue']);

const input = ref<string | undefined>(undefined);

const deleteChip = (chip: string) => {
  const chips = props.modelValue.filter(value => value !== chip);
  emit('update:modelValue', chips);
};

const deleteLastChip = () => emit('update:modelValue', props.modelValue.slice(0, -1));

const addChip = (chip: string) => {
  const chips = [...new Set([...props.modelValue, chip])];
  emit('update:modelValue', chips);
  input.value = '';
};

const handleKey = (event: KeyboardEvent) => {
  if (event.key === props.separator) {
    event.preventDefault();
    if (input.value) addChip(input.value);
  }
  if (event.key === 'Backspace' && !input.value) deleteLastChip();
};
</script>

<style lang="scss" scoped>
.chips-field {
  flex-wrap: wrap;

  &__chips {
    all: unset;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em 2px;

    .chip {
      background: var(--chip-color, #0002);
      color: var(--chip-textcolor, inherit);
      font-size: 0.75em;
      padding: 0.25em 0.5em;
      margin: -0.25em 0;
      border-radius: 4px;
      white-space: nowrap;

      a {
        color: inherit;
        text-decoration: none;
        margin-left: 0.25em;
      }
    }
  }
}
</style>
