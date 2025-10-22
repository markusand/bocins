<template>
  <Dropdown
    class="selector"
    v-bind="selectorProps">
    <template #toggler>
      <div :class="['toggler', { invalid, disabled }]">
        <div v-if="isSelected(selected)" class="selected">
          <template v-if="isSelected(selected)">
            <slot v-if="Array.isArray(selected)" name="selections" :items="selected">
              {{ selected.map(props.formatter ?? String).join(', ') }}
            </slot>
            <slot v-else name="selection" :item="selected">
              <slot :item="selected">
                {{ props.formatter?.(selected) || selected }}
              </slot>
            </slot>
          </template>
        </div>
        <div v-else class="placeholder">
          <slot name="placeholder">{{ props.placeholder || 'Select' }}</slot>
        </div>
        <Icon
          v-if="props.clearable && isSelected(selected)"
          src="/icons/close.svg"
          @click.prevent="clear" />
        <Icon v-else src="/icons/chevron-down.svg" />
      </div>
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
} & Omit<DropdownProps, 'toggler'> & ListBoxProps<T>;

const props = defineProps<SelectorProps<T>>();

const selectorProps = computed(() => {
  const { disabled, block, width, top, right } = props;
  return { disabled, block, width, top, right };
});

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

<style lang="scss" scoped>
@use  '../styles';

.selector {
  --panel-border: none;

  .toggler { @extend %selector-toggler; }

  .listbox {
    display: flex;
    min-width: 100%;
    width: fit-content;
  }
}
</style>
