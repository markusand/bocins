<template>
  <ul class="tree-list">
    <li v-for="item in props.schema" :key="item[props.nameNode]">
      <details v-if="item[props.childrenNode]" :open="props.open">
        <summary class="tree-list__title">
          <Icon
            src="/icons/chevron-right.svg"
            class="tree-list__chevron" />
          <slot name="title" :item="item">{{ item[props.nameNode] }}</slot>
        </summary>
        <TreeList
          :schema="item[props.childrenNode]"
          :name-node="props.nameNode"
          :children-node="props.childrenNode"
          :open="props.open">
          <template #default="{ item: nested }">
            <slot :item="nested" />
          </template>
        </TreeList>
      </details>
      <div v-else class="tree-list__item">
        <slot :item="item">{{ item.name }}</slot>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import Icon from './Icon.vue';

type Props = {
  schema: Record<string, any>[];
  nameNode?: string;
  childrenNode?: string;
  open?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  nameNode: 'name',
  childrenNode: 'children',
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
    cursor: pointer;

    &::-webkit-details-marker,
    &::marker { display: none; }
  }

  &__item { margin-left: var(--padding); }
}
</style>
