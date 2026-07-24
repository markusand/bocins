import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/vue';
import Icon from './Icon.vue';

describe('Icon', () => {
	it('should render img with resolved src', () => {
		const { container } = render(Icon, { props: { src: 'check.svg' } });
		const img = container.querySelector('img');
		expect(img?.getAttribute('src')).toContain('check.svg');
	});

	it('should use absolute src as-is', () => {
		const { container } = render(Icon, { props: { src: '/icons/check.svg' } });
		const img = container.querySelector('img');
		expect(img).toHaveAttribute('src', '/icons/check.svg');
	});

	it('should apply size class', () => {
		const { container } = render(Icon, { props: { src: 'check.svg', size: 'large' } });
		expect(container.querySelector('.icon--large')).toBeInTheDocument();
	});
});
