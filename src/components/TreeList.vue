<template>
  <ul class="treelist">
    <li v-for="item, i in props.schema" :key="i">
      <details v-if="childrenNode in item" :open="props.open">
        <summary class="treelist__title">
          <Icon :src="`${config.iconPath}/chevron-right.svg`" />
          <slot name="title" :parent :path="path(item)" :item>
            <slot :parent :path="path(item)" :item>
              {{ item[nameNode] }}
            </slot>
          </slot>
        </summary>
        <TreeList
          :parent="item"
          :schema="(item[childrenNode] as T[])"
          :name-node="nameNode"
          :children-node="childrenNode"
          :path="path(item)"
          :open="props.open">
          <template #title="attrs">
            <slot name="title" v-bind="attrs" />
          </template>
          <template #default="attrs">
            <slot v-bind="attrs" />
          </template>
        </TreeList>
      </details>
      <div v-else>
        <slot :item :parent :path="path(item)">
          {{ item[nameNode] }}
        </slot>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts" generic="T extends object, K extends KoA<T, unknown[] | undefined>">
import { config } from '/@/config';
import Icon from './Icon.vue';
import type { KeyOfAttribute as KoA, MaybeReadonly } from '/@/types';

defineSlots<{
  default?: (props: { item: T, parent?: T, path: PropertyKey[] }) => void;
  title?: (props: { item: T, parent?: T, path: PropertyKey[] }) => void;
}>();

const props = defineProps<{
  schema: MaybeReadonly<T[]>;
  nameNode: KoA<T, PropertyKey>;
  childrenNode: K;
  parent?: T;
  open?: boolean;
  path?: PropertyKey[];
}>();

const path = (item: T): PropertyKey[] => [
  ...(props.path || []),
  item[props.nameNode] as PropertyKey,
];
</script>

<style lang="scss" scoped>
.treelist {
  --indent: var(--treelist-indent, 1rem);
  --spacing: var(--treelist-spacing, 0.25rem);

  margin: 0;
  list-style: none;
  padding: 0;

  & & { margin-left: var(--indent); }

  .icon {
    --size: 1em;

    width: var(--indent);
    flex: 0 0 var(--indent);
    margin-right: var(--spacing);
  }

  [open] > &__title .icon { transform: rotate(90deg); }

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
