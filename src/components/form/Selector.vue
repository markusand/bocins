<template>
  <Dropdown
    :class="['selector input', { multiple, disabled }]"
    :style="`width:${props.size}${isNumber(props.size) ? 'rem' : ''}`"
    :disabled="disabled"
    v-bind="$attrs">
    <template #toggler>
      <div class="selector__label">
        <slot v-if="isSelected" :selected="selected" name="selected">
          <slot :item="selected">
            {{ props.formatter?.(selected) || selected }}
          </slot>
        </slot>
        <div v-else class="selector__placeholder">
          {{ props.placeholder }}
        </div>
      </div> 
      <Icon
        v-if="props.clearable && isSelected"
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
          :formatter="props.formatter"
          :searchable="searchable"
          :multiple="props.multiple"
          :as-key="props.asKey"
          :placeholder="props.searchText"
          :empty-text="props.notFoundText"
          class="selector__options">
          <template #default="{ item: option }">
            <slot :option="option" name="option">
              <slot :item="option">
                {{ props.formatter?.(option) || option }}
              </slot>
            </slot>
          </template>
        </ListBox>
      </slot>
    </div>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isNumber } from '/@/utils/number';
import Dropdown from '../Dropdown.vue';
import ListBox from './ListBox.vue';
import Icon from '../Icon.vue';

type Props = {
  modelValue: any;
  options: any[];
  asKey?: (option: any) => string | number;
  formatter?: (option: any) => string;
  placeholder?: string;
  searchable?: boolean | ((options: any) => string);
  clearable?: boolean;
  disabled?: boolean;
  searchText?: string;
  notFoundText?: string;
  multiple?: boolean;
  size?: number | string;
};

const props = withDefaults(defineProps<Props>(), {
  asKey: (option: any) => option,
  formatter: undefined,
  placeholder: 'Select one',
  searchable: false,
  searchText: 'Search',
  notFoundText: 'Nothing found',
  size: 'calc(100% - 2 * var(--margin))',
});

const emit = defineEmits(['update:modelValue', 'select']);

const select = (value: any) => {
  emit('update:modelValue', value);
  emit('select', value);
};

const selected = computed({
  get: () => props.modelValue,
  set: select,
});

const isSelected = computed(() => props.multiple
  ? (selected.value as any[]).length
  : selected.value !== undefined,
);

const clear = () => {
  if (!props.disabled && props.clearable && isSelected.value) {
    const value = props.multiple ? [] : undefined;
    select(value);
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

    & * {
      border: 0;
      margin: 0;
    }
  }
}
</style>

