import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Progress from './Progress.vue';

describe('Progress', () => {
  it('should render with progressbar role', () => {
    render(Progress, { props: { value: 50 } });
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '50');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('should be indeterminate when value is undefined', () => {
    render(Progress);
    const bar = screen.getByRole('progressbar');
    expect(bar).not.toHaveAttribute('aria-valuenow');
  });

  it('should respect custom max', () => {
    render(Progress, { props: { value: 5, max: 10 } });
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '10');
  });

  it('should apply ring class', () => {
    render(Progress, { props: { value: 75, ring: true } });
    expect(screen.getByRole('progressbar').classList).toContain('progress--ring');
  });
});
