import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Rating from './Rating.vue';

describe('Rating', () => {
  it('should render radiogroup with 5 radios by default', () => {
    render(Rating, { props: { modelValue: 0 } });
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('should render custom number of radios', () => {
    render(Rating, { props: { modelValue: 0, max: 3 } });
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('should disable all radios', () => {
    render(Rating, { props: { modelValue: 0, disabled: true } });
    screen.getAllByRole('radio').forEach(radio => {
      expect(radio).toBeDisabled();
    });
  });
});
