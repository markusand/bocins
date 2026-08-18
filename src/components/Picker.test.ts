import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import Picker from './Picker.vue';

describe('Picker', () => {
	it('should render options', () => {
		render(Picker, {
			props: { modelValue: undefined, options: ['Red', 'Green', 'Blue'] },
		});
		expect(screen.getByText('Red')).toBeInTheDocument();
		expect(screen.getByText('Green')).toBeInTheDocument();
		expect(screen.getByText('Blue')).toBeInTheDocument();
	});

	it('should select option on click', async () => {
		const { emitted } = render(Picker, {
			props: { modelValue: undefined, options: ['Red', 'Green', 'Blue'] },
		});
		await userEvent.click(screen.getByText('Red'));
		expect(emitted()['update:modelValue'].at(-1)).toEqual(['Red']);
	});

	it('should disable fieldset when disabled', () => {
		const { container } = render(Picker, {
			props: { modelValue: undefined, options: ['A', 'B'], disabled: true },
		});
		expect(container.querySelector('fieldset')).toBeDisabled();
	});

	it('should use formatter for display', () => {
		render(Picker, {
			props: {
				modelValue: undefined,
				options: ['a', 'b'],
				formatter: ((o: string) => o.toUpperCase()) as (o: unknown) => string,
			},
		});
		expect(screen.getByText('A')).toBeInTheDocument();
		expect(screen.getByText('B')).toBeInTheDocument();
	});
});
