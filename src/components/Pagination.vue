<template>
  <div class="pagination">
    <Button v-if="props.controls" v-bind="prev" @click="change(-1)">
      <Icon src="/@/assets/icons/chevron-right.svg" />
    </Button>
    <!-- First page always visible -->
    <slot :page="1" :go-to="goTo">
      <ToggleButton v-model="selected" v-bind="button(1)">
        1
      </ToggleButton>
    </slot>
    <!-- Separator if first page not in range -->
    <em v-if="range.base > 1">...</em>
    <!-- Range pages -->
    <slot v-for="page in range.length" :page="range.base + page" :go-to="goTo">
      <ToggleButton v-model="selected" v-bind="button(range.base + page)">
        {{ range.base + page }}
      </ToggleButton>
    </slot>
    <!-- Separator if last page not in range -->
    <em v-if="range.base + range.length < props.pages - 1">...</em>
    <!-- Last page always visible -->
    <slot :page="props.pages" :go-to="goTo">
      <ToggleButton v-model="selected" v-bind="button(props.pages)">
        {{ props.pages }}
      </ToggleButton>
    </slot>
    <Button v-if="props.controls" v-bind="next" @click="change(1)">
      <Icon src="/@/assets/icons/chevron-right.svg" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from './Button.vue';
import Icon from './Icon.vue';
import ToggleButton from './ToggleButton.vue';

export type PaginationProps = {
  pages: number;
  truncate?: number;
  disabled?: boolean;
  controls?: boolean;
};

const props = withDefaults(defineProps<PaginationProps>(), {
  truncate: 5,
});

const selected = defineModel<number>({ default: 0 });

defineSlots<{
  default: (props: { page: number, goTo: (page: number) => void }) => void;
}>();

const range = computed(() => {
  const { pages, truncate } = props;
  const length = Math.min(truncate, pages);
  const max = Math.max(1, pages - length - 1);
  const min = Math.max(1, selected.value - Math.floor(length / 2));
  const base = Math.min(max, min);
  return { base, length };
});

const button = (page: number) => ({
  value: page - 1,
  variant: page - 1 === selected.value ? undefined : 'flat' as const,
  even: page > 9,
  disabled: props.disabled,
  required: true,
});

const prev = computed(() => ({
  class: 'prev',
  disabled: props.disabled || selected.value === 0,
  variant: 'flat' as const,
  even: true,
}));

const next = computed(() => ({
  class: 'next',
  disabled: props.disabled || selected.value === props.pages - 1,
  variant: 'flat' as const,
  even: true,
}));

const goTo = (page: number) => {
  selected.value = Math.min(props.pages, Math.max(1, page)) - 1 || 0;
};

const change = (num: number) => goTo(selected.value + num + 1);
</script>

<style lang="scss" scoped>
@import '../styles';

.pagination {
  display: inline-flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;

  em {
    display: block;
    padding-right: 0.125rem;
    color: #8888;
  }

  .input {
    @extend %input;
  
    input {
      all: unset;
      appearance: textfield;
    }
  }

  .btn:not(.btn--flat) { --color: var(--color-accent, #333); }

  .prev .icon { transform: rotate(180deg); }
}
</style>
