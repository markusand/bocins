<template>
  <InputField v-model="input" class="b-input--chips" @keydown="handleKey">
    <template v-if="modelValue.length" #[slot]>
      <div class="chips-group">
        <Chip
          v-for="chip in modelValue"
          :key="chip"
          :text="chip"
          closeable
          primary
          @close="deleteChip(chip)" />
      </div>
    </template>
  </InputField>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import InputField from './InputField.vue';
import Chip from '../Chip.vue';

type Props = {
  modelValue: string[];
  separator?: string;
  outside?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  separator: ',',
});

const emit = defineEmits<{
  'update:modelValue': [value: string[]];
}>();

const slot = computed(() => props.outside ? 'suffix' : 'prefix');

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
