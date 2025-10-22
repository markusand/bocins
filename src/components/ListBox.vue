<template>
  <div class="listbox" :class="modifiers">
    <header v-if="props.search">
      <Search
        v-model="searchBy"
        :placeholder="props.searchText"
        clearable
        block />
    </header>
    <Picker
      v-if="options.length"
      v-model="selected"
      :key-attr="props.keyAttr"
      :options
      :disabled="props.disabled">
      <template #default="{ option }">
        <div class="listbox__option">
          <slot :option>
            <div class="listbox__label">
              {{ props.formatter?.(option) || option }}
            </div>
          </slot>
        </div>
      </template>
    </Picker>
    <slot v-else name="empty">
      <div class="listbox__empty">
        {{ props.emptyText || 'No options available' }}
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts" generic="T">
import { toRef, computed } from 'vue';
import Search from './Search.vue';
import Picker, { type PickerProps } from './Picker.vue';
import { useSearcher } from '/@/utils';

export type ListBoxProps<T> = {
  search?: (option: T) => string;
  searchText?: string;
  emptyText?: string;
} & Omit<PickerProps<T>, 'columns'>;

const props = defineProps<ListBoxProps<T>>();

defineSlots<{
  default: (props: { option: T }) => void;
  empty?: () => void;
}>();

const selected = defineModel<T | T[] | undefined>({ required: true });

const { searchBy, search } = useSearcher<T>(toRef(props, 'search'));
const options = search(toRef(props, 'options'));

const modifiers = computed(() => {
  const { disabled, invalid } = props;
  return { disabled, invalid };
});
</script>

<style lang="scss" scoped>
@use  '../styles';

.listbox {
  --color: var(--color-accent, #333);

  @extend %panel;

  display: flex;
  flex-direction: column;

  .picker {
    --spacing: 1px;

    flex: 1;
    flex-flow: column nowrap;
    padding: 0.25rem;
    border-radius: 0.25rem;
    overflow: auto;
    max-height: 10rem; 

    /* stylelint-disable-next-line selector-pseudo-class-no-unknown */
    :deep(input) { display: none; }
  }

  .search {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &__option {
    flex: 1;
    border-radius: 0.25rem;

    &:hover { background: color-mix(in srgb, var(--color) 10%, transparent); }

    :checked + & {
      background: var(--color);
      color: var(--color-text-accent, #fff);
    }

    .invalid :checked + & {
      background: var(--color-error, red);
      color: #fff;
    }
  }

  &__label { padding: 0.35rem 0.5rem; }

  &__empty {
    padding: 0.5rem;
    text-align:center;
    opacity: 0.25;
    margin: auto;
  }

  &.invalid { @extend %invalid; }
  
  &.disabled { @extend %disabled; }
  
  &.disabled :checked + &__option {
    background: color-mix(in srgb, var(--color) 25%, transparent);
  }
}
</style>
