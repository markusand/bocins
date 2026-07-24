import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Button from './Button.vue';

describe('Button', () => {
  it('should render button with default slot content', () => {
    render(Button, {
      slots: { default: 'Button' },
    });
    const button = screen.getByRole('button', { name: 'Button' });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should create a ghost button', () => {
    render(Button, {
      props: { ghost: true },
      slots: { default: 'Button' },
    });
    const button = screen.getByRole('button', { name: 'Button' });
    expect(button).toHaveClass('btn--ghost');
  });

  it('should create a flat button', () => {
    render(Button, {
      props: { flat: true },
      slots: { default: 'Button' },
    });
    const button = screen.getByRole('button', { name: 'Button' });
    expect(button).toHaveClass('btn--flat');
  });

  it('should create a small button', () => {
    render(Button, {
      props: { sm: true },
      slots: { default: 'Button' },
    });
    const button = screen.getByRole('button', { name: 'Button' });
    expect(button).toHaveClass('btn--small');
  });

  it('should create a large button', () => {
    render(Button, {
      props: { lg: true },
      slots: { default: 'Button' },
    });
    const button = screen.getByRole('button', { name: 'Button' });
    expect(button).toHaveClass('btn--large');
  });

  it('should create an even button', () => {
    render(Button, {
      props: { even: true },
      slots: { default: 'Button' },
    });
    const button = screen.getByRole('button', { name: 'Button' });
    expect(button).toHaveClass('btn--even');
  });

  it('should create a defined width button', () => {
    render(Button, {
      props: { width: 10 }, // 1rem = 16px
      slots: { default: 'Button' },
    });
    const button = screen.getByRole('button', { name: 'Button' });
    expect(button).toHaveStyle({ width: '160px' });
  });

  it('should create a button with string width', () => {
    render(Button, {
      props: { width: '50%' },
      slots: { default: 'Button' },
    });
    const button = screen.getByRole('button', { name: 'Button' });
    expect(button).toHaveStyle({ width: '50%' });
  });

  it('should create a full width button', () => {
    render(Button, {
      props: { block: true },
      slots: { default: 'Button' },
    });
    const button = screen.getByRole('button', { name: 'Button' });
    expect(button).toHaveClass('is-block');
  });

  it('should create a disabled button', () => {
    render(Button, {
      props: { disabled: true },
      slots: { default: 'Button' },
    });
    const button = screen.getByRole('button', { name: 'Button' });
    expect(button).toBeDisabled();
  });
});
