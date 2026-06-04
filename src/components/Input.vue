<template>
  <div :class="classes" :style>
    <slot name="prefix">{{ prefix }}</slot>
    <input v-model="value" v-bind="inputAttrs" :disabled>
    <Icon v-if="clearable && value" src="x.svg" @click.stop="clear" />
    <slot name="suffix">{{ suffix }}</slot>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, type CSSProperties } from 'vue';
import { toWidth } from '/@/utils';
import Icon from './Icon.vue';

export type InputProps = {
  width?: number | string;
  clearable?: boolean;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  invalid?: boolean;
  block?: boolean;
};

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<InputProps>(), {
  width: 10,
});

defineSlots<{
  prefix?: () => void;
  suffix?: () => void;
}>();

// defineEmits not needed as already binded by inputAttrs

const value = defineModel<string | number | undefined>({ required: true });

const clear = () => { value.value = ''; };

const allAttrs = useAttrs();
const inputAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, style: __, ...rest } = allAttrs;
  return rest;
});

const classes = computed(() => ['input', 'is-input', allAttrs.class, {
  'is-disabled': props.disabled,
  'is-invalid': props.invalid,
  'is-block': props.block,
}]);

const style = computed((): CSSProperties | null => ({
  ...(allAttrs.style as CSSProperties),
  ...toWidth(props.width),
}));
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
