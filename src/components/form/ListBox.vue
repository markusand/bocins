<template>
  <div class="b-input b-listbox" :style="`--width:${width}`">
    <div class="b-listbox__search">
      <InputField
        v-if="searchable"
        v-model="search"
        :placeholder="searchText"
        block>
        <template #prefix>
          <Icon src="/icons/search.svg" />
        </template>
      </InputField>
    </div>
    <slot v-if="selected && (clearable || slots.clear)" name="clear" :clear="clear">
      <div class="b-listbox__clear">
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
      <div class="b-listbox__option">
        <slot :item="option">
          {{ formatter?.(option) || option }}
        </slot>
      </div>
    </label>
    <slot v-if="!filteredOptions.length" name="empty">
      <div class="b-listbox__empty">{{ emptyText }}</div>
    </slot>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref, computed, watch } from 'vue';
import InputField from './InputField.vue';
import Icon from '../Icon.vue';
import { isNumber, normalize } from '/@/utils';

type Props = {
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
  select: [selected: T | T[] | undefined],
}>();

const slots = defineSlots<{
  default?: (props: { item: T }) => any;
  clear?: (props: { clear: () => void }) => any;
  empty?: () => any;
}>();

const selected = defineModel<T | T[] | undefined>({ required: true });
watch(selected, value => emit('select', value));

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
