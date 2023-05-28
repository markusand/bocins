<template>
  <div class="input listbox" :style="`--width:${width}`">
    <div class="listbox__search">
      <InputField
        v-if="searchable"
        v-model="search"
        :placeholder="props.searchText"
        block>
        <template #prefix>
          <Icon src="/icons/search.svg" class="icon" />
        </template>
      </InputField>
    </div>
    <slot v-if="selected && (props.clearable || slots.clear)" name="clear" :clear="clear">
      <div class="listbox__clear">
        <button @click="clear">
          {{ typeof props.clearable === 'boolean' ? 'Clear' : props.clearable }}
        </button>
      </div>
    </slot>
    <label v-for="option in filteredOptions" :key="props.asKey(option)">
      <input
        v-model="selected"
        :value="option"
        :type="props.multiple ? 'checkbox' : 'radio'">
      <div class="listbox__option">
        <slot :item="option">
          {{ props.formatter?.(option) || option }}
        </slot>
      </div>
    </label>
    <slot v-if="!filteredOptions.length" name="empty">
      <div class="listbox__empty">
        {{ props.emptyText }}
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue';
import InputField from './InputField.vue';
import Icon from '../Icon.vue';
import { isNumber, normalize } from '/@/utils';

type Props = {
  modelValue: any;
  options: any[];
  formatter?: (option: any) => string;
  asKey?: (option: any) => string | number;
  emptyText?: string;
  multiple?: boolean;
  searchable?: boolean | ((options: any) => string);
  searchText?: string;
  clearable?: string | boolean;
  size?: string | number;
};

const props = withDefaults(defineProps<Props>(), {
  asKey: (option: any) => option,
  formatter: undefined,
  searchable: undefined,
  searchText: 'Search',
  emptyText: 'No items',
  clearable: false,
  size: undefined,
});

const emit = defineEmits(['update:modelValue', 'select']);

const slots = useSlots();

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
    }
  }

  input[type="checkbox"],
  input[type="radio"] { display: none; }
}
</style>
