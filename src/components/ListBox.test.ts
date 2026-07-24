import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import ListBox from './ListBox.vue';

describe('ListBox', () => {
	it('should render options', () => {
		render(ListBox, {
			props: { modelValue: undefined, options: ['Apple', 'Banana', 'Cherry'] },
		});
		expect(screen.getByRole('listbox')).toBeInTheDocument();
		expect(screen.getByText('Apple')).toBeInTheDocument();
		expect(screen.getByText('Banana')).toBeInTheDocument();
	});

	it('should show empty text when no options', () => {
		render(ListBox, {
			props: { modelValue: undefined, options: [] },
		});
		expect(screen.getByText('No options available')).toBeInTheDocument();
	});

	it('should show custom empty text', () => {
		render(ListBox, {
			props: { modelValue: undefined, options: [], emptyText: 'Nothing here' },
		});
		expect(screen.getByText('Nothing here')).toBeInTheDocument();
	});

	it('should render option roles', () => {
		render(ListBox, {
			props: { modelValue: undefined, options: ['A', 'B'] },
		});
		expect(screen.getAllByRole('option')).toHaveLength(2);
	});

	it('should pass option to default slot', () => {
		render(ListBox, {
			props: { modelValue: undefined, options: ['X', 'Y'] },
			slots: {
				default: ({ option }: { option: unknown }) => `Item:${option}`,
			},
		});
		expect(screen.getByText('Item:X')).toBeInTheDocument();
		expect(screen.getByText('Item:Y')).toBeInTheDocument();
	});
});
