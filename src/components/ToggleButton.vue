<template>
  <Button
    :class="['toggle-button', { active }]"
    v-bind="props"
    @click="toggle">
    <slot />
  </Button>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import Button, { type ButtonProps } from './Button.vue';

defineSlots<{
  default: () => void;
}>();

const props = defineProps<{
  value?: T;
} & ButtonProps>();

const selected = defineModel<boolean | T | T[] | undefined>({ required: true });

const active = computed(() => (
  typeof selected.value === 'boolean'
    ? selected.value
    : Array.isArray(selected.value)
      ? props.value && selected.value.includes(props.value)
      : selected.value === props.value
));

const toggle = () => {
  selected.value = typeof selected.value === 'boolean'
    ? !selected.value
    : props.value && Array.isArray(selected.value)
      ? selected.value.includes(props.value)
        ? selected.value.filter(value => value !== props.value)
        : [...selected.value, props.value]
      : selected.value
        ? undefined
        : props.value;
};
</script>
