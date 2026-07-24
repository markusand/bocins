import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Toggler from './Toggler.vue';

describe('Toggler', () => {
  it('should render checkbox by default', () => {
    render(Toggler, { props: { modelValue: false, label: 'Accept' } });
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('Accept')).toBeInTheDocument();
  });

  it('should render radio when group is set', () => {
    render(Toggler, { props: { modelValue: 'a', group: 'opts', value: 'a', label: 'A' } });
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('should mark as aria-invalid', () => {
    render(Toggler, {
      props: { modelValue: false, invalid: true, label: 'X' },
    });
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('should disable the input', () => {
    render(Toggler, { props: { modelValue: false, disabled: true, label: 'X' } });
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
});
