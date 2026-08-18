import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Tooltip from './Tooltip.vue';

beforeAll(() => {
	HTMLElement.prototype.showPopover ??= vi.fn();
	HTMLElement.prototype.hidePopover ??= vi.fn();
});

describe('Tooltip', () => {
	it('should render text prop as content', () => {
		render(Tooltip, {
			props: { text: 'Help text' },
			slots: { default: 'Info' },
		});
		expect(screen.getByText('Help text')).toBeInTheDocument();
	});

	it('should render content slot over text prop', () => {
		render(Tooltip, {
			props: { text: 'Fallback' },
			slots: { content: 'Custom content', default: 'Trigger' },
		});
		expect(screen.getByText('Custom content')).toBeInTheDocument();
	});
});
