import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import Password from './Password.vue';

// Stub fetch to prevent v-svg-inline abort errors on teardown
beforeEach(() => {
	vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: false })));
});

describe('Password', () => {
	it('should render password input', () => {
		const { container } = render(Password, { props: { modelValue: '' } });
		expect(container.querySelector('input[type="password"]')).toBeInTheDocument();
	});

	it('should toggle visibility on button click', async () => {
		const { container } = render(Password, { props: { modelValue: 'secret' } });
		expect(container.querySelector('input[type="password"]')).toBeInTheDocument();
		const toggle = screen.getByRole('button', { name: 'Toggle visibility' });
		await userEvent.click(toggle);
		expect(container.querySelector('input[type="text"]')).toBeInTheDocument();
		await userEvent.click(toggle);
		expect(container.querySelector('input[type="password"]')).toBeInTheDocument();
	});

	it('should apply strength level class', () => {
		const strength = [(p: string) => p.length >= 8, (p: string) => /\d/.test(p)];
		const { container } = render(Password, { props: { modelValue: 'longpass1', strength } });
		expect(container.querySelector('.password--strong')).toBeInTheDocument();
	});

	it('should apply low strength for weak password', () => {
		const strength = [(p: string) => p.length >= 8, (p: string) => /\d/.test(p)];
		const { container } = render(Password, { props: { modelValue: 'ab', strength } });
		expect(container.querySelector('.password--low')).toBeInTheDocument();
	});
});
