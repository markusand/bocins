<template>
  <ul class="treelist">
    <li v-for="item, i in props.schema" :key="i">
      <details v-if="item[childrenNode as keyof T]" :open="props.open">
        <summary class="treelist__title">
          <Icon
            src="/icons/chevron-right.svg"
            class="chevron" />
          <slot name="title" :item :parent="parent">
            <slot :item :parent="props.parent">
              {{ item[nameNode as keyof T] }}
            </slot>
          </slot>
        </summary>
        <TreeList
          :parent="item"
          :schema="(item[childrenNode as keyof T] as TreeNode<T, K>[])"
          :name-node="nameNode"
          :children-node="childrenNode"
          :open="props.open">
          <template #title="{ item: _item, parent: _parent }">
            <slot name="title" :item="_item" :parent="_parent" />
          </template>
          <template #default="{ item: _item, parent: _parent }">
            <slot :item="_item" :parent="_parent" />
          </template>
        </TreeList>
      </details>
      <div v-else>
        <slot :item :parent="props.parent">
          {{ item[nameNode as keyof T] }}
        </slot>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts" generic="T extends object, K extends KeyOfAttribute<T, unknown[]>">
import Icon from './Icon.vue';
import type { KeyOfAttribute, MaybeReadonly } from '/@/types';

export type TreeNode<
  T extends object,
  K extends keyof T,
> = (T & { [k in K]?: TreeNode<T, K>[] }) | T;

export type TreeListProps<T extends object, K extends KeyOfAttribute<T, unknown[]>> = {
  schema: MaybeReadonly<TreeNode<T, K>[]>;
  nameNode: KeyOfAttribute<T, string | number>;
  childrenNode: K;
  parent?: unknown;
  open?: boolean;
};

defineSlots<{
  // @ts-expect-error Default prop may be any element of the children array
  default?: (props: { item: T | T[K][number], parent: T }) => void;
  title?: (props: { item: T, parent: T }) => void;
  
}>();

const props = defineProps<TreeListProps<T, K>>();
</script>

<style lang="scss" scoped>
.treelist {
  --indent: var(--treelist-indent, 1rem);
  --spacing: var(--treelist-spacing, 0.25rem);

  margin: 0;
  list-style: none;
  padding: 0;

  & & { margin-left: var(--indent); }

  .chevron {
    --size: 1em;

    width: var(--indent);
    flex: 0 0 var(--indent);
    margin-right: var(--spacing);
  }

  [open] > summary .chevron { transform: rotate(90deg); }

  &__title {
    padding: var(--spacing) 0;
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
