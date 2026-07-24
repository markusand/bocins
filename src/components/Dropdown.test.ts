import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import Dropdown from './Dropdown.vue';

beforeAll(() => {
	HTMLElement.prototype.showPopover ??= vi.fn();
	HTMLElement.prototype.hidePopover ??= vi.fn();
	globalThis.ToggleEvent ??= class ToggleEvent extends Event {
		newState: string;
		oldState: string;
		constructor(type: string, init: { newState: string; oldState: string }) {
			super(type);
			this.newState = init.newState;
			this.oldState = init.oldState;
		}
	} as unknown as typeof ToggleEvent;
});

describe('Dropdown', () => {
	it('should render toggler button with label', () => {
		render(Dropdown, { props: { label: 'Menu' } });
		expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
  });

	it('should disable toggler button', () => {
		render(Dropdown, { props: { label: 'Menu', disabled: true } });
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('should render slot content when not lazy', () => {
		render(Dropdown, {
			props: { label: 'Menu', lazy: false },
			slots: { default: 'Panel content' },
		});
		expect(screen.getByText('Panel content')).toBeInTheDocument();
	});

	it('should not render slot content when lazy and closed', () => {
		render(Dropdown, {
			props: { label: 'Menu', lazy: true },
			slots: { default: 'Panel content' },
		});
		expect(screen.queryByText('Panel content')).not.toBeInTheDocument();
	});

	it('should render slot content when lazy and opened', async () => {
		const { container } = render(Dropdown, {
			props: { label: 'Menu', lazy: true },
			slots: { default: 'Panel content' },
		});
    expect(screen.queryByText('Panel content')).not.toBeInTheDocument();
		const dropdown = container.querySelector('.dropdown')!;
		await fireEvent(dropdown, new ToggleEvent('toggle', { newState: 'open', oldState: 'closed' }));
		expect(screen.queryByText('Panel content')).toBeInTheDocument();
	});

	it('should render custom label slot', () => {
		render(Dropdown, {
			slots: { label: 'Custom label' },
		});
		expect(screen.getByText('Custom label')).toBeInTheDocument();
	});
});
