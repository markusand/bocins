export type Day = Date | string | number;

type MaybeDay = Day | undefined;

export const asDay = (day: Day): Date => {
  const date = new Date(day);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const isEqual = (day: Day, other: MaybeDay): boolean => {
  if (!other) return false;
  return asDay(day).getTime() === asDay(other).getTime();
};

export const isBefore = (day: Day, other: MaybeDay): boolean => {
  if (!other) return false;
  return asDay(day).getTime() < asDay(other).getTime();
};

export const isAfter = (day: Day, other: MaybeDay): boolean => {
  if (!other) return false;
  return asDay(day).getTime() > asDay(other).getTime();
};

export const isBetween = (day: Day, start: MaybeDay, end: MaybeDay, inclusive = false): boolean => {
  const isLimits = inclusive && (isEqual(day, start) || isEqual(day, end));
  return isLimits || (isAfter(day, start) && isBefore(day, end));
};

export const addDays = (day: Day, days: number) => {
  const date = new Date(day);
  date.setDate(date.getDate() + days);
  return date;
};

export const addYears = (day: Day, years: number) => {
  const date = new Date(day);
  date.setFullYear(date.getFullYear() + years);
  return date;
};

export const monthStart = (day: Day) => {
  const date = new Date(day);
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1);
};

export const monthEnd = (day: Day) => {
  const date = new Date(day);
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0);
};

export const weekStart = (day: Day, startOnSunday = false) => {
  const start = new Date(day);
  const backward = ((7 + start.getDay() - 1 + Number(startOnSunday)) % 7);
  start.setDate(start.getDate() - backward);
  return asDay(start);
};

export const weekEnd = (day: Day, startOnSunday = false) => {
  const end = new Date(day);
  const forward = ((7 - end.getDay() - Number(startOnSunday)) % 7);
  end.setDate(end.getDate() + forward);
  return asDay(end);
};

export const fromRange = (start: Day, end: Day) => {
  const DAY_MS = 24 * 60 * 60 * 1000;
  const first = asDay(start);
  const period = Math.round((asDay(end).getTime() - first.getTime()) / DAY_MS);
  return [...Array(period + 1)].map((_, i) => addDays(first, i));
};

export const CalendarNames = {
  WEEKDAYS: (locale = 'en', onSunday = false) => [...Array(7)].map((_, i) => {
    const day = new Date(Date.UTC(2022, 1, i - Number(onSunday))); // 2022-02-01 is Tuesday
    return day.toLocaleDateString(locale, { weekday: 'short' });
  }),
  MONTHS: (locale = 'en') => [...Array(12)].map((_, i) => {
    const date = new Date(1970, i, 1);
    return date.toLocaleString(locale, { month: 'long' });
  }),
};
