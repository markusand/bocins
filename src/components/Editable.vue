<template>
  <label :class="['editable', { edit }]">
    <input
      v-model="value"
      :disabled="!props.edit"
      type="text"
      required
      @keyup="caretToEnd"
      @click="caretToEnd">
    {{ props.modelValue }}
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string;
  edit?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue),
});

const caretToEnd = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const { length } = input.value;
  input.setSelectionRange(length, length);
};
</script>

<style lang="scss" scoped>
.editable {
  --color: var(--editable-color, #8888);
  --color-focus: var(--editable-color-focus, var(--color-primary, #39f));
  --padding: var(--editable-padding, 0.125rem 0.5ch);
  --border-radius: var(--editable-border-radius, 0);
  --border: var(--editable-border, 1px dashed var(--color));

  display: inline-flex;

  &.edit {
    padding: var(--padding);
    border-radius: var(--border-radius);
    outline: var(--border);
  }

  input {
    all: unset;
    width: 0;
    height: 1em;
    opacity: 0;
  }

  &:focus-within {
    --color: var(--color-focus);

    &::after {
      content: "";
      display: block;
      height: 1em;
      outline: 1px solid var(--color);
    }
  }
}
</style>
