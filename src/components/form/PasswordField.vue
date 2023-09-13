<template>
  <InputField
    v-model="value"
    :type="isVisible ? 'text' : 'password'">
    <template #suffix>
      <span class="b-input__control">
        <Icon
          v-if="isVisible"
          src="/icons/eye.svg"
          @click="toggleVisibility" />
        <Icon
          v-else
          src="/icons/eye-off.svg"
          @click="toggleVisibility" />
      </span>
    </template>
  </InputField>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import InputField from './InputField.vue';
import Icon from '../Icon.vue';

const props = defineProps<{ modelValue: string }>();

const emit = defineEmits<{
  'update:modelValue': [value: string],
}>();

const value = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue),
});

const isVisible = ref(false);

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};
</script>
