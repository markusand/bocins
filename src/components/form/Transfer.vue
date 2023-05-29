<template>
  <fieldset class="transfer">
    <ListBox
      v-model="addList"
      :options="fromList"
      :searchable="props.searchable"
      :empty-text="props.emptyText"
      :multiple="multiple">
      <template #default="{ item }">
        <slot name="from" :item="item">
          <slot :item="item">{{ item }}</slot>
        </slot>
      </template>
    </ListBox>
    <div class="transfer__controls">
      <Button :disabled="!fromList.length" @click="addAll()">&raquo;</Button>
      <Button :disabled="!addList.length" @click="add()">&gt;</Button>
      <Button :disabled="!removeList.length" @click="remove()">&lt;</Button>
      <Button :disabled="!toList.length" @click="removeAll()">&laquo;</Button>
    </div>
    <ListBox
      v-model="removeList"
      :options="toList"
      :searchable="props.searchable"
      :empty-text="props.emptyText"
      :multiple="multiple">
      <template #default="{ item }">
        <slot name="to" :item="item">
          <slot :item="item">{{ item }}</slot>
        </slot>
      </template> 
    </ListBox>
  </fieldset>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import ListBox from './ListBox.vue';
import Button from '../Button.vue';

type Item = any;

type Props = {
  options: Item[];
  modelValue: Item[];
  asKey?: (options: any) => string | number;
  searchable?: boolean | ((options: any) => string);
  emptyText?: string;
  multiple?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  asKey: (item: Item) => item.id,
  searchable: undefined,
  emptyText: 'Empty list',
});

const emit = defineEmits(['update:modelValue']);

const fromList = ref<Item[]>([]);
const addList = ref<Item[]>([]);
const removeList = ref<Item[]>([]);
const toList = computed<Item[]>({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const inList = (item: Item, list: Item[]) => {
  const search = props.asKey(item);
  return !!list.find(listItem => props.asKey(listItem) === search);
};

const add = (list = addList) => {
  toList.value = [...toList.value, ...list.value];
  addList.value = [];
};

const remove = (list = removeList) => {
  toList.value = toList.value.filter(item => !inList(item, list.value));
  removeList.value = [];
};

const addAll = () => add(fromList);
const removeAll = () => remove(toList);

watch(toList, () => {
  fromList.value = props.options.filter(item => !inList(item, toList.value));
}, { immediate: true });
</script>

<style lang="scss" scoped>
.transfer {
  display: flex;
  padding: 0;
  border: none;

  &__controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0.5em;
  }
}
</style>
