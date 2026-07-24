import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Collapser from './Collapser.vue';

describe('Collapser', () => {
  it('should render details with title in summary', () => {
    render(Collapser, {
      props: { title: 'Section' },
      slots: { default: 'Content' },
    });
    expect(screen.getByText('Section')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should be open when prop is true', () => {
    render(Collapser, {
      props: { title: 'Open', open: true },
      slots: { default: 'Body' },
    });
    expect(screen.getByRole('group')).toHaveAttribute('open');
  });

  it('should pass open state to toggler slot', () => {
    render(Collapser, {
      props: { open: true },
      slots: {
        toggler: ({ open }: { open: boolean }) => `open:${open}`,
        default: 'Body',
      },
    });
    expect(screen.getByText('open:true')).toBeInTheDocument();
  });

  it('should apply disabled class', () => {
    // <details> has no native disabled; CSS class is the mechanism here
    const { container } = render(Collapser, {
      props: { title: 'Disabled', disabled: true },
      slots: { default: 'Body' },
    });
    expect(container.querySelector('.is-disabled')).toBeInTheDocument();
  });
});
