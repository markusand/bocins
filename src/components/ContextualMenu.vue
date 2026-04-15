<template>
  <Dropdown v-bind="props" class="contextual">
    <template #toggler>
      <slot name="toggler">
        <Button :disabled="props.disabled" even>
          <Icon :src="`${config.iconPath}/more.svg`" />
        </Button>
      </slot>
    </template>
    <div class="contextual__panel is-panel">
      <article v-for="group, i in props.actions" :key="group.label ?? i" class="contextual__group">
        <em v-if="group.label" class="contextual__label">
          <slot name="group" :group="group.label">{{ group.label }}</slot>
        </em>
        <div class="contextual__actions">
          <template v-for="action in group.actions" :key="action.label">
            <slot :name="action.id" :action="action">
              <slot :action="action">
                <Button
                  variant="flat"
                  block
                  v-bind="action.attributes ?? {}"
                  :disabled="action.disabled"
                  @click.prevent.stop="action.onClick(props.item as I)">
                  <Icon v-if="action.icon" :src="action.icon" />
                  {{ action.label ?? action.id }}
                </Button>
              </slot>
            </slot>
          </template>
        </div>
      </article>
    </div>
  </Dropdown>
</template>

<script setup lang="ts" generic="T, K extends string, I = T">
import { config } from '/@/config';
import Dropdown, { type DropdownProps } from './Dropdown.vue';
import Button from './Button.vue';
import Icon from './Icon.vue';
import type { MaybeReadonly } from '/@/types';

export type ContextualMenuAction<T, K extends string, I = T> = {
  id: K,
  label?: string;
  icon?: string;
  attributes?: Record<string, unknown>;
  disabled?: boolean;
  onClick: (item: I) => void;
};

export type ContextualMenuActions<T, K extends string, I = T> = {
  label?: string;
  actions: ContextualMenuAction<T, K, I>[];
};

export type ContextualMenuProps<T, K extends string, I = T> = {
  item: MaybeReadonly<T>;
  actions: ContextualMenuActions<T, K, I>[];
} & DropdownProps;

const props = defineProps<ContextualMenuProps<T, K, I>>();

defineSlots<{
  toggler?: () => void;
  group?: (props: { group: string }) => void;
  default?: (props: { action: ContextualMenuAction<T, K, I> }) => void;
} & Record<K, (props: { action: ContextualMenuAction<T, K, I> }) => void>>();
</script>

<style scoped>
.contextual__group {
  padding: 0.25rem;

  & + & { border-top: 1px solid #8884; }
}

.contextual__label {
  color: #888a;
  font-size: 0.8em;
  display: block;
  margin: 0.5rem 0.5rem 0.25rem;
  font-style: normal;
}

.contextual__actions {
  display: flex;
  flex-direction: column;

  .btn {
    text-align: left;
    justify-content: left;
    white-space: nowrap;
    margin: 0;

    &:hover { background: color-mix(in srgb, var(--color) 5%, transparent); }
  }
}

.contextual__keystrokes { margin: 0 calc(-0.5 * var(--spacing)) 0 auto; }
</style>

