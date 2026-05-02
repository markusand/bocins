<template>
  <Dropdown class="action-menu" :disabled>
    <template #toggler>
      <slot name="toggler">
        <Button flat even>
          <Icon src="ellipsis-vertical.svg" />
        </Button>
      </slot>
    </template>
    <div class="is-panel">
      <div v-for="group, i in actions" :key="group.name ?? i" class="action-list">
        <span v-if="group.name" class="group">{{ group.name }}</span>
        <slot v-for="action in group.actions" :key="action.id" :name="action.id" :action>
          <ActionMenu v-if="action.groups" :item :actions="action.groups">
            <template #toggler>
              <Button flat v-bind="action.attrs" @click="action.onClick?.(item)">
                <Icon v-if="action.icon" :src="action.icon" />
                <span class="label">{{ action.label }}</span>
              </Button>
            </template>
            <template v-for="subaction in subactions(action)" #[subaction.id]>
              <slot :name="subaction.id" :action="subaction" />
            </template>
          </ActionMenu>
          <Button v-else flat v-bind="action.attrs" @click="action.onClick?.(item)">
            <Icon v-if="action.icon" :src="action.icon" />
            <span class="label">{{ action.label }}</span>
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

<script setup lang="ts" generic="T">
import Dropdown from './Dropdown.vue';
import Button from './Button.vue';
import Icon from './Icon.vue';
import HotKey from './HotKey.vue';

export type Action<T> = {
  id: string;
  label: string;
  icon?: string;
  attrs?: Record<string, string | number | boolean>;
  hotkey?: string;
  onClick?: (item: T) => void;
  groups?: ActionGroup<T>[];
};

export type ActionGroup<T> = {
  name?: string;
  actions: Action<T>[];
}

defineProps<{
  item: T,
  actions: ActionGroup<T>[];
  disabled?: boolean;
}>();

const subactions = (action: Action<T>): Action<T>[] => {
  if (!action.groups) return [];
  return action.groups.flatMap(group => [
    ...group.actions,
    ...group.actions.flatMap(subactions)
  ]);
};
</script>

<style scoped>
.action-menu {
  .action-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding: var(--spacing, 0.25rem);
    min-width: var(--min-width, 7rem);
    max-width: var(--max-width, 12rem);

    &:not(:first-child) { border-top: 1px solid var(--color-border, #8886); }

    .group {
      padding: 0.5rem 0.5rem 0.25rem;
      font-size: 0.6rem;
      text-transform: uppercase;
      opacity: 0.5;
    }

    .btn {
      .label {
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

    &:deep(.overlay) {
      top: anchor(top);
      left: anchor(right);
      margin: 0 0.25rem;
    }
  }
}
</style>

