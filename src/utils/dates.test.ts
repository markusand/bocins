import { describe, it, expect } from 'vitest';
import {
  asDay, isEqual, isBefore, isAfter, isBetween, addDays, addYears,
  yearStart, yearEnd, monthStart, monthEnd, weekStart, weekEnd,
  fromRange, CalendarNames,
} from './dates';

describe('dimensions utilities', () => {
  it('should convert a Date to day', () => {
    const day = asDay(new Date(2000, 0, 1, 10, 15, 30));
    expect(day.getHours()).toBe(0);
    expect(day.getMinutes()).toBe(0);
    expect(day.getSeconds()).toBe(0);
  });

  it('should convert a string to day', () => {
    const day = asDay('2000-01-01T10:15:30.000Z');
    expect(day.getHours()).toBe(0);
    expect(day.getMinutes()).toBe(0);
    expect(day.getSeconds()).toBe(0);
  });

  it('should convert an epoch to day', () => {
    const day = asDay(946721730000);
    expect(day.getHours()).toBe(0);
    expect(day.getMinutes()).toBe(0);
    expect(day.getSeconds()).toBe(0);
  });

  it('should check day equality', () => {
    expect(isEqual('2000-01-01T10:15:30.000Z', 946721730000)).toBeTruthy();
    expect(isEqual(new Date(), undefined)).toBeFalsy();
  });

  it('should check day precedence', () => {
    expect(isBefore('2000-01-01', '2000-01-02')).toBeTruthy();
    expect(isBefore('2000-01-02', '2000-01-01')).toBeFalsy();
    expect(isBefore('2000-01-01', '2000-01-01')).toBeFalsy();
    expect(isBefore('2000-01-02', undefined)).toBeFalsy();
  });

  it('should check day posteriority', () => {
    expect(isAfter('2000-01-02', '2000-01-01')).toBeTruthy();
    expect(isAfter('2000-01-01', '2000-01-02')).toBeFalsy();
    expect(isAfter('2000-01-01', '2000-01-01')).toBeFalsy();
    expect(isAfter('2000-01-02', undefined)).toBeFalsy();
  });

  it('should check day containment', () => {
    expect(isBetween('2000-01-15', '2000-01-10', '2000-01-20')).toBeTruthy();
    expect(isBetween('2000-01-05', '2000-01-10', '2000-01-20')).toBeFalsy();
    expect(isBetween('2000-01-25', '2000-01-10', '2000-01-20')).toBeFalsy();
    expect(isBetween('2000-01-10', '2000-01-10', '2000-01-20')).toBeFalsy();
    expect(isBetween('2000-01-20', '2000-01-10', '2000-01-20')).toBeFalsy();
    expect(isBetween('2000-01-10', '2000-01-10', '2000-01-20', true)).toBeTruthy();
    expect(isBetween('2000-01-20', '2000-01-10', '2000-01-20', true)).toBeTruthy();
  });

  it('should add days', () => {
    const future = addDays('2000-01-10', 5);
    const past = addDays('2000-01-10', -5);
    expect(future.getDate()).toBe(15);
    expect(past.getDate()).toBe(5);
  });

  it('should add years', () => {
    const future = addYears('2000-01-10', 5);
    const past = addYears('2000-01-10', -5);
    expect(future.getFullYear()).toBe(2005);
    expect(past.getFullYear()).toBe(1995);
  });

  it('should find the first day of year', () => {
    const first = yearStart('2000-01-10');
    expect(first.getDate()).toBe(1);
    expect(first.getMonth()).toBe(0);
    expect(first.getFullYear()).toBe(2000);
  });

  it('should find the last day of year', () => {
    const last = yearEnd('2000-01-10');
    expect(last.getDate()).toBe(31);
    expect(last.getMonth()).toBe(11);
    expect(last.getFullYear()).toBe(2000);
  });

  it('should find the first day of month', () => {
    const first = monthStart('2000-01-10');
    expect(first.getDate()).toBe(1);
    expect(first.getMonth()).toBe(0);
    expect(first.getFullYear()).toBe(2000);
  });

  it('should find the last day of month', () => {
    const last = monthEnd('2000-01-10');
    expect(last.getDate()).toBe(31);
    expect(last.getMonth()).toBe(0);
    expect(last.getFullYear()).toBe(2000);
  });

  it('should find the first day of week', () => {
    const first = weekStart('2000-01-12');
    expect(first.getDate()).toBe(10);
    expect(first.getMonth()).toBe(0);
    expect(first.getFullYear()).toBe(2000);
  });

  it('should find the first day of week starting on Sunday', () => {
    const first = weekStart('2000-01-12', true);
    expect(first.getDate()).toBe(9);
    expect(first.getMonth()).toBe(0);
    expect(first.getFullYear()).toBe(2000);
  });

  it('should find the last day of week', () => {
    const last = weekEnd('2000-01-12');
    expect(last.getDate()).toBe(16);
    expect(last.getMonth()).toBe(0);
    expect(last.getFullYear()).toBe(2000);
  });

  it('should create an array of days', () => {
    const days = fromRange('2000-01-10', '2000-01-16');
    expect(days).toHaveLength(7);
    expect(days[0].getDate()).toBe(10);
    expect(days[3].getDate()).toBe(13);
    expect(days[6].getDate()).toBe(16);
  });

  it('should return weekday names', () => {
    expect(CalendarNames.WEEKDAYS('en')).toStrictEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    expect(CalendarNames.WEEKDAYS('en', true)).toStrictEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    expect(CalendarNames.WEEKDAYS('ca')).toStrictEqual(['dl.', 'dt.', 'dc.', 'dj.', 'dv.', 'ds.', 'dg.']);
  });

  it('should return month names', () => {
    expect(CalendarNames.MONTHS('en')).toStrictEqual(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    expect(CalendarNames.MONTHS('ca')).toStrictEqual(['gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre']);
  });
});
