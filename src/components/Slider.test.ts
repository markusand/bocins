import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Slider from './Slider.vue';

describe('Slider', () => {
  it('should render single range input', () => {
    render(Slider, { props: { modelValue: 50 } });
    expect(screen.getAllByRole('slider')).toHaveLength(2); // wrapper + input
  });

  it('should render two range inputs for range mode', () => {
    render(Slider, { props: { modelValue: [20, 80] } });
    expect(screen.getByLabelText('Minimum')).toBeInTheDocument();
    expect(screen.getByLabelText('Maximum')).toBeInTheDocument();
  });

  it('should mark as aria-disabled', () => {
    render(Slider, {
      props: { modelValue: 50, disabled: true },
    });
    const wrapper = screen.getAllByRole('slider')[0];
    expect(wrapper).toHaveAttribute('aria-disabled', 'true');
  });
});
