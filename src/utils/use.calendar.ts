import { ref, computed, watch, type Ref } from 'vue';
import { weekStart, weekEnd, monthStart, monthEnd, fromRange } from '/@/utils';

type SelectedDate = Date | undefined | [Date | undefined, Date | undefined];

export const useCalendarCursor = (selected: Ref<SelectedDate>, startSunday?: Ref<boolean>) => {
  const cursor = ref<Date>(new Date());

  watch(selected, (date: SelectedDate | undefined) => {
    cursor.value = new Date(Array.isArray(date) ? date[1] ?? Date.now() : date ?? Date.now());
  }, { immediate: true });

  const month = computed({
    get: () => cursor.value.getMonth(),
    set: value => cursor.value = new Date(cursor.value.setMonth(value)),
  });

  const year = computed({
    get: () => cursor.value.getFullYear(),
    set: value => cursor.value = new Date(cursor.value.setFullYear(value)),
  });

  const days = computed(() => {
    const start = weekStart(monthStart(cursor.value), startSunday?.value);
    const end = weekEnd(monthEnd(cursor.value), startSunday?.value);
    return fromRange(start, end);
  });

  return { cursor, days, month, year };
};
