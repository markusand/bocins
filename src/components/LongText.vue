<template>
  <div :class="['longtext', modifiers]">
    <textarea
      v-model="text"
      v-bind="props"
      :style="dimensions"
      :maxlength="props.maxLength"
      :disabled="props.disabled"
      @keydown.tab="handleTab" />
    <span v-if="props.maxLength" class="longtext__counter">
      {{ text.length }} / {{ props.maxLength }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { toWidth, toHeight } from '/@/utils';

export type LongTextProps = {
  maxLength?: number | string;
  width?: number | string;
  height?: number | string;
  placeholder?: string;
  block?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  indentable?: boolean;
  expandable?: boolean;
};

const props = withDefaults(defineProps<LongTextProps>(), {
  maxLength: undefined,
  width: 20,
  height: 5,
  placeholder: '',
});

const text = defineModel<string>({ required: true });

const handleTab = (event: KeyboardEvent) => {
  if (!props.indentable) return;
  event.preventDefault();
  const target = event.target as HTMLTextAreaElement;
  const { selectionStart, selectionEnd, value } = target;
  target.value = `${value.substring(0, selectionStart)}\t${value.substring(selectionEnd)}`;
  target.selectionStart = selectionStart + 1;
  target.selectionEnd = selectionEnd + 1;
};

const dimensions = computed(() => {
  const { height = 0 } = toHeight(props.height) ?? props;
  return {
    ...toWidth(props.width),
    ...(props.expandable
      ? { minHeight: height, fieldSizing: 'content' as const }
      : { height }
    ),
  };
});

const modifiers = computed(() => {
  const { block, disabled, invalid } = props;
  return {
    'longtext--block': block,
    'longtext--disabled': disabled,
    'longtext--invalid': invalid,
  };
});
</script>

<style lang="scss" scoped>
@use  '../styles';

.longtext {
  @extend %input;

  display: inline-block;
  padding: 0;
  position: relative;
  vertical-align: top;

  textarea {
    all: unset;
    display: block;
    padding: var(--spacing);
    box-sizing: border-box;
    min-height: calc(1em + 2 * var(--spacing));
    white-space: pre-wrap;
  }

  &__counter {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 0.75em;
    padding: 0.25rem 0.5rem;
    opacity: 0.5;
  }

  &--disabled { @extend %disabled; }

  &--block { @extend %block; }
}
</style>
