<template>
  <dropdown
    :class="['selector', { multiple }]"
    :disabled="disabled">
    <div
      :class="['input', { disabled }]"
      v-bind="$attrs"
      :style="`width:${props.size}${isNumber(props.size) ? 'rem' : ''}`">
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
    </div>
    <template #dropdown>
      <ListBox
        v-model="selected"
        :options="options"
        :formatter="props.formatter"
        :searchable="searchable"
        :multiple="props.multiple"
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
    </template>
  </dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isNumber } from '/@/utils/number';
import Dropdown from '../Dropdown.vue';
import ListBox from './ListBox.vue';
import Icon from '../Icon.vue';

type Props = {
  modelValue: any;
  options: any[] | Readonly<any[]>;
  formatter?: (option: any) => string;
  placeholder?: string;
  searchable?: boolean | ((options: any) => string);
  clearable?: boolean;
  disabled?: boolean;
  notFoundText?: string;
  multiple?: boolean;
  size?: number | string;
};

const props = withDefaults(defineProps<Props>(), {
  formatter: undefined,
  placeholder: 'Select one',
  searchable: false,
  notFoundText: 'Nothing found',
  size: 'calc(100% - 2 * var(--margin))',
});

const emit = defineEmits(['update:modelValue']);

const selected = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const isSelected = computed(() => props.multiple
  ? (selected.value as any[]).length
  : selected.value !== undefined,
);

const clear = () => {
  if (!props.disabled && props.clearable && isSelected.value) {
    const value = props.multiple ? [] : undefined;
    emit('update:modelValue', value);
  }
};
</script>

<style lang="scss" scoped>
.selector {
  --margin: var(--input-margin, 1px);

  margin: var(--margin);
  cursor: pointer;

  .input { margin: 0; }

  &__label {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: calc(-1 * var(--input-padding, 0.5rem)) 0;
    padding: var(--input-padding, 0.5rem) 0;
  }

  &__clear,
  &__chevron { margin-left: 0.5em; }
  &__placeholder { opacity: 0.5; }
}
</style>

