import type { DirectiveBinding } from 'vue';

const CACHE = new Map<string, SVGElement>();

const replace = (img: HTMLImageElement) => {
  if (CACHE.has(img.src)) img.replaceWith(CACHE.get(img.src)?.cloneNode(true) as SVGElement);
  else {
    fetch(img.src)
      .then(resp => resp.text())
      .then(text => {
        const template = document.createElement('template');
        template.innerHTML = text.replace(/<\?xml.+>/, '').trim();
        const svg: SVGElement = template.content.firstChild as SVGElement;
        Array.from(img.attributes).forEach(({ nodeName, nodeValue }) => {
          if (nodeName !== 'src') svg.setAttribute(nodeName, nodeValue || '');
        });
        img.replaceWith(svg);
        CACHE.set(img.src, svg);
      })
      .catch(error => console.warn(`Cannot replace ${img.src} ${error.message}`));
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

  unmounted(el: HTMLImageElement) {
    observer.unobserve(el);
  },
};
