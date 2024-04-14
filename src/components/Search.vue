<template>
  <Input
    v-model="search"
    v-bind="props"
    class="search"
    type="search">
    <template #prefix>
      <Icon src="/icons/search.svg" />
    </template>
  </Input>
</template>

<script setup lang="ts">
import Input, { type InputProps } from './Input.vue';
import Icon from './Icon.vue';

export type SearchProps = Omit<InputProps, 'type' | 'prefix'>;

const props = withDefaults(defineProps<SearchProps>(), {
  placeholder: 'Search...',
});

const search = defineModel<string>({ required: true });
</script>

<style lang="scss" scoped>
.search .icon { --size: 1em; }
</style>
