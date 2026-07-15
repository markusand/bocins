import { describe, it, expect } from 'vitest';
import { useSearcher } from './use.searcher';

const items = ['Apple', 'Banana', 'Cherry', 'Açaí'];

describe('useSearcher', () => {
  it('should return all items when searchBy is empty', () => {
    const { searchBy, search } = useSearcher((item: string) => item);
    const results = search(items);
    searchBy.value = '';
    expect(results.value).toEqual(items);
  });

  it('should filter items by search term', () => {
    const { searchBy, search } = useSearcher((item: string) => item);
    const results = search(items);
    searchBy.value = 'ban';
    expect(results.value).toEqual(['Banana']);
  });

  it('should be case insensitive', () => {
    const { searchBy, search } = useSearcher((item: string) => item);
    const results = search(items);
    searchBy.value = 'CHERRY';
    expect(results.value).toEqual(['Cherry']);
  });

  it('should normalize diacritics', () => {
    const { searchBy, search } = useSearcher((item: string) => item);
    const results = search(items);
    searchBy.value = 'acai';
    expect(results.value).toEqual(['Açaí']);
  });

  it('should return all items when searcher is undefined', () => {
    const { searchBy, search } = useSearcher<string>(undefined);
    const results = search(items);
    searchBy.value = 'ban';
    expect(results.value).toEqual(items);
  });

  it('should work with object items and custom searcher', () => {
    const users = [{ name: 'Alice' }, { name: 'Bob' }];
    const { searchBy, search } = useSearcher((u: { name: string }) => u.name);
    const results = search(users);
    searchBy.value = 'ali';
    expect(results.value).toEqual([{ name: 'Alice' }]);
  });
});
