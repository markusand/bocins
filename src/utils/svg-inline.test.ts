/* eslint-disable @typescript-eslint/no-explicit-any */
import { it, expect, vi, beforeEach } from 'vitest';

// Mock IntersectionObserver before importing module
const observe = vi.fn();
const unobserve = vi.fn();
let observerCallback: IntersectionObserverCallback;

vi.stubGlobal('IntersectionObserver', function (this: any, cb: IntersectionObserverCallback) {
	observerCallback = cb;
	this.observe = observe;
	this.unobserve = unobserve;
	return this;
});

// HappyDOM Attr has broken nodeName/nodeValue; patch them so the
// directive's applyAttrs (which destructures { nodeName, nodeValue }) works.
const AttrProto = Attr.prototype as any;
if (!Object.getOwnPropertyDescriptor(AttrProto, 'nodeName')?.get) {
	Object.defineProperty(AttrProto, 'nodeName', { get() { return this.name; } });
}
if (!Object.getOwnPropertyDescriptor(AttrProto, 'nodeValue')?.get) {
	Object.defineProperty(AttrProto, 'nodeValue', { get() { return this.value; } });
}

// Dynamic import so IntersectionObserver and Attr patches are in place
// before the module-level `new IntersectionObserver(...)` runs at import time.
const { vSvgInline } = await import('./svg-inline');

const createImg = (src = 'https://example.com/icon.svg', attrs: Record<string, string> = {}) => {
	const img = document.createElement('img');
	img.setAttribute('src', src);
	Object.entries(attrs).forEach(([k, v]) => img.setAttribute(k, v));
	document.body.appendChild(img);
	return img;
};

const svgText = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0"/></svg>';

beforeEach(() => {
	vi.restoreAllMocks();
	observe.mockClear();
	unobserve.mockClear();
	document.body.innerHTML = '';
	vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ text: () => Promise.resolve(svgText) }));
});

it('should throw if element is not an img', () => {
	const div = document.createElement('div');
  const mount = () => vSvgInline.mounted(div as any, { modifiers: {} } as any);
	expect(mount).toThrow('Element must be image');
});

it('should observe element for lazy loading by default', () => {
	const img = createImg();
	vSvgInline.mounted(img, { modifiers: {} } as any);
	expect(observe).toHaveBeenCalledWith(img);
});

it('should replace immediately when lazy is false', () => {
	const img = createImg();
	vSvgInline.mounted(img, { modifiers: { lazy: false } } as any);
	expect(fetch).toHaveBeenCalledWith(img.src);
});

it('should fetch and replace img with svg when intersecting', async () => {
	const img = createImg();
	vSvgInline.mounted(img, { modifiers: {} } as any);
	observerCallback([{ isIntersecting: true, target: img }] as any, {} as any);
	
  await vi.waitFor(() => {
		const svg = document.body.querySelector('svg');
		expect(svg).not.toBeNull();
		expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
	});
  
	expect(unobserve).toHaveBeenCalledWith(img);
});

it('should not replace when not intersecting', () => {
	vi.stubGlobal('fetch', vi.fn());
	const img = createImg();
	vSvgInline.mounted(img, { modifiers: {} } as any);
	observerCallback([{ isIntersecting: false, target: img }] as any, {} as any);
	expect(fetch).not.toHaveBeenCalled();
});

it('should copy img attributes (except src) to svg', async () => {
	const img = createImg('https://example.com/icon.svg', { class: 'icon', 'aria-label': 'icon' });
	vSvgInline.mounted(img, { modifiers: { lazy: false } } as any);
	
  await vi.waitFor(() => {
		const svg = document.body.querySelector('svg');
		expect(svg?.getAttribute('class')).toBe('icon');
		expect(svg?.getAttribute('aria-label')).toBe('icon');
		expect(svg?.getAttribute('src')).toBeNull();
	});
});

it('should use cache on second fetch of same url', async () => {
	const img1 = createImg('https://example.com/cached.svg');
	vSvgInline.mounted(img1, { modifiers: { lazy: false } } as any);
	await vi.waitFor(() => expect(document.body.querySelector('svg')).not.toBeNull());

	// Second load, same URL
	const img2 = createImg('https://example.com/cached.svg');
	vSvgInline.mounted(img2, { modifiers: { lazy: false } } as any);
	await vi.waitFor(() => expect(document.body.querySelectorAll('svg').length).toBe(2));

	expect(fetch).toHaveBeenCalledTimes(1);
});

it('should strip xml declaration from response', async () => {
	const withXml = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgText;
	vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ text: () => Promise.resolve(withXml) }));
	const img = createImg('https://example.com/xml.svg');
	vSvgInline.mounted(img, { modifiers: { lazy: false } } as any);

	await vi.waitFor(() => {
		const svg = document.body.querySelector('svg');
		expect(svg).not.toBeNull();
	});
});

it('should warn on fetch error', async () => {
	const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
	
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));
	const img = createImg('https://example.com/bad.svg');
	vSvgInline.mounted(img, { modifiers: { lazy: false } } as any);

	await vi.waitFor(() => {
		expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Network error'));
	});
});

it('should unobserve on unmounted', () => {
	const img = createImg();
	vSvgInline.unmounted(img);
	expect(unobserve).toHaveBeenCalledWith(img);
});
