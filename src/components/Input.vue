<template>
  <div
    class="input is-input"
    :class="modifiers"
    :style="width"
    @click.prevent="onClick">
    <slot name="prefix">{{ props.prefix }}</slot>
    <input
      v-model="value"
      :placeholder="props.placeholder"
      :type="props.type ?? 'text'"
      :autocomplete="props.autocomplete"
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
      :src="`${config.iconPath}/close.svg`"
      @click.prevent="clear" />
    <slot name="suffix">{{ props.suffix }}</slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { toWidth } from '/@/utils';
import { config } from '/@/config';
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
  autocomplete?: string;
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
  return {
    'input--disabled': disabled,
    'input--invalid': invalid,
    'input--block': block,
    'is-block': block,
  };
});

const width = computed(() => toWidth(props.width ?? 10));

const onClick = (event: Event) => {
  const target = event.currentTarget as HTMLDivElement;
  target.querySelector('input')?.focus();
};
</script>

<style scoped>
.input {
  input {
    all: unset;
    appearance: textfield;
    min-width: 0;
    flex: 1;
    width: 100%;
    text-overflow: ellipsis;
    line-height: 1;
    display: block;
    
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

  &:deep(.icon) { --size: 1em }
}
</style>
