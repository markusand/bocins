<template>
  <label
    :class="['b-dropzone', { disabled, block }]"
    :style="`
      width:${+(props.width || 10)}${isNumber(props.width) ? 'rem' : ''};
      height:${+(props.height || 10)}${isNumber(props.height) ? 'rem' : ''};
    `"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop">
    <input
      type="file"
      :multiple="props.multiple"
      :accept="props.accept"
      :capture="props.capture"
      :disabled="props.disabled"
      @change="onChange">
    <slot v-if="!files?.length">
      <div class="b-dropzone__label">
        <Icon src="/icons/file-upload.svg" />
        <p>{{ props.dropText }}</p>
      </div>
    </slot>
    <ul v-else class="b-dropzone__list">
      <li v-for="file in files" :key="file.name">
        <slot name="file" :file="file" :remove="() => remove(file)">
          <div class="b-dropzone__file">
            <button @click="remove(file)">&times;</button>
            {{ file.name }}
          </div>
        </slot>
      </li>
    </ul>
  </label>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { isNumber } from '/@/utils/number';
import Icon from '../Icon.vue';

type Props = {
  modelValue?: File[];
  accept?: string;
  capture?: boolean | 'user' | 'environment';
  multiple?: boolean;
  maxSize?: number | string;
  width?: string | number;
  height?: string | number;
  dropText?: string;
  disabled?: boolean;
  block?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  accept: undefined,
  capture: undefined,
  maxSize: Infinity,
  width: 10,
  height: 7.5,
  dropText: 'Select or drop here',
});

const emit = defineEmits<{
  'update:modelValue': [value: File[] | undefined],
  dragover: [ev: DragEvent],
  dragleave: [ev: DragEvent],
  drop: [ev: { event: DragEvent, files: File[] }],
  change: [ev: { files: File[] }],
  remove: [ev: { file: File, files: File[] }],
  error: [ev: { error: Error; file?: File }],
}>();

defineSlots<{
  default?: (props: object) => void;
  file?: (props: { file: File, remove: () => void }) => void
}>();

const files = ref(props.modelValue || []);

watch(() => props.modelValue, value => files.value = value || []);

watch(files, value => {
  emit('update:modelValue', value);
  emit('change', { files: files.value });
});

const checkFiles = (newFiles: FileList | null | undefined) => {
  if (!newFiles || props.disabled) return;
  if (!props.multiple && newFiles.length > 1) {
    emit('error', { error: new Error('UPLOAD_MULTIPLE_ERROR') });
    return;
  }
  files.value = Array.from(newFiles).filter(file => {
    const { type, name, size } = file;
    const { accept, maxSize } = props;
    const extension = name.slice((Math.max(0, name.lastIndexOf('.')) || Infinity));
    const sizeError = size > +maxSize * 1000 ? new Error('UPLOAD_SIZE_ERROR') : undefined;
    const formatError = accept?.split(',').every(acc => !type.match(acc) && extension !== acc)
      ? new Error('UPLOAD_FORMAT_ERROR')
      : undefined;
    const error = sizeError || formatError;
    if (error) emit('error', { error, file });
    return !sizeError && !formatError;
  });
};

const onDragOver = (event: DragEvent) => {
  (event.target as HTMLElement).classList.add('dropzone--active');
  emit('dragover', event);
};

const onDragLeave = (event: DragEvent) => {
  (event.target as HTMLElement).classList.remove('dropzone--active');
  emit('dragleave', event);
};

const onDrop = (event: DragEvent) => {
  checkFiles(event.dataTransfer?.files);
  emit('drop', { event, files: files.value });
};

const onChange = (event: Event) => {
  checkFiles((event.target as HTMLInputElement).files);
};

const remove = (file: File) => {
  files.value = files.value.filter(({ name }) => name !== file.name);
  emit('change', { files: files.value });
  emit('remove', { file, files: files.value });
};
</script>
