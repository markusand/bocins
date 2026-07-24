import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Pagination from './Pagination.vue';

describe('Pagination', () => {
  it('should render navigation with page buttons', () => {
    render(Pagination, { props: { pages: 5, modelValue: 0 } });
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    // First and last page always visible
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should render prev/next controls when enabled', () => {
    render(Pagination, { props: { pages: 5, modelValue: 2, controls: true } });
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
  });

  it('should disable prev on first page', () => {
    render(Pagination, { props: { pages: 5, modelValue: 0, controls: true } });
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('should disable next on last page', () => {
    render(Pagination, { props: { pages: 5, modelValue: 4, controls: true } });
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('should truncate pages and show separators', () => {
    render(Pagination, { props: { pages: 10, modelValue: 4, truncate: 3 } });
    // First and last always visible, 3 middle pages, 2 separators
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getAllByText('···')).toHaveLength(2);
    // Total buttons: 1 + 3 + 1 = 5
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('should not show leading separator when near start', () => {
    render(Pagination, { props: { pages: 10, modelValue: 0, truncate: 3 } });
    // Near start: no leading separator, only trailing
    expect(screen.getAllByText('···')).toHaveLength(1);
  });

  it('should not show trailing separator when near end', () => {
    render(Pagination, { props: { pages: 10, modelValue: 9, truncate: 3 } });
    // Near end: no trailing separator, only leading
    expect(screen.getAllByText('···')).toHaveLength(1);
  });

  it('should pass page number to default slot', () => {
    const { container } = render(Pagination, {
      props: { pages: 3, modelValue: 0 },
      slots: {
        default: ({ page }: { page: number }) => `P${page}`,
      },
    });
    expect(container.textContent).toContain('P1');
    expect(container.textContent).toContain('P2');
    expect(container.textContent).toContain('P3');
  });
});
