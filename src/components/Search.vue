<template>
  <Input
    v-model="search"
    v-bind="props"
    class="search"
    type="search">
    <template #prefix>
      <Icon src="search.svg" />
    </template>
  </Input>
</template>

<script setup lang="ts">
import Input, { type Props as InputProps } from './Input.vue';
import Icon from './Icon.vue';

export type Props = Omit<InputProps, 'type' | 'prefix'>;

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
});

const search = defineModel<string>({ required: true });
</script>

<style scoped>
.search .icon { --size: 1em; }
</style>
