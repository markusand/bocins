import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import Passcode from './Passcode.vue';

const getInputs = (container: Element) => {
	return [...container.querySelectorAll<HTMLInputElement>('input[type="password"]')];
};

describe('Passcode', () => {
	it('should render correct number of inputs', () => {
		const { container } = render(Passcode, { props: { length: 6 } });
		expect(getInputs(container)).toHaveLength(6);
	});

	it('should focus next input after typing', async () => {
		const { container } = render(Passcode, { props: { length: 4 } });
		const inputs = getInputs(container);
		inputs[0].focus();
		inputs[0].value = '1';
		await fireEvent.input(inputs[0]);
		expect(document.activeElement).toBe(inputs[1]);
	});

	it('should focus previous input on backspace when empty', async () => {
		const { container } = render(Passcode, { props: { length: 4 } });
		const inputs = getInputs(container);
		inputs[1].focus();
		await fireEvent.keyDown(inputs[1], { key: 'Backspace' });
		expect(document.activeElement).toBe(inputs[0]);
	});

	it('should not focus previous on backspace when input has value', async () => {
		const { container } = render(Passcode, { props: { length: 4 } });
		const inputs = getInputs(container);
		inputs[1].value = '5';
		inputs[1].focus();
		await fireEvent.keyDown(inputs[1], { key: 'Backspace' });
		expect(document.activeElement).toBe(inputs[1]);
	});

	it('should emit fill when all inputs filled', async () => {
		const { container, emitted } = render(Passcode, { props: { length: 4 } });
		const inputs = getInputs(container);
		for (let i = 0; i < 4; i++) {
			inputs[i].value = String(i + 1);
			await fireEvent.input(inputs[i]);
		}
		expect(emitted().fill?.[0]).toEqual(['1234']);
	});

	it('should focus first empty input on fieldset click', async () => {
		const { container } = render(Passcode, { props: { length: 4 } });
		const inputs = getInputs(container);
		inputs[0].value = '1';
		await fireEvent.input(inputs[0]);
		inputs[1].value = '2';
		await fireEvent.input(inputs[1]);
		await fireEvent.click(screen.getByRole('group'));
		expect(document.activeElement).toBe(inputs[2]);
	});

	it('should mark as aria-invalid', () => {
		render(Passcode, { props: { length: 4, invalid: true } });
		expect(screen.getByRole('group')).toHaveAttribute('aria-invalid', 'true');
	});

	it('should disable all inputs', () => {
		render(Passcode, { props: { length: 4, disabled: true } });
		expect(screen.getByRole('group')).toBeDisabled();
	});
});
