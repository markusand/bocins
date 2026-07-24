import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import Transfer from './Transfer.vue';

describe('Transfer', () => {
	it('should render two listboxes', () => {
		render(Transfer, {
			props: { modelValue: [], options: ['A', 'B', 'C'] },
		});
		expect(screen.getAllByRole('listbox')).toHaveLength(2);
	});

	it('should show pool options excluding selected', () => {
		render(Transfer, {
			props: { modelValue: ['A'], options: ['A', 'B', 'C'] },
		});
		expect(screen.getAllByRole('option')).toHaveLength(3); // 2 pool + 1 selected
	});

	it('should have 4 control buttons', () => {
		render(Transfer, {
			props: { modelValue: [], options: ['A', 'B'] },
		});
		expect(screen.getAllByRole('button')).toHaveLength(4);
	});

	it('should move all items on add-all click', async () => {
		const { emitted } = render(Transfer, {
			props: { modelValue: [], options: ['A', 'B'] },
		});
		const buttons = screen.getAllByRole('button');
		await userEvent.click(buttons[0]); // add all
		expect(emitted()['update:modelValue'][0]).toEqual([['A', 'B']]);
	});

	it('should remove all items on remove-all click', async () => {
		const { emitted } = render(Transfer, {
			props: { modelValue: ['A', 'B'], options: ['A', 'B'] },
		});
		const buttons = screen.getAllByRole('button');
		await userEvent.click(buttons[3]); // remove all
		expect(emitted()['update:modelValue'][0]).toEqual([[]]);
	});
});
