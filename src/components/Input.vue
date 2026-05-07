<template>
  <div
    :class="classes"
    :style="width"
    @click.prevent="onClick">
    <slot name="prefix">{{ prefix }}</slot>
    <input
      v-model="value"
      :placeholder
      :autocomplete
      :disabled
      :type
      @input="emit('input', $event)"
      @change="emit('change', $event)"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      @keydown="emit('keydown', $event)"
      @keyup="emit('keyup', $event)"
      @paste="emit('paste', $event)"
      @copy="emit('copy', $event)">
    <Icon
      v-if="clearable && value"
      src="x.svg"
      @click.prevent="clear" />
    <slot name="suffix">{{ suffix }}</slot>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';
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
  autocomplete?: string;
  disabled?: boolean;
  invalid?: boolean;
  block?: boolean;
};

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  width: 10,
  placeholder: '',
});

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
  copy: [event: ClipboardEvent];
}>();

const value = defineModel<string | number | undefined>({ required: true });

const clear = () => { value.value = ''; };

const classes = computed(() => ['input', 'is-input', {
  'input--disabled': props.disabled,
  'input--invalid': props.invalid,
  'is-block': props.block,
}]);

const width = computed((): CSSProperties | null => toWidth(props.width));

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
