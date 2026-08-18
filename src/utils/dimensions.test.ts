import { describe, it, expect } from 'vitest';
import { toWidth, toHeight } from './dimensions';

describe('dimensions utilities', () => {
  it('should convert a number to width', () => {
    expect(toWidth(5)).toStrictEqual({ width: '5rem', flex: '0 0 5rem' });
  });

  it('should convert a numeric string to width', () => {
    expect(toWidth('5')).toStrictEqual({ width: '5rem', flex: '0 0 5rem' });
  });

  it('should preserve explicit units in width', () => {
    expect(toWidth('5px')).toStrictEqual({ width: '5px', flex: '0 0 5px' });
  });

  it('should convert a number to height', () => {
    expect(toHeight(5)).toStrictEqual({ height: '5rem' });
  });

  it('should convert a numeric string to height', () => {
    expect(toHeight('5')).toStrictEqual({ height: '5rem' });
  });

  it('should preserve explicit units in height', () => {
    expect(toHeight('5px')).toStrictEqual({ height: '5px' });
  });
});
