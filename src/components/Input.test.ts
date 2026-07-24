import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Input from './Input.vue';

describe('Input', () => {
  it('should render with placeholder', () => {
    render(Input, {
      props: { modelValue: '', placeholder: 'Type here' },
    });
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });

  it('should be disabled', () => {
    render(Input, {
      props: { modelValue: '', disabled: true, placeholder: 'x' },
    });
    expect(screen.getByPlaceholderText('x')).toBeDisabled();
  });

  it('should mark input as aria-invalid', () => {
    render(Input, {
      props: { modelValue: '', invalid: true, placeholder: 'x' },
    });
    expect(screen.getByPlaceholderText('x')).toHaveAttribute('aria-invalid', 'true');
  });

  it('should show prefix and suffix text', () => {
    // Prefix/suffix render as raw text nodes, not wrapped elements
    const { container } = render(Input, {
      props: { modelValue: '', prefix: '$', suffix: 'USD' },
    });
    expect(container.textContent).toContain('$');
    expect(container.textContent).toContain('USD');
  });
});
