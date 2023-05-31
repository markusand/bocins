<template>
  <div ref="dropdown" :class="['b-dropdown', { disabled, top, right, block }]" tabindex="0">
    <slot name="toggler" :close="close">
      {{ props.label }}
      <Icon src="/icons/chevron-down.svg" class="b-dropdown__chevron" />
    </slot>
    <div v-if="!disabled" class="b-dropdown__container">
      <slot :close="close" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Icon from './Icon.vue';

type Props = {
  disabled?: boolean;
  right?: boolean;
  top?: boolean;
  label?: string;
  block?: boolean; 
};

const props = withDefaults(defineProps<Props>(), {
  label: 'Dropdown',
});

defineSlots<{
  default?: (props: { close: () => void }) => any;
  toggler?: (props: { close: () => void }) => any;
}>();

const dropdown = ref<HTMLDivElement | null>(null);

const close = () => {
  const focused = dropdown.value?.querySelector(':focus') as HTMLElement;
  focused?.blur();
};
</script>
