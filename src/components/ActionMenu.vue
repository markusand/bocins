<template>
  <Dropdown class="action-menu" :disabled>
    <template #toggler>
      <slot name="toggler">
        <Button flat even :disabled>
          <Icon src="ellipsis-vertical.svg" />
        </Button>
      </slot>
    </template>
    <div class="is-panel">
      <div v-for="group, i in actions" :key="group.name ?? i" class="action-menu__list">
        <span v-if="group.name" class="action-menu__group">{{ group.name }}</span>
        <slot v-for="action in group.actions" :key="action.id" :name="action.id" :action>
          <ActionMenu v-if="action.groups" :item :actions="action.groups">
            <template #toggler>
              <Button flat v-bind="action.attrs" @click="action.onClick?.(item)">
                <Icon v-if="action.icon" :src="action.icon" />
                <span class="action-menu__label">{{ action.label }}</span>
              </Button>
            </template>
            <template v-for="subaction in subactions(action)" #[subaction.id]>
              <slot :name="subaction.id" :action="subaction" />
            </template>
          </ActionMenu>
          <Button v-else flat v-bind="action.attrs" @click="action.onClick?.(item)">
            <Icon v-if="action.icon" :src="action.icon" />
            <span class="action-menu__label">{{ action.label }}</span>
            <HotKey
              v-if="action.hotkey && action.onClick"
              :keys="action.hotkey"
              @press="action.onClick(item)" />
          </Button>
        </slot>
      </div>
    </div>
  </Dropdown>
</template>

<script setup lang="ts" generic="T, K extends string">
import type { MaybeReadonly } from '/@/types';
import Dropdown from './Dropdown.vue';
import Button from './Button.vue';
import Icon from './Icon.vue';
import HotKey from './HotKey.vue';

export type Action<T, K extends string> = {
  id: K;
  label: string;
  icon?: string;
  attrs?: Record<string, string | number | boolean>;
  hotkey?: string;
  onClick?: (item: T) => void;
  groups?: ActionGroup<T, K>[];
};

export type ActionGroup<T, K extends string> = {
  name?: string;
  actions: MaybeReadonly<Action<T, K>[]>;
}

defineProps<{
  item: T,
  actions: MaybeReadonly<ActionGroup<T, K>[]>;
  disabled?: boolean;
}>();

defineSlots<{
  toggler: () => void;
} & {
  [k in K]: (props: { action: Action<T, k>, key?: k }) => void;
}>();

const subactions = (action: Action<T, K>): Action<T, K>[] => {
  if (!action.groups) return [];
  return action.groups.flatMap(group => [
    ...group.actions,
    ...group.actions.flatMap(subactions)
  ]);
};
</script>

<style scoped>
.action-menu {
  .action-menu__list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding: var(--spacing, 0.25rem);
    min-width: var(--min-width, 7rem);
    max-width: var(--max-width, 12rem);

    &:not(:first-child) { border-top: 1px solid var(--color-border, #8886); }

    .action-menu__group {
      padding: 0.5rem 0.5rem 0.25rem;
      font-size: 0.6rem;
      text-transform: uppercase;
      opacity: 0.5;
    }

    .btn {
      .action-menu__label {
        display: block;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .hotkey {
        --size: 0.65em;

        margin-left: 0.5rem;
      }
    }

    .action-menu > .btn::after {
      content: '';
      display: block;
      height: 0.25rem;
      width: 0.25rem;
      border: 1px solid color-mix(in srgb, currentcolor 50%, transparent);
      border-width: 0 1px 1px 0;
      transform: rotate(-45deg);
      margin-left: auto;
      opacity: 0.75;
    }

    &:deep(.dropdown__overlay) {
      top: anchor(top);
      left: anchor(right);
      margin: 0 0.25rem;
    }
  }
}
</style>

