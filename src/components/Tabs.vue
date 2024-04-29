
<template>
  <div class="tabs">
    <header>
      <button
        v-for="{ id, label, active, disabled } in tabs"
        :key="id"
        :disabled="disabled"
        :class="{ active }"
        type="button"
        @click.prevent="activate(id)">
        <slot v-bind="{ label, active }" :name="id">
          <slot v-bind="{ id, label, active }" name="tab">
            {{ label ?? id }}
          </slot>
        </slot>
      </button>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, onMounted, type VNode } from 'vue';
import type { Tab } from './TabView.vue';

const activePanel = defineModel<string>();
const activate = (panel: string) => activePanel.value = panel;
provide('active', activePanel);

const slots = defineSlots<{
  default: () => VNode[],
  tab: (props: { id: string, label?: string, active: boolean }) => void
} & { [key: string]: (props: { label?: string, active: boolean }) => void }>();

const tabs = computed(() => slots.default()
  // @ts-expect-error TS does not know __name property in type
  .filter(node => node.type.__name === 'TabView')
  .map(({ props }) => {
    return { ...props, active: props?.id === activePanel.value };
  }) as (Tab & { active: boolean })[]);

onMounted(() => !activePanel.value && activate(tabs.value[0]?.id));
</script>

<style lang="scss" scoped>
@import '../styles';

.tabs {
  --spacing: 0.75rem;

  & > header {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    border-bottom: 1px solid #8883;
    margin-bottom: var(--spacing);
    gap: calc(2 * var(--spacing));
    align-items: flex-end;

    button {
      --color-text: color-mix(in srgb, currentcolor 75%, transparent);
  
      all: unset;
      padding: var(--spacing) 0;
      color: var(--color-text);
      margin-bottom: -1px;
      position: relative;
      cursor: pointer;
      white-space: nowrap;
      
      &:hover { --color-text: var(--color-accent, #333); }

      &.active {
        --color-text: var(--color-accent, #333);

        &::after {
          content: '';
          background: currentcolor;
          height: 2px;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }

      &:disabled { @extend %disabled; }
    }
  }
}
</style>
