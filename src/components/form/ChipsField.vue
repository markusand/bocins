<template>
  <InputField v-model="input" class="b-chips-field" @keydown="handleKey">
    <template v-if="modelValue.length" #prefix>
      <ul class="b-chips-field__chips">
        <li v-for="chip in modelValue" :key="chip" class="b-chip">
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

const emit = defineEmits<{
  'update:modelValue': [value: string[]];
}>();

const input = ref<string>('');

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
