import { ref, unref, computed, type MaybeRef } from 'vue';

type FileOptions = {
  maxSize?: number | string;
  formats?: string;
  multiple?: boolean | number;
};

type ErrorHandler = (code: string, file?: File) => void;

export const useFiles = (options: MaybeRef<FileOptions>, onError: ErrorHandler) => {
  const files = ref<File[]>([]);

  const remaining = computed(() => {
    const { multiple } = unref(options);
    const max = typeof multiple === 'number' ? multiple : multiple ? Infinity : 1;
    return max - files.value.length;
  });

  const hasValidExtension = (file: File) => {
    const { formats } = unref(options);
    const extension = file.name.split('.').pop();
    return formats?.split(',')
      .some(format => file.type.match(format) || extension === format) ?? true;
  }; 
  
  const addFiles = (fileList: FileList | undefined) => {
    if (!fileList) return onError('FILES_ERROR');
    const { maxSize = Infinity } = unref(options);
    if (remaining.value < fileList.length) return onError('FILES_AMOUNT_ERROR');
    files.value = [
      ...files.value,
      ...Array.from(fileList).filter(file => {
        if (file.size > +maxSize * 1000) return onError('SIZE_ERROR', file);
        if (!hasValidExtension(file)) return onError('EXTENSION_ERROR', file);
        return true;
      }),
    ];
  };

  const removeFile = (file: File) => {
    files.value = files.value.filter(({ name }) => name !== file.name);
  };

  return { files, addFiles, removeFile };
};
