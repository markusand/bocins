import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import Tabs from './Tabs.vue';
import TabView from './TabView.vue';
import { h } from 'vue';

const renderTabs = (modelValue?: string) => render(Tabs, {
	props: { modelValue },
	slots: {
		default: () => [
			h(TabView, { id: 'one', label: 'First' }, () => 'Content One'),
			h(TabView, { id: 'two', label: 'Second' }, () => 'Content Two'),
			h(TabView, { id: 'three', label: 'Third', disabled: true }, () => 'Content Three'),
		],
	},
});

describe('Tabs', () => {
	it('should render tab buttons', () => {
		renderTabs();
		expect(screen.getByRole('tab', { name: 'First' })).toBeInTheDocument();
		expect(screen.getByRole('tab', { name: 'Second' })).toBeInTheDocument();
		expect(screen.getByRole('tab', { name: 'Third' })).toBeInTheDocument();
	});

	it('should activate first tab by default', async () => {
		renderTabs();
		await waitFor(() => {
		  expect(screen.getByRole('tab', { name: 'First' })).toHaveAttribute('aria-selected', 'true');
		});
		expect(screen.getByText('Content One')).toBeInTheDocument();
	});

	it('should switch tab on click', async () => {
		renderTabs();
		await userEvent.click(screen.getByRole('tab', { name: 'Second' }));
		expect(screen.getByRole('tab', { name: 'Second' })).toHaveAttribute('aria-selected', 'true');
		expect(screen.getByText('Content Two')).toBeInTheDocument();
	});

	it('should disable tab', () => {
		renderTabs();
		expect(screen.getByRole('tab', { name: 'Third' })).toBeDisabled();
	});

	it('should have tablist role on header', () => {
		renderTabs();
		expect(screen.getByRole('tablist')).toBeInTheDocument();
	});

	it('should show tabpanel with correct aria-labelledby', () => {
		renderTabs('one');
		const panel = screen.getByRole('tabpanel');
		expect(panel).toHaveAttribute('aria-labelledby', 'one-tab');
	});
});
