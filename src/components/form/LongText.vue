<template>
  <span
    :class="['b-longtext', { block }]"
    :style="`
      width:${props.cols}${isNumber(props.cols) ? 'em' : ''};
      height:${props.rows}${isNumber(props.rows) ? 'em' : ''};
    `">
    <textarea
      v-model="text"
      v-bind="$attrs"
      :maxlength="props.maxLength"
      :class="['b-input', { disabled }]"
      :disabled="props.disabled"
      @keydown.tab="handleTab" />
    <span v-if="props.maxLength" class="b-longtext__remain">
      {{ text.length }} / {{ props.maxLength }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isNumber } from '/@/utils/number';

type Props = {
  modelValue: string;
  maxLength?: number | string;
  cols?: number | string;
  rows?: number | string;
  block?: boolean;
  disabled?: boolean;
  indentable?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  maxLength: undefined,
  cols: 15,
  rows: 5,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const text = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const handleTab = (event: KeyboardEvent) => {
  if (!props.indentable) return;
  event.preventDefault();
  const target = event.target as HTMLTextAreaElement;
  const { selectionStart, selectionEnd, value } = target;
  target.value = `${value.substring(0, selectionStart)}\t${value.substring(selectionEnd)}`;
  target.selectionStart = selectionStart + 1;
  target.selectionEnd = selectionEnd + 1;
};
</script>
