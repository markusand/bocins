import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/vue';
import ImageExpand from './ImageExpand.vue';

beforeAll(() => {
	HTMLDialogElement.prototype.showModal ??= vi.fn();
	HTMLDialogElement.prototype.close ??= vi.fn();
});

describe('ImageExpand', () => {
	it('should render images with alt text', () => {
		render(ImageExpand, { props: { src: '/photo.jpg', alt: 'A photo' } });
		expect(screen.getAllByAltText('A photo')).toHaveLength(2);
	});

	it('should show thumbnail when provided', () => {
		render(ImageExpand, { props: { src: '/photo.jpg', thumbnail: '/thumb.jpg', alt: 'A photo' } });
		const imgs = screen.getAllByAltText('A photo');
		expect(imgs[0]).toHaveAttribute('src', '/thumb.jpg');
		expect(imgs[1]).toHaveAttribute('src', '/photo.jpg');
	});

	it('should have expand button', () => {
		render(ImageExpand, { props: { src: '/photo.jpg', alt: 'A photo' } });
		expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(1);
	});

	it('should contain a dialog', () => {
		render(ImageExpand, { props: { src: '/photo.jpg', alt: 'A photo' } });
		expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument();
	});
});
