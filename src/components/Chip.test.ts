import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import Chip from './Chip.vue';

describe('Chip', () => {
  it('should render text prop', () => {
    render(Chip, { props: { text: 'Tag' } });
    expect(screen.getByText('Tag')).toBeInTheDocument();
  });

  it('should render default slot', () => {
    render(Chip, { slots: { default: 'Custom' } });
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('should show action button and call action on click', async () => {
    const action = vi.fn();
    render(Chip, { props: { text: 'Tag', action } });
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('×');
    await userEvent.click(button);
    expect(action).toHaveBeenCalledOnce();
  });

  it('should show action button slot', async () => {
    const action = vi.fn();
    render(Chip, {
      props: { text: 'Tag', action },
      slots: { action: 'Close' },
    });
    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});
