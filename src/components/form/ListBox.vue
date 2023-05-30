<template>
  <div class="input listbox" :style="`--width:${width}`">
    <div class="listbox__search">
      <InputField
        v-if="searchable"
        v-model="search"
        :placeholder="searchText"
        block>
        <template #prefix>
          <Icon src="/icons/search.svg" class="icon" />
        </template>
      </InputField>
    </div>
    <slot v-if="selected && (clearable || slots.clear)" name="clear" :clear="clear">
      <div class="listbox__clear">
        <button @click="clear">
          {{ typeof clearable === 'boolean' ? 'Clear' : clearable }}
        </button>
      </div>
    </slot>
    <label v-for="option, i in filteredOptions" :key="i">
      <input
        v-model="selected"
        :value="option"
        :type="multiple ? 'checkbox' : 'radio'">
      <div class="listbox__option">
        <slot :item="option">
          {{ formatter?.(option) || option }}
        </slot>
      </div>
    </label>
    <slot v-if="!filteredOptions.length" name="empty">
      <div class="listbox__empty">{{ emptyText }}</div>
    </slot>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref, computed } from 'vue';
import InputField from './InputField.vue';
import Icon from '../Icon.vue';
import { isNumber, normalize } from '/@/utils';

type Props = {
  modelValue: T | T[] | undefined;
  options: T[];
  formatter?: (option: T) => string;
  emptyText?: string;
  multiple?: boolean;
  searchable?: boolean | ((option: T) => string);
  searchText?: string;
  clearable?: string | boolean;
  size?: string | number;
};

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  formatter: undefined,
  searchable: undefined,
  searchText: 'Search',
  emptyText: 'No items',
  clearable: false,
  size: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [selected: T | T[] | undefined],
  select: [selected: T | T[] | undefined],
}>();

const slots = defineSlots<{
  default?: (props: { item: T }) => any;
  clear?: (props: { clear: () => void }) => any;
  empty?: (props: object) => any;
}>();

const selected = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value);
    emit('select', value);
  },
});

const width = computed(() => `${props.size}${isNumber(props.size) ? 'rem' : ''}`);

const search = ref('');

const filteredOptions = computed(() => {
  if (!props.searchable) return props.options;
  const needle = normalize(search.value);
  const formatter = typeof props.searchable === 'function'
    ? props.searchable
    : props.formatter;
  return props.options.filter(option => {
    const formatted = formatter?.(option);
    return normalize(formatted).includes(needle);
  });
});

const clear = () => { selected.value = props.multiple ? [] : undefined; };
</script>

<style lang="scss" scoped>
.listbox {
  --speed: var(--transition-speed, 0.3s);
  --color: var(--listbox-color, var(--color-primary, #39f));
  --color-hover: var(--listbox-color-hover, color-mix(in srgb, var(--color) 10%, transparent));
  --padding: var(--input-padding, 0.25rem);

  flex-direction: column;
  align-items: initial;
  gap: 1px;
  padding: var(--padding);
  max-height: var(--listbox-max-height, 175px);
  overflow: auto;

  &__search {
    flex: 0 0;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  &__option {
    display: flex;
    align-items: center;
    padding: var(--padding);
    gap: var(--padding);
    border-radius: var(--border-radius);
    transition: var(--speed) ease;
    transition-property: background, color;

    // stylelint-disable-next-line no-descending-specificity
    input:focus + &,
    &:hover {
      background: var(--color-hover);
      cursor: pointer;
    }

    input:checked + & {
      color: #fff;
      background: var(--color);
    }
  }

  &__empty {
    text-align: center;
    opacity: 0.5;
    padding: calc(2 * var(--padding)) calc(4 * var(--padding));
  }

  &__clear {
    text-align: right;

    button {
      all: unset;
      font-size: 0.75em;
      padding: 0.5em;
      opacity: 0.5;
      cursor: pointer;

      &:focus { opacity: 0.75; }
    }
  }
}
</style>
