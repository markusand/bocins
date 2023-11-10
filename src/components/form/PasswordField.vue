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
import { ref } from 'vue';
import InputField from './InputField.vue';
import Icon from '../Icon.vue';

const value = defineModel<string>({ required: true });

const isVisible = ref(false);

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};
</script>
