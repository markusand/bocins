<template>
  <span
    :class="['longtext', { block }]"
    :style="`
      width:${props.cols}${isNumber(props.cols) ? 'em' : ''};
      height:${props.rows}${isNumber(props.rows) ? 'em' : ''};
    `">
    <textarea
      v-model="text"
      v-bind="$attrs"
      :maxlength="props.maxLength"
      :class="['input', { disabled }]"
      :disabled="props.disabled"
      @keydown.tab="handleTab" />
    <span v-if="props.maxLength" class="longtext__remain">
      {{ text.length }} / {{ props.maxLength }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isNumber } from '/@/utils/number';

type Props = {
  modelValue?: string;
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

const emit = defineEmits(['update:modelValue']);

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

<style lang="scss" scoped>
.longtext {
  --margin: var(--input-margin, 1px);

  display: inline-block;
  position: relative;
  margin: var(--margin);
  vertical-align: top;
  max-width: 100% !important;

  &__remain {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 0.75em;
    margin: 0.5rem;
    opacity: 0.5;
  }

  textarea {
    font: inherit;
    resize: none;
    height: 100%;
    width: 100%;
    margin: 0;
    overflow: auto;
  }

  .block > &,
  &.block { width: calc(100% - 2 * var(--margin)) !important; }
}
</style>
