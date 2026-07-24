import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import ToggleButton from './ToggleButton.vue';

describe('ToggleButton', () => {
  it('should render as a button', () => {
    render(ToggleButton, {
      props: { modelValue: undefined, value: 'a' },
      slots: { default: 'Toggle' },
    });
    expect(screen.getByRole('button', { name: 'Toggle' })).toBeInTheDocument();
  });

  it('should show pressed state when active', () => {
    render(ToggleButton, {
      props: { modelValue: 'a', value: 'a' },
      slots: { default: 'Active' },
    });
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('should show unpressed state when inactive', () => {
    render(ToggleButton, {
      props: { modelValue: 'b', value: 'a' },
      slots: { default: 'Inactive' },
    });
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('should toggle boolean model on click', async () => {
    const { emitted } = render(ToggleButton, {
      props: { modelValue: false },
      slots: { default: 'Bool' },
    });
    await userEvent.click(screen.getByRole('button'));
    expect(emitted()['update:modelValue'][0]).toEqual([true]);
  });
});
