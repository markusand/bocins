import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import Stepper from './Stepper.vue';

describe('Stepper', () => {
	it('should render increase and decrease buttons', () => {
		render(Stepper, { props: { modelValue: 5 } });
		expect(screen.getByRole('button', { name: 'Decrease' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Increase' })).toBeInTheDocument();
	});

	it('should emit increased value on increase click', async () => {
		const { emitted } = render(Stepper, { props: { modelValue: 5, step: 1 } });
		await userEvent.click(screen.getByRole('button', { name: 'Increase' }));
		expect(emitted()['update:modelValue'].at(-1)).toEqual([6]);
	});

	it('should emit decreased value on decrease click', async () => {
		const { emitted } = render(Stepper, { props: { modelValue: 5, step: 1 } });
		await userEvent.click(screen.getByRole('button', { name: 'Decrease' }));
		expect(emitted()['update:modelValue'].at(-1)).toEqual([4]);
	});

	it('should disable decrease at min', () => {
		render(Stepper, { props: { modelValue: 0, min: 0 } });
		expect(screen.getByRole('button', { name: 'Decrease' })).toBeDisabled();
	});

	it('should disable increase at max', () => {
		render(Stepper, { props: { modelValue: 10, max: 10 } });
		expect(screen.getByRole('button', { name: 'Increase' })).toBeDisabled();
	});
});
