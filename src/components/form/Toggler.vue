<template>
  <label :class="['b-toggler', { silent, block, switch: isSwitch }]">
    <input
      v-model="toggleValue"
      :type="type"
      :value="value"
      :disabled="disabled">
    <span v-if="isSwitch" class="b-switch" />
    <Icon v-else src="/icons/check.svg" class="b-toggler__toggle" />
    <span class="b-toggler__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import Icon from '../Icon.vue';

const props = defineProps<{
  modelValue: T | T[] | undefined;
  value?: T;
  label?: string;
  switch?: boolean;
  disabled?: boolean;
  block?: boolean;
  silent?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: T | T[] | undefined],
  change: [value: T | T[] | undefined],
}>();

const toggleValue = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value);
    emit('change', value);
  },
});

const isSwitch = computed(() => props.switch);

const type = computed(() => (
  typeof props.modelValue === 'boolean' || Array.isArray(props.modelValue) ? 'checkbox' : 'radio'
));
</script>
