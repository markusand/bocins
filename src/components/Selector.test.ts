import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Selector from './Selector.vue';

beforeAll(() => {
	HTMLElement.prototype.showPopover ??= vi.fn();
	HTMLElement.prototype.hidePopover ??= vi.fn();
});

describe('Selector', () => {
	it('should show placeholder when nothing selected', () => {
		render(Selector, {
			props: { modelValue: undefined, options: ['A', 'B', 'C'] },
		});
		expect(screen.getByText('Select')).toBeInTheDocument();
	});

	it('should show custom placeholder', () => {
		render(Selector, {
			props: { modelValue: undefined, options: ['A'], placeholder: 'Choose...' },
		});
		expect(screen.getByText('Choose...')).toBeInTheDocument();
	});

	it('should display selected value in toggler', () => {
		render(Selector, {
			props: { modelValue: 'B', options: ['A', 'B', 'C'] },
		});
		expect(screen.queryByText('Select')).not.toBeInTheDocument();
		expect(screen.getByRole('button').textContent).toContain('B');
	});

	it('should display multiple selected values', () => {
		render(Selector, {
			props: { modelValue: ['A', 'C'], options: ['A', 'B', 'C'] },
		});
		expect(screen.getByText('A, C')).toBeInTheDocument();
	});

	it('should display formatted selection', () => {
		render(Selector, {
			props: {
        modelValue: 'a',
        options: ['a', 'b'],
        formatter: ((o: string) => o.toUpperCase()) as (o: unknown) => string,
      },
		});
		expect(screen.getByRole('button').textContent).toContain('A');
	});

	it('should apply invalid class', () => {
		const { container } = render(Selector, {
			props: { modelValue: undefined, options: ['A'], invalid: true },
		});
		expect(container.querySelector('.is-invalid')).toBeInTheDocument();
	});

	it('should apply disabled state', () => {
		render(Selector, {
			props: { modelValue: undefined, options: ['A'], disabled: true },
		});
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('should render custom placeholder slot', () => {
		render(Selector, {
			props: { modelValue: undefined, options: ['A'] },
			slots: { placeholder: 'Pick one' },
		});
		expect(screen.getByText('Pick one')).toBeInTheDocument();
	});

	it('should pass item to selection slot', () => {
		render(Selector, {
			props: { modelValue: 'A', options: ['A', 'B'] },
			slots: { selection: ({ item }: { item: unknown }) => `Selected: ${item}` },
		});
		expect(screen.getByRole('button').textContent).toContain('Selected: A');
	});

	it('should pass items to selections slot', () => {
		render(Selector, {
			props: { modelValue: ['A', 'B'], options: ['A', 'B', 'C'] },
			slots: { selections: ({ items }: { items: unknown[] }) => `${items.length} picked` },
		});
		expect(screen.getByRole('button').textContent).toContain('2 picked');
	});
});
