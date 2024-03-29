<template>
  <Dropdown
    :class="['b-selector b-input', { multiple, disabled }]"
    :style="`width:${size}${isNumber(size) ? 'rem' : ''}`"
    :disabled="disabled"
    v-bind="$attrs">
    <template #toggler>
      <div class="b-selector__label">
        <template v-if="isSelected">
          <slot v-if="multiple" name="selecteds" :selected="(selected as T[])">
            <slot v-for="item in (selected as T[])" :item="item">
              {{ formatter?.(item) || item }}
            </slot>
          </slot>
          <slot v-else name="selected" :selected="(selected as T)">
            <slot :item="(selected as T)">
              {{ formatter?.(selected as T) || selected }}
            </slot>
          </slot>
        </template>
        <div v-else class="b-selector__placeholder">
          {{ placeholder }}
        </div>
      </div> 
      <span class="b-input__control">
        <Icon
          v-if="clearable && isSelected"
          src="/icons/close.svg"
          class="b-selector__clear"
          @click="clear" />
        <Icon
          v-else
          src="/icons/chevron-down.svg"
          class="b-selector__chevron" />
      </span>
    </template>
    <div class="b-selector__panel">
      <slot name="panel" :options="options" :select="select">
        <ListBox
          v-model="selected"
          :options="options"
          :formatter="formatter"
          :searchable="searchable"
          :multiple="multiple"
          :search-text="searchText"
          :empty-text="emptyText"
          class="b-selector__options"
          tabindex="-1">
          <template #default="{ item: option }">
            <slot :option="option" name="option">
              <slot :item="option">
                {{ formatter?.(option) || option }}
              </slot>
            </slot>
          </template>
        </ListBox>
      </slot>
    </div>
  </Dropdown>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import { isNumber } from '/@/utils/number';
import Dropdown from '../Dropdown.vue';
import ListBox from './ListBox.vue';
import Icon from '../Icon.vue';

type Props = {
  options: T[];
  formatter?: (option: T) => string;
  placeholder?: string;
  searchable?: boolean | ((option: T) => string);
  clearable?: boolean;
  disabled?: boolean;
  searchText?: string;
  emptyText?: string;
  multiple?: boolean;
  size?: number | string;
};

const props = withDefaults(defineProps<Props>(), {
  formatter: undefined,
  placeholder: 'Select one',
  searchable: false,
  searchText: 'Search',
  emptyText: 'Nothing found',
  size: 'calc(100% - 2 * var(--margin))',
});

const emit = defineEmits<{
  select: [selected: T | T[] | undefined],
}>();

defineSlots<{
  default?: (props: { item: T }) => any;
  selected?: (props: { selected: T }) => any;
  selecteds?: (props: { selected: T[] }) => any;
  option?: (props: { option: T }) => any;
  panel?: (props: { options: T[], select: (value: T | T[] | undefined) => void }) => any;
}>();

const selected = defineModel<T | T[]>();

const select = (value: T | T[] | undefined) => {
  selected.value = value;
  emit('select', value);
};

const isSelected = computed(() => props.multiple
  ? !!(selected.value as T[]).length
  : selected.value !== undefined,
);

const clear = () => {
  if (!props.disabled && props.clearable) {
    select(props.multiple ? [] : undefined);
  }
};
</script>

