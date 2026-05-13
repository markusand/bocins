<template>
  <div :class="classes">
    <header v-if="props.search">
      <Search
        v-model="searchBy"
        :placeholder="searchText"
        clearable
        block />
    </header>
    <Picker
      v-if="options.length"
      v-model="selected"
      :key-attr="keyAttr"
      :options
      :disabled>
      <template #default="{ option }">
        <div class="listbox__option">
          <slot :option>
            <div class="listbox__label">
              {{ formatter?.(option) || option }}
            </div>
          </slot>
        </div>
      </template>
    </Picker>
    <slot v-else name="empty">
      <div class="listbox__empty">
        {{ emptyText }}
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

const props = withDefaults(defineProps<ListBoxProps<T>>(), {
  searchText: 'Search',
  emptyText: 'No options available',
});

defineSlots<{
  default?: (props: { option: T }) => void;
  empty?: () => void;
}>();

const selected = defineModel<T | T[] | undefined>({ required: true });

const { searchBy, search } = useSearcher<T>(toRef(() => props.search));
const options = search(toRef(() => props.options));

const classes = computed(() => ['listbox', 'is-panel', {
  'is-disabled': props.disabled,
  'is-invalid': props.invalid,
}]);
</script>

<style scoped>
.listbox {
  --_color: var(--listbox-color, var(--color, var(--accent-color, #333)));
  --max-height: var(--listbox-max-height, 10rem);

  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  .picker {
    --spacing: 1px;

    flex: 1;
    flex-flow: column nowrap;
    padding: 0.25em;
    overflow: auto;
    max-height: var(--max-height);

    &:deep(input) {
      opacity: 0;
      position: absolute;
      pointer-events: none;
    }
  }

  .search {
    border-inline-width: 0;
    border-top-width: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    &:focus-within { --border-color: var(--border-color); }
  }
}

.listbox__option {
  flex: 1;
  border-radius: 0.25rem;

  &:hover { background: color-mix(in srgb, var(--_color) 10%, transparent); }
}

:focus + .listbox__option {
  background: color-mix(in srgb, var(--_color) 10%, transparent);
}

:checked + .listbox__option {
  background: var(--_color);
  color: #fff;
}

.listbox--invalid :checked + .listbox__option {
  background: var(--error-color, crimson);
  color: #fff;
}

.listbox__label { padding: 0.35rem 0.5rem; }

.listbox__empty {
  padding: 0.5rem;
  text-align:center;
  opacity: 0.25;
  margin: auto;
}
</style>
