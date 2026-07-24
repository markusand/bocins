import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Switch from './Switch.vue';

describe('Switch', () => {
  it('should render with switch role', () => {
    render(Switch, { props: { modelValue: false } });
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('should render as checkbox when model is boolean', () => {
    render(Switch, { props: { modelValue: false } });
    expect(screen.getByRole('switch')).toHaveAttribute('type', 'checkbox');
  });

  it('should be disabled', () => {
    render(Switch, { props: { modelValue: false, disabled: true } });
    expect(screen.getByRole('switch')).toBeDisabled();
  });
});
