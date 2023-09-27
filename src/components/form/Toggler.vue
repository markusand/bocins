<template>
  <label :class="['b-toggler', { silent, block, switch: isSwitch }]">
    <input
      v-model="toggle"
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
import { computed, watch } from 'vue';
import Icon from '../Icon.vue';

const props = defineProps<{
  value?: T;
  label?: string;
  switch?: boolean;
  disabled?: boolean;
  block?: boolean;
  silent?: boolean;
}>();

const emit = defineEmits<{
  change: [value: T | T[] | undefined],
}>();

const toggle = defineModel<T | T[] | undefined>({ required: true });
watch(toggle, value => emit('change', value));

const isSwitch = computed(() => props.switch);

const type = computed(() => (
  typeof toggle.value === 'boolean' || Array.isArray(toggle.value) ? 'checkbox' : 'radio'
));
</script>
