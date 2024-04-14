<template>
  <label :class="['file-drop', modifiers]" :style="size" v-on="onDragDrop">
    <input v-bind="input" type="file" @change="onChange">
    <slot v-if="!files.length">
      <Icon src="/icons/plus.svg" size="medium" />
      <em>{{ props.label || 'Click or Drop files' }}</em>
    </slot>
    <slot v-else name="files" :files="files" :remove="remove">
      <ul class="file-drop__list">
        <li v-for="file in files" :key="file.name">
          <slot name="file" :file="file" :remove="remove">
            <span class="file-name">{{ file.name }}</span>
            <button @click="remove(file)">&times;</button>
          </slot>
        </li>
      </ul>
    </slot>
  </label>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { toWidth, toHeight, useFiles } from '/@/utils';
import Icon from './Icon.vue';

type FileDropProps = {
  modelValue?: File[];
  formats?: string;
  capture?: boolean | 'user' | 'environment';
  multiple?: boolean | number;
  maxSize?: number | string;
  width?: string | number;
  height?: string | number;
  label?: string;
  disabled?: boolean;
  block?: boolean;
};

const props = defineProps<FileDropProps>();

const emit = defineEmits<{
  'update:modelValue': [files: File[]],
  dragover: [event: DragEvent],
  dragleave: [event: DragEvent],
  drop: [files: File[], event: DragEvent],
  change: [files: File[]],
  remove: [file: File],
  error: [error: Error, file?: File],
}>();

defineSlots<{
  default?: () => void;
  files: (props: { files: File[], remove: (file: File) => void }) => void,
  file?: (props: { file: File, remove: (file: File) => void }) => void
}>();

const state = ref<'hover' | 'invalid'>();

const onError = (code: string, file?: File) => {
  state.value = 'invalid';
  setTimeout(() => { state.value = undefined; }, 1000);
  emit('error', new Error(code), file);
};
const { files, addFiles, removeFile } = useFiles(props, onError);
watch(files, value => emit('update:modelValue', value));

const size = computed(() => ({
  ...toWidth(props.width ?? 10),
  ...toHeight(props.height ?? 7),
}));

const modifiers = computed(() => {
  const { block, disabled } = props;
  return {
    [`file-drop--${state.value}`]: state.value,
    disabled,
    block,
  };
});

const input = computed(() => {
  const { multiple, formats: accept, capture, disabled } = props;
  return { multiple: !!multiple, accept, capture, disabled };
});

const onDragDrop = {
  dragover: (event: DragEvent) => {
    event.preventDefault();
    if (props.disabled) return;
    state.value = 'hover';
    emit('dragover', event);
  },
  dragleave: (event: DragEvent) => {
    event.preventDefault();
    if (props.disabled) return;
    state.value = undefined;
    emit('dragleave', event);
  },
  drop: (event: DragEvent) => {
    event.preventDefault();
    if (props.disabled) return;
    state.value = undefined;
    addFiles(event.dataTransfer?.files);
    emit('drop', files.value, event);
    emit('change', files.value);
  },
};

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  addFiles(target.files ?? undefined);
  emit('change', files.value);
};

const remove = (file: File) => {
  removeFile(file);
  emit('change', files.value);
  emit('remove', file);
};
</script>

<style lang="scss" scoped>
@import '../styles';

.file-drop {
  --color: #888;
  --color-bg: color-mix(in srgb, var(--color) 5%, transparent);
  --color-border: color-mix(in srgb, var(--color) 50%, transparent);
  --color-text: var(--color);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--color-bg);
  border: var(--border-width, 1px) dashed var(--color-border);
  color: var(--color-text);
  border-radius: 0.25rem;
  box-sizing: border-box;
  cursor: pointer;

  &--hover { --color: var(--color-accent, #333); }
  &--invalid { --color: var(--color-error, red); }

  & > em {
    font-style: normal;
    font-size: 0.9em;
    padding: 0 1rem;
  }

  input { display: none; }

  &__list {
    margin: 0;
    padding: 0.5rem 1rem;
    list-style: none;
    max-height: 100%;
    max-width: 100%;
    overflow: auto;
    box-sizing: border-box;

    li {
      display: flex;
      width: 100%;
      gap: 0.5rem;

      .file-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      
        & + button {
          all: unset;
          color: var(--color-alert, red);
          cursor: pointer;
        }
      }
    }
  }

  &.disabled { @extend %disabled; }
}
</style>
