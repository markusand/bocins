import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import Search from './Search.vue';

describe('Search', () => {
	it('should render search input with default placeholder', () => {
		render(Search, { props: { modelValue: '' } });
		expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
	});

	it('should render custom placeholder', () => {
		render(Search, { props: { modelValue: '', placeholder: 'Find...' } });
		expect(screen.getByPlaceholderText('Find...')).toBeInTheDocument();
	});

	it('should have search input type', () => {
		const { container } = render(Search, { props: { modelValue: '' } });
		expect(container.querySelector('input[type="search"]')).toBeInTheDocument();
	});

	it('should emit update on typing', async () => {
		const { emitted } = render(Search, { props: { modelValue: '' } });
		await userEvent.type(screen.getByPlaceholderText('Search...'), 'query');
		expect(emitted()['update:modelValue'].length).toBeGreaterThan(0);
	});
});
