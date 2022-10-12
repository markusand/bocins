<template>
  <div class="listbox">
    <InputField
      v-if="searchable"
      v-model="search"
      :placeholder="props.placeholder"
      class="listbox__search"
      size="100%">
      <template #prefix>
        <Icon src="/icons/search.svg" class="icon" />
      </template>
    </InputField>
    <slot v-if="selected && (clearable || slots.clear)" name="clear" :clear="clear">
      <div class="listbox__clear">
        <button @click="clear">
          {{ typeof props.clearable === 'boolean' ? 'Clear' : props.clearable }}
        </button>
      </div>
    </slot>
    <label v-for="option in options" :key="option">
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
    <p v-if="!options.length" class="listbox__empty">
      {{ props.emptyText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue';
import InputField from './InputField.vue';
import Icon from '../Icon.vue';
import { normalize } from '/@/utils/string';

type Props = {
  modelValue: any;
  options: any[] | Readonly<any[]>;
  formatter?: (option: any) => string;
  emptyText?: string;
  multiple?: boolean;
  searchable?: boolean | ((options: any) => string);
  clearable?: string | boolean;
  placeholder?: string;
};

const props = withDefaults(defineProps<Props>(), {
  formatter: undefined,
  searchable: undefined,
  emptyText: 'No items',
  placeholder: 'Search',
  clearable: false,
});

const emit = defineEmits(['update:modelValue']);

const slots = useSlots();

const selected = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const search = ref('');

const options = computed(() => {
  if (!props.searchable) return props.options;
  const needle = normalize(search.value);
  const formatter = typeof props.searchable === 'function'
    ? props.searchable
    : props.formatter;
  return props.options.filter(option => {
    const formatted = formatter(option);
    return normalize(formatted).includes(needle);
  });
});

const clear = () => {
  selected.value = props.multiple ? [] : undefined;
};
</script>

<style lang="scss" scoped>
.listbox {
  --speed: var(--transition-speed, 0.3s);
  --border-radius: var(--listbox-border-radius, var(--input-border-radius, 4px));

  border: var(--listbox-border, var(--input-border, 1px solid #c8c8cf));
  border-radius: var(--border-radius);
  background: var(--listbox-background, var(--input-background, #fff));
  padding: var(--listbox-padding, 0.125rem);
  max-height: var(--listbox-max-height, 175px);
  min-width: var(--listbox-width, 150px);
  overflow: auto;
  position: relative;

  input[type="checkbox"],
  input[type="radio"] { display: none; }

  &__search {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  &__option {
    display: flex;
    align-items: center;
    padding: var(--listbox-option-padding, 0.25rem 0.5rem);
    border-radius: var(--listbox-option-border-radius, var(--border-radius));
    margin: 1px;
    line-height: 1;
    cursor: pointer;
    transition: var(--speed) ease;
    transition-property: background, color;

    input:checked + & {
      color: #fff;
      background: var(--listbox-select-color, var(--color-primary, #39ff));
      transition: all var(--speed) ease calc(var(--speed) / 3);
    }
  }

  &__empty {
    text-align: center;
    opacity: 0.5;
  }

  &__clear {
    text-align: right;

    button {
      all: unset;
      font-size: 0.74em;
      padding: 0.5em;
      opacity: 0.75;
      cursor: pointer;
    }
  }
}
</style>
