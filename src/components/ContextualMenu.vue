<template>
  <Dropdown v-bind="props" class="contextual">
    <template #toggler>
      <slot name="toggler">
        <Button :disabled="props.disabled" even>
          <Icon src="/icons/more.svg" />
        </Button>
      </slot>
    </template>
    <article v-for="group, i in props.actions" :key="group.label ?? i" class="contextual__group">
      <em v-if="group.label" class="contextual__group-label">
        <slot name="group" :group="group.label">{{ group.label }}</slot>
      </em>
      <template v-for="action in group.actions" :key="action.label">
        <slot :action="action">
          <slot :name="action.id" :action="action">
            <Button
              v-bind="action.type ? { [action.type]: true } : {}"
              variant="flat"
              block
              @click.prevent="action.onClick(props.item)">
              <Icon v-if="action.icon" :src="action.icon" />
              {{ action.label ?? action.id }}
            </Button>
          </slot>
        </slot>
      </template>
    </article>
  </Dropdown>
</template>

<script setup lang="ts" generic="T, K extends string">
import Dropdown, { type DropdownProps } from './Dropdown.vue';
import Button from './Button.vue';
import Icon from './Icon.vue';
import type { MaybeReadonly } from '/@/types';

export type ContextualMenuAction<T, K extends string> = {
  id: K,
  label?: string;
  icon?: string;
  type?: string;
  onClick: (item?: T) => void;
};

export type ContextualMenuActions<T, K extends string> = {
  label?: string;
  actions: ContextualMenuAction<T, K>[];
};

export type ContextualMenuProps<T, K extends string> = {
  item?: MaybeReadonly<T>;
  actions: ContextualMenuActions<T, K>[];
} & DropdownProps;

const props = defineProps<ContextualMenuProps<T, K>>();

defineSlots<{
  toggler?: () => void;
  group?: (props: { group: string }) => void;
  default?: (props: { action: ContextualMenuAction<T, K> }) => void;
} & Record<K, (props: { action: ContextualMenuAction<T, K> }) => void>>();
</script>

<style lang="scss" scoped>
@import '../styles';

.contextual {
  // stylelint-disable-next-line selector-pseudo-class-no-unknown
  :deep(.dropdown__container) { @extend %panel; }

  &__group {
    padding: 0.25rem;

    & + & { border-top: 1px solid #8884; }

    &-label {
      color: #888a;
      font-size: 0.8em;
      display: block;
      margin: 0.5rem 0.5rem 0.25rem;
      font-style: normal;
    }

    .btn {
      text-align: left;
      justify-content: left;
      white-space: nowrap;
      margin: 0;

      &:hover { background: color-mix(in srgb, var(--color) 5%, transparent); }
    
      .keystrokes { margin: 0 calc(-0.5 * var(--spacing)) 0 auto; }
    }
  }
}
</style>

