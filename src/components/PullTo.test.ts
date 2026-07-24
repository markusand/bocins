import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import PullTo from './PullTo.vue';

// TouchEvent.touches not wired in happy-dom, behavior untestable
describe('PullTo', () => {
	it('should render slot content', () => {
		render(PullTo, {
			props: { threshold: 100 },
			slots: { default: 'Pull down' },
		});
		expect(screen.getByText('Pull down')).toBeInTheDocument();
	});
});
