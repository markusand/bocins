<template>
  <fieldset class="b-transfer">
    <ListBox
      v-model="addList"
      :options="fromList"
      :searchable="props.searchable"
      :empty-text="props.emptyText"
      multiple>
      <template #default="{ item }">
        <slot name="from" :item="item">
          <slot :item="item">{{ item }}</slot>
        </slot>
      </template>
    </ListBox>
    <div class="b-transfer__controls">
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
      multiple>
      <template #default="{ item }">
        <slot name="to" :item="item">
          <slot :item="item">{{ item }}</slot>
        </slot>
      </template> 
    </ListBox>
  </fieldset>
</template>

<script setup lang="ts" generic="T">
import { ref, watch, type Ref } from 'vue';
import ListBox from './ListBox.vue';
import Button from '../Button.vue';

type Props = {
  options: T[];
  searchable?: boolean | ((options: any) => string);
  emptyText?: string;
};

const props = withDefaults(defineProps<Props>(), {
  searchable: undefined,
  emptyText: 'Empty list',
});

const emit = defineEmits<{
  change: [items: T[]],
}>();

defineSlots<{
  default?: (props: { item: T }) => any;
  from?: (props: { item: T }) => any;
  to?: (props: { item: T }) => any;
}>();

const fromList = ref<T[]>(props.options) as Ref<T[]>;
const addList = ref<T[]>([]) as Ref<T[]>;
const removeList = ref<T[]>([]) as Ref<T[]>;


const toList = defineModel<T[]>({ required: true });
watch(toList, value => emit('change', value));

const inList = (item: T, list: T[]) => !!list.find(listT => listT === item);

const add = (items = addList) => {
  toList.value.push(...items.value);
  fromList.value = fromList.value.filter(item => !inList(item, items.value));
  addList.value = [];
};

const remove = (items = removeList) => {
  fromList.value.push(...items.value);
  toList.value = toList.value.filter(item => !inList(item, items.value));
  removeList.value = [];
};

const addAll = () => add(fromList);
const removeAll = () => remove(toList);
</script>
