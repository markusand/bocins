<template>
  <div
    class="input"
    :class="modifiers"
    :style="width"
    @click.prevent="onClick">
    <slot name="prefix">{{ props.prefix }}</slot>
    <input
      v-model="value"
      :placeholder="props.placeholder"
      :type="props.type ?? 'text'"
      :disabled="props.disabled"
      @input="emit('input', $event)"
      @change="emit('change', $event)"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      @keydown="emit('keydown', $event)"
      @keyup="emit('keyup', $event)"
      @paste="emit('paste', $event)"
      @copy="emit('copy', $event)">
    <Icon
      v-if="props.clearable && value"
      src="/icons/close.svg"
      class="close"
      @click.prevent="clear" />
    <slot name="suffix">{{ props.suffix }}</slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { toWidth } from '/@/utils';
import Icon from './Icon.vue';

export type InputType =
  | 'text'
  | 'color'
  | 'password'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'search'
  | 'tel'
  | 'time'
  | 'url'
  | 'week';

export type InputProps = {
  type?: InputType;
  width?: number | string;
  placeholder?: string;
  clearable?: boolean;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  invalid?: boolean;
  block?: boolean;
};

const props = defineProps<InputProps>();

defineSlots<{
  prefix: () => void;
  suffix: () => void;
}>();

const emit = defineEmits<{
  change: [event: Event];
  input: [event: Event];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  keydown: [event: KeyboardEvent];
  keyup: [event: KeyboardEvent];
  paste: [event: ClipboardEvent];
  copy: [envent: ClipboardEvent];
}>();

const value = defineModel<string | number | undefined>({ required: true });

const clear = () => { value.value = ''; };

const modifiers = computed(() => {
  const { disabled, invalid, block } = props;
  return { disabled, invalid, block };
});

const width = computed(() => toWidth(props.width ?? 10));

const onClick = (event: Event) => {
  const target = event.currentTarget as HTMLDivElement;
  target.querySelector('input')?.focus();
};
</script>

<style lang="scss" scoped>
@import '../styles';

.input {
  @extend %input;

  input {
    all: unset;
    appearance: textfield;
    flex: 1;
    min-width: 0;
    text-overflow: ellipsis;
    line-height: 1;
    
    &[type="number"]::-webkit-outer-spin-button,
    &[type="number"]::-webkit-inner-spin-button {
      appearance: none;
      margin: 0;
    }

    &[type="color"]::-webkit-color-swatch { height: 100%; }

    &::placeholder {
      color: inherit;
      opacity: 0.35;
    }
  }

  &.disabled,
  .disabled &,
  :disabled & { @extend %disabled; }

}
</style>
