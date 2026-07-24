import { describe, it, expect } from 'vitest';
import { clamp, percent } from './numbers';

describe('number utilities', () => {
  it('should clamp values within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it('should convert a value to a percentage within a range', () => {
    expect(percent(0.5)).toBe(50);
    expect(percent(1, 0, 5)).toBe(20);
    expect(percent(10, 0, 5)).toBe(200);
  });
});
