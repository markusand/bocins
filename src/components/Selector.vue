<template>
  <Dropdown
    class="selector"
    v-bind="selectorProps">
    <template #toggler>
      <div :class="classes">
        <div v-if="isSelected(selected)" class="selector__selected">
          <slot v-if="Array.isArray(selected)" name="selections" :items="selected">
            {{ selected.map(formatter).join(', ') }}
          </slot>
          <slot v-else name="selection" :item="selected">
            <slot :item="selected">
              {{ formatter?.(selected) || selected }}
            </slot>
          </slot>
        </div>
        <div v-else class="placeholder">
          <slot name="placeholder">{{ placeholder }}</slot>
        </div>
        <Icon
          v-if="clearable && isSelected(selected)"
          src="x.svg"
          @click.stop="clear" />
        <Icon v-else src="chevron-down.svg" />
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
} & Pick<DropdownProps, 'disabled' | 'block' | 'width' | 'top' | 'right'>
  & ListBoxProps<T>;

const props = withDefaults(defineProps<SelectorProps<T>>(), {
  formatter: String,
  placeholder: 'Select',
});

const selectorProps = computed(() => {
  const { disabled, block, width, top, right } = props;
  return { disabled, block, width, top, right };
});

const classes = computed(() => ['selector__toggler', 'is-selector-toggler', {
  'selector__toggler--invalid': props.invalid,
  'selector__toggler--disabled': props.disabled,
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
  --panel-border: none;

  .listbox {
    display: flex;
    min-width: 100%;
    width: fit-content;
  }
}

.selector:focus-within .selector__toggler { --color-border: var(--color-accent, #333); }
</style>
