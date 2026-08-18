import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Modal from './Modal.vue';

describe('Modal', () => {
  it('should render dialog element', () => {
    render(Modal, {
      props: { open: true },
      slots: { default: 'Dialog content' },
    });
    expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument();
  });

  it('should show close button when closeable', () => {
    render(Modal, {
      props: { open: true, closeable: true },
      slots: { default: 'Content' },
    });
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('should not show close button by default', () => {
    render(Modal, {
      props: { open: true },
      slots: { default: 'Content' },
    });
    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
  });
});
