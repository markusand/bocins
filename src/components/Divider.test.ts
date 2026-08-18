import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Divider from './Divider.vue';

describe('Divider', () => {
  it('should render as separator', () => {
    render(Divider);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('should render label text', () => {
    render(Divider, { props: { label: 'OR' } });
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('should render slot content', () => {
    render(Divider, { slots: { default: 'Section' } });
    expect(screen.getByText('Section')).toBeInTheDocument();
  });
});
