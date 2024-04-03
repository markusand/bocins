import { ref, computed, unref, type MaybeRef } from 'vue';

export type Searcher<T> = (item: T) => string;

const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export const useSearcher = <T>(searcher: MaybeRef<Searcher<T> | undefined>) => {
  const searchBy = ref('');

  /* eslint-disable @typescript-eslint/naming-convention */
  const search = (items: MaybeRef<T[]>) => computed(() => {
    const _searcher = unref(searcher);
    const _items = unref(items);
    const needle = normalize(searchBy.value);
    return _searcher
      ? _items.filter(item => normalize(_searcher(item)).includes(needle))
      : _items;
  });

  return { searchBy, search };
};
