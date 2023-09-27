<template>
  <InputField v-model="input" class="b-input--chips" @keydown="handleKey">
    <template v-if="modelValue.length" #[slotName]>
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
  separator?: string;
  outside?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  separator: ',',
});

const chips = defineModel<string[]>({ required: true });
const input = ref<string>('');

const deleteChip = (chip: string) => {
  chips.value = chips.value.filter(value => value !== chip);
};

const deleteLastChip = () => chips.value.pop();

const addChip = (chip: string) => {
  chips.value = [...new Set([...chips.value, chip])];
  input.value = '';
};

const handleKey = (event: KeyboardEvent) => {
  if (event.key === props.separator) {
    event.preventDefault();
    if (input.value) addChip(input.value);
  }
  if (event.key === 'Backspace' && !input.value) deleteLastChip();
};

const slotName = computed(() => props.outside ? 'suffix' : 'prefix');
</script>
