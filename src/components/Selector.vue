<template>
  <Dropdown
    class="selector"
    v-bind="selectorProps">
    <template #toggler>
      <div :class="['selector__toggler', 'is-selector-toggler', togglerModifiers]">
        <div v-if="isSelected(selected)" class="selector__selected">
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
          :src="`${config.iconPath}/close.svg`"
          @click.stop="clear" />
        <Icon v-else :src="`${config.iconPath}/chevron-down.svg`" />
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
import { config } from '/@/config';
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

const togglerModifiers = computed(() => ({
  'selector__toggler--invalid': props.invalid,
  'selector__toggler--disabled': props.disabled,
}));

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
