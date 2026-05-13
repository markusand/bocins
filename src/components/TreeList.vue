<template>
  <ul class="treelist" v-bind="!parent ? { onFocusin, onKeydown } : {}">
    <li v-for="item, i in schema" :key="i">
      <details v-if="childrenNode in item" :open>
        <summary class="treelist__title">
          <Icon src="chevron-right.svg" />
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
          :open>
          <template #title="attrs">
            <slot name="title" v-bind="attrs" />
          </template>
          <template #default="attrs">
            <slot v-bind="attrs" />
          </template>
        </TreeList>
      </details>
      <div v-else class="treelist__node">
        <slot :item :parent :path="path(item)">
          {{ item[nameNode] }}
        </slot>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts" generic="T extends object, K extends KoA<T, unknown[] | undefined>">
import { useRovingTabindex } from '/@/utils';
import type { KeyOfAttribute as KoA, MaybeReadonly } from '/@/types';
import Icon from './Icon.vue';

export type TreeListProps<T, K> = {
  schema: MaybeReadonly<T[]>;
  nameNode: KoA<T, PropertyKey>;
  childrenNode: K;
  parent?: T;
  open?: boolean;
  path?: PropertyKey[];
};

const props = withDefaults(defineProps<TreeListProps<T, K>>(), {
  path: () => [],
});

defineSlots<{
  default?: (props: { item: T, parent?: T, path: PropertyKey[] }) => void;
  title?: (props: { item: T, parent?: T, path: PropertyKey[] }) => void;
}>();

const path = (item: T): PropertyKey[] => [
  ...props.path,
  item[props.nameNode] as PropertyKey,
];

// Target any tabable element within visible subtree: the browser hides details:not([open]) > ul,
// while the <summary> direct child remains visible as the collapse toggle.
const SELECTOR = ':is(summary, button, a[href], input, select, textarea, [tabindex])';
const { onFocusin, onKeydown } = useRovingTabindex({
  selector: `${SELECTOR}:not(details:not([open]) > ul ${SELECTOR})`,
});
</script>

<style scoped>
.treelist {
  --indent: var(--treelist-indent, 1.25rem);
  --spacing: var(--treelist-spacing, 0.35rem);
  --_radius: var(--treelist-radius, var(--radius, 0.25rem));

  margin: 0;
  list-style: none;
  padding: 0;

  & & { margin-left: var(--indent); }

  .icon {
    --size: 1em;

    margin-right: var(--spacing);
  }

}

[open] > .treelist__title .icon { transform: rotate(90deg); }

.treelist__title {
  padding: var(--spacing);
  display: flex;
  align-items: center;
  list-style: none;
  outline: none;
  cursor: pointer;
  border-radius: var(--_radius);

  &::-webkit-details-marker,
  &::marker { display: none; }

  &:focus { background: #8881; }
}
</style>
