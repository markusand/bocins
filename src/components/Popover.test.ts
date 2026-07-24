import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import Popover from './Popover.vue';

const showPopover = vi.fn();
const hidePopover = vi.fn();

beforeAll(() => {
	HTMLElement.prototype.showPopover ??= showPopover;
	HTMLElement.prototype.hidePopover ??= hidePopover;
});

describe('Popover', () => {
	it('should render slots', () => {
		render(Popover, {
			props: { lazy: false },
			slots: { anchor: 'Hover me', default: 'Content' },
		});
		expect(screen.getByText('Hover me')).toBeInTheDocument();
		expect(screen.getByText('Content')).toBeInTheDocument();
	});

	it('should open on click via popovertarget button', () => {
		render(Popover, {
			slots: { anchor: 'Click me', default: 'Panel' },
		});
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('popovertarget');
	});

	it('should open on hover when hoverable', async () => {
		showPopover.mockClear();
		render(Popover, {
			props: { hoverable: true },
			slots: { anchor: 'Hover me', default: 'Panel' },
		});
		await fireEvent.mouseEnter(screen.getByText('Hover me').closest('.anchor')!);
		expect(showPopover).toHaveBeenCalled();
	});

	it('should close on mouseleave when hoverable', async () => {
		hidePopover.mockClear();
		render(Popover, {
			props: { hoverable: true },
			slots: { anchor: 'Hover me', default: 'Panel' },
		});
		const anchor = screen.getByText('Hover me').closest('.anchor')!;
		await fireEvent.mouseEnter(anchor);
		await fireEvent.mouseLeave(anchor);
		expect(hidePopover).toHaveBeenCalled();
	});
});
