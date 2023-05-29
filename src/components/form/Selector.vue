<template>
  <Dropdown
    :class="['selector input', { multiple, disabled }]"
    :style="`width:${size}${isNumber(size) ? 'rem' : ''}`"
    :disabled="disabled"
    v-bind="$attrs">
    <template #toggler>
      <div class="selector__label">
        <template v-if="isSelected">
          <slot v-if="multiple" name="selecteds" :selected="(selected as T[])">
            <slot v-for="item, i in (selected as T[])" :key="i" :item="item">
              {{ formatter?.(item) || item! }}
            </slot>
          </slot>
          <slot v-else name="selected" :selected="(selected as T)">
            <slot :item="(selected as T)">
              {{ formatter?.(selected as T) || selected! }}
            </slot>
          </slot>
        </template>
        <div v-else class="selector__placeholder">
          {{ placeholder }}
        </div>
      </div> 
      <Icon
        v-if="clearable && isSelected"
        src="/icons/close.svg"
        class="selector__clear"
        @click="clear" />
      <Icon
        v-else
        src="/icons/chevron-down.svg"
        class="selector__chevron" />
    </template>
    <div class="input selector__panel">
      <slot name="panel" :options="options" :select="select">
        <ListBox
          v-model="selected"
          :options="options"
          :formatter="formatter"
          :searchable="searchable"
          :multiple="multiple"
          :search-text="searchText"
          :empty-text="emptyText"
          class="selector__options"
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
  modelValue: T | T[] | undefined;
  options: T[];
  formatter?: (option: T | T[]) => string;
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
  'update:modelValue': [selected: T | T[] | undefined],
  select: [selected: T | T[] | undefined],
}>();

defineSlots<{
  default?: (props: { item: T }) => any;
  selected?: (props: { selected: T }) => any;
  selecteds?: (props: { selected: T[] }) => any;
  option?: (props: { option: T }) => any;
  panel?: (props: { options: T[], select: (value: T | T[] | undefined) => void }) => any;
}>();

const select = (value: T | T[] | undefined) => {
  emit('update:modelValue', value);
  emit('select', value);
};

const selected = computed({
  get: () => props.modelValue,
  set: select,
});

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

<style lang="scss" scoped>
.selector {
  cursor: pointer;

  &__label,
  &__placeholder {
    display: flex;
    align-items: center;
    gap: var(--padding);
    padding: var(--padding) 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1;
  }

  &__placeholder {
    margin: calc(-1 * var(--padding)) 0;
    opacity: 0.5;
  }

  &__panel {
    padding: 0;

    &:focus-within { border: var(--border); }

    & * {
      border: 0;
      margin: 0;
    }
  }
}
</style>

