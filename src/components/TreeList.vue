<template>
  <ul class="tree-list">
    <li v-for="item, i in schema" :key="i">
      <details v-if="item[childrenNode as keyof T]" :open="open">
        <summary class="tree-list__title">
          <Icon
            src="/icons/chevron-right.svg"
            class="tree-list__chevron" />
          <slot name="title" :item="item">
            <slot :item="item">{{ item[nameNode as keyof T] }}</slot>
          </slot>
        </summary>
        <TreeList
          :parent="item"
          :schema="(item[childrenNode as keyof T] as TreeNode<T, K>[])"
          :name-node="nameNode"
          :children-node="childrenNode"
          :open="open">
          <template #title="{ item: title }">
            <slot name="title" :item="title" />
          </template>
          <template #default="{ item: nested }">
            <slot :item="nested" :parent="item" />
          </template>
        </TreeList>
      </details>
      <div v-else class="tree-list__item">
        <slot :item="item" :parent="parent">
          {{ item[nameNode as keyof T] }}
        </slot>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts" generic="T extends object, K extends KeyOfAttrType<T, unknown[]>">
import Icon from './Icon.vue';
import type { KeyOfAttrType } from '../types';

export type TreeNode<
  T extends object,
  K extends keyof T,
> = (T & { [k in K]?: TreeNode<T, K>[] }) | T;

type Props = {
  schema: TreeNode<T, K>[];
  parent?: any;
  nameNode: KeyOfAttrType<T, string | number>;
  childrenNode: K;
  open?: boolean;
};

defineSlots<{
  // eslint-disable-next-line
  // @ts-ignore Default return type may be any element of the children array
  default?: (props: { item: T | T[K][number] }) => void;
  title?: (props: { item: T }) => void;
}>();

withDefaults(defineProps<Props>(), {
  parent: undefined,
  open: false,
});
</script>

<style lang="scss" scoped>
.tree-list {
  --indent: var(--treelist-indent, 1rem);
  --padding: var(--treelist-padding, 0.125rem);

  margin: 0;
  list-style: none;
  padding: var(--padding);

  & & { margin-left: var(--indent); }

  &__chevron {
    --size: 1em;

    width: var(--indent);
    flex: 0 0 var(--indent);
    margin-right: var(--padding);

    [open] > summary & { transform: rotate(90deg); }
  }

  &__title {
    padding: var(--padding) 0;
    display: flex;
    align-items: center;
    list-style: none;
    outline: none;
    cursor: pointer;

    &::-webkit-details-marker,
    &::marker { display: none; }
  }
}
</style>
