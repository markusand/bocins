import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import LongText from './LongText.vue';

describe('LongText', () => {
  it('should render textarea with placeholder', () => {
    render(LongText, {
      props: { modelValue: '', placeholder: 'Write...' },
    });
    expect(screen.getByPlaceholderText('Write...')).toBeInTheDocument();
  });

  it('should show character counter when maxLength is set', () => {
    render(LongText, {
      props: { modelValue: 'Hi', maxLength: 100 },
    });
    expect(screen.getByText('2 / 100')).toBeInTheDocument();
  });

  it('should not show counter without maxLength', () => {
    render(LongText, {
      props: { modelValue: '' },
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should apply disabled state', () => {
    render(LongText, {
      props: { modelValue: '', disabled: true, placeholder: 'x' },
    });
    expect(screen.getByPlaceholderText('x')).toBeDisabled();
  });
});
