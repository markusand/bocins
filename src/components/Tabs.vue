<template>
  <div class="tabs">
    <header class="tabs__header">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="classes(tab)"
        :disabled="tab.disabled"
        type="button"
        @click.prevent="activate(tab.id)">
        <slot v-bind="tab" :name="tab.id">
          <slot v-bind="tab" name="tab">
            {{ tab.label ?? tab.id }}
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
  tab?: (props: { id: string, label?: string, active: boolean }) => void
} & { [key: string]: (props: { label?: string, active: boolean }) => void }>();

const tabs = computed(() => slots.default()
  // @ts-expect-error TS does not know __name property in type
  .filter(node => node.type.__name === 'TabView')
  .map(({ props }) => {
    const active = props?.id === activePanel.value;
    const disabled = props?.disabled != null && props.disabled !== false;
    return { ...props, active, disabled };
  }) as (Tab & { active: boolean })[]);

const classes = (tab: Tab & { active: boolean }) => ['tabs__tab', {
  'tabs__tab--active': tab.active,
  'is-disabled': tab.disabled,
}];

onMounted(() => !activePanel.value && activate(tabs.value[0]?.id));
</script>

<style scoped>

.tabs {
  --spacing: var(--tabs-spacing, 0.75rem);

  .tabs__header {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    border-bottom: 1px solid var(--tabs-color-border, var(--color-border, #8883));
    margin-bottom: var(--spacing);
    align-items: flex-end;
  }
  
  .tabs__tab {
    --color-text: color-mix(in srgb, currentcolor 75%, transparent);
  
    all: unset;
    padding: var(--spacing);
    color: var(--color-text);
    margin-bottom: -1px;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
  
    &:hover { --color-text: var(--color-accent, #333) }
  }
  
  .tabs__tab--active,
  .tabs__tab:focus {
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
}
</style>
