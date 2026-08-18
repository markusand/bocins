import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import Carousel from './Carousel.vue';

const items = ['A', 'B', 'C'];

describe('Carousel', () => {
  it('should render slides from items', () => {
    render(Carousel, {
      props: { items },
      slots: { default: ({ item }: { item: unknown }) => `Slide:${item}` },
    });
    expect(screen.getByText('Slide:A')).toBeInTheDocument();
    expect(screen.getByText('Slide:B')).toBeInTheDocument();
    expect(screen.getByText('Slide:C')).toBeInTheDocument();
  });

  it('should not render controls by default', () => {
    render(Carousel, {
      props: { items },
      slots: { default: ({ item }: { item: unknown }) => `${item}` },
    });
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('should render control buttons when controls prop is set', () => {
    render(Carousel, {
      props: { items, controls: 'bottom' },
      slots: { default: ({ item }: { item: unknown }) => `${item}` },
    });
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByLabelText('Slide 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Slide 3')).toBeInTheDocument();
  });

  it('should change active on control click', async () => {
    render(Carousel, {
      props: { items, controls: 'bottom' },
      slots: { default: ({ item }: { item: unknown }) => `${item}` },
    });
    expect(screen.getByLabelText('Slide 1')).toHaveAttribute('aria-current', 'true');
    expect(screen.getByLabelText('Slide 2')).not.toHaveAttribute('aria-current');
    await userEvent.click(screen.getByLabelText('Slide 2'));
    expect(screen.getByLabelText('Slide 1')).not.toHaveAttribute('aria-current');
    expect(screen.getByLabelText('Slide 2')).toHaveAttribute('aria-current', 'true');
  });
});
