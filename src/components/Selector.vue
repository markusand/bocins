<template>
  <Dropdown
    class="selector"
    v-bind="selectorProps">
    <template #label>
      <span :class="classes">
        <span v-if="isSelected(selected)" class="selector__selected">
          <slot v-if="Array.isArray(selected)" name="selections" :items="selected">
            {{ selected.map(formatter).join(', ') }}
          </slot>
          <slot v-else name="selection" :item="selected">
            <slot :item="selected">
              {{ formatter?.(selected) || selected }}
            </slot>
          </slot>
        </span>
        <span v-else class="placeholder">
          <slot name="placeholder">{{ placeholder }}</slot>
        </span>
        <Icon
          v-if="clearable && isSelected(selected)"
          src="x.svg"
          @click.stop="clear" />
        <Icon v-else src="chevron-down.svg" />
      </span>
    </template>
    <ListBox v-model="selected" v-bind="props" width="auto">
      <template #default="{ option }">
        <slot name="option" :option>
          <slot :item="option" />
        </slot>
      </template>
      <template #empty>
        <slot name="empty" />
      </template>
    </ListBox>
  </Dropdown>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import Dropdown, { type DropdownProps } from './Dropdown.vue';
import ListBox, { type ListBoxProps } from './ListBox.vue';
import Icon from './Icon.vue';

export type SelectorProps<T> = {
  clearable?: boolean;
  placeholder?: string;
} & Omit<DropdownProps, 'icon' | 'label'> & ListBoxProps<T>;

const props = withDefaults(defineProps<SelectorProps<T>>(), {
  formatter: String,
  placeholder: 'Select',
});

const selectorProps = computed(() => {
  const { disabled, block, width, lazy, position } = props;
  return { disabled, block, width, lazy, position };
});

const classes = computed(() => ['is-selector-toggler', {
  'is-invalid': props.invalid,
  'is-disabled': props.disabled,
}]);

defineSlots<{
  default?: (props: { item: T }) => void;
  selection?: (props: { item: T }) => void;
  selections?: (props: { items: T[] }) => void;
  option?: (props: { option: T }) => void;
  placeholder?: () => void;
  empty?: () => void;
}>();

const selected = defineModel<T | T[]>(); 

const isSelected = (item: T | T[] | undefined): item is T | T[] => {
  return Array.isArray(item) ? !!item.filter(Boolean).length : item != null;
};

const clear = () => {
  selected.value = Array.isArray(selected.value) ? [] : undefined;
};
</script>

<style scoped>
.selector {
  .listbox {
    display: flex;
    min-width: 100%;
    width: fit-content;
  }
}
</style>
