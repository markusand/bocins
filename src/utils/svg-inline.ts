import type { DirectiveBinding } from 'vue';

const CACHE = new Map<string, SVGElement>();
const RENDERED = new WeakMap<HTMLImageElement, SVGElement>();

const applyAttrs = (img: HTMLImageElement, svg: SVGElement) => {
  Array.from(img.attributes).forEach(({ nodeName, nodeValue }) => {
    if (nodeName !== 'src') svg.setAttribute(nodeName, nodeValue || '');
  });
};

const replace = (img: HTMLImageElement) => {
  const url = img.src;
  if (CACHE.has(url)) {
    const svg = CACHE.get(url)!.cloneNode(true) as SVGElement;
    applyAttrs(img, svg);
    img.replaceWith(svg);
    RENDERED.set(img, svg);
  } else {
    fetch(url)
      .then(resp => resp.text())
      .then(text => {
        const template = document.createElement('template');
        template.innerHTML = text.replace(/<\?xml.+>/, '').trim();
        const svg: SVGElement = template.content.firstChild as SVGElement;
        applyAttrs(img, svg);
        img.replaceWith(svg);
        RENDERED.set(img, svg);
        CACHE.set(url, svg.cloneNode(true) as SVGElement);
      })
      .catch(error => console.warn(`Cannot replace ${url} ${error.message}`));
  }
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      replace(entry.target as HTMLImageElement);
      observer.unobserve(entry.target);
    }
  });
});

export const vSvgInline = {
  mounted(el: HTMLImageElement, { modifiers }: DirectiveBinding) {
    if (el.tagName !== 'IMG') throw new Error('Element must be image');
    const { lazy = true } = modifiers;
    if (lazy) observer.observe(el);
    else replace(el);
  },

  updated(el: HTMLImageElement) {
    const current = RENDERED.get(el);
    if (current?.isConnected) current.replaceWith(el);
    RENDERED.delete(el);
    replace(el);
  },

  unmounted(el: HTMLImageElement) {
    observer.unobserve(el);
    RENDERED.delete(el);
  },
};
