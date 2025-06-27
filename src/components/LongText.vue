<template>
  <div :class="['longtext', modifiers]" :style="dimensions">
    <textarea
      v-model="text"
      v-bind="props"
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

const dimensions = computed(() => ({
  ...toWidth(props.width),
  ...toHeight(props.height),
}));

const modifiers = computed(() => {
  const { block, disabled, invalid } = props;
  return { block, disabled, invalid };
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
    padding: var(--spacing);
    box-sizing: border-box;
    width: 100%;
    height: 100%;
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

  &.disabled { @extend %disabled; }
}
</style>
