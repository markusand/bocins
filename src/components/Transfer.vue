<template>
  <div class="transfer" :style="width">
    <ListBox v-bind="props" v-model="toAdd" :options="pool">
      <template #default="{ option }">
        <slot :option="option" />
      </template>
    </ListBox>
    <div class="controls">
      <Button :disabled="!isAddable(pool)" even @click="addItems()">
        <Icon src="/icons/chevrons-right.svg" />
      </Button>
      <Button :disabled="!isAddable(toAdd)" even @click="addItems(toAdd)">
        <Icon src="/icons/chevron-right.svg" />
      </Button>
      <Button :disabled="!isRemoveable(toRemove)" even @click="removeItems(toRemove)">
        <Icon src="/icons/chevron-right.svg" class="remove" />
      </Button>
      <Button :disabled="!isRemoveable(selected)" even @click="removeItems()">
        <Icon src="/icons/chevrons-right.svg" class="remove" />
      </Button>
    </div>
    <ListBox v-bind="props" v-model="toRemove" :options="selected">
      <template #default="{ option }">
        <slot :option="option" />
      </template>
    </ListBox>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref, computed, type Ref } from 'vue';
import ListBox, { type ListBoxProps } from './ListBox.vue';
import Button from './Button.vue';
import Icon from './Icon.vue';
import { toWidth } from '/@/utils';

export type TransferProps<T> = {
  limit?: number | string;
  width?: string | number; 
} & ListBoxProps<T>;

const props = defineProps<TransferProps<T>>();

defineSlots<{
  default?: (props: { option: T }) => void;
}>();

const width = computed(() => toWidth(props.width));

const selected = defineModel<T[]>({ required: true });
const toRemove = ref<T[]>([]) as Ref<T[]>;

const pool = computed(() => props.options.filter(item => !selected.value.includes(item)));
const toAdd = ref<T[]>([]) as Ref<T[]>;

const isAddable = (origin: T[]) => {
  const overLimit = props.limit && origin.length > +props.limit - selected.value.length;
  return !props.disabled && origin.length && !overLimit;
};

const addItems = (items: T[] = pool.value) => {
  const limit = props.limit || Infinity;
  const max = +limit - selected.value.length;
  selected.value = [...selected.value, ...items.slice(0, max)];
  toAdd.value = [];
};

const isRemoveable = (origin: T[]) => !props.disabled && origin.length;

const removeItems = (items: T[] = selected.value) => {
  selected.value = selected.value.filter(item => !items.includes(item));
  toRemove.value = [];
};
</script>

<style lang="scss" scoped>
.transfer {
  --btn-color: var(--color, #333);
  
  display: flex;
  gap: 0.5rem;
  min-width: 15rem;

  .listbox {
    flex: 1;
    min-width: 0;
  }

  .controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.125rem;

    .icon.remove { transform: rotate(180deg); }
  }
}
</style>
