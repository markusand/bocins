<template>
  <button
    :class="['b-button', modifiers]"
    :style="style"
    :type="type"
    :disabled="props.disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isNumber } from '/@/utils/number';

const props = defineProps<{
  // Modifiers
  primary?: boolean;
  alert?: boolean;
  outline?: boolean;
  flat?: boolean;
  block?: boolean;
  loading?: boolean;
  // State
  disabled?: boolean;
  // Button type shorthands
  submit?: boolean;
  reset?: boolean;
  // Size
  size?: number | string;
}>();

const type = computed(() => props.submit ? 'submit' : props.reset ? 'reset' : 'button');
const style = computed(() => `--width:${props.size}${isNumber(props.size) ? 'rem' : ''}`);
const modifiers = computed(() => {
  const { primary, alert, outline, flat, loading, block } = props;
  return { primary, alert, outline, flat, loading, block };
});
</script>
