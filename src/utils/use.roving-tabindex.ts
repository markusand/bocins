type RovingTabindexOptions = {
  selector?: string;
  columns?: number;
  wrap?: boolean;
};

export const useRovingTabindex = ({
  selector = 'button',
  columns = 1,
  wrap = false,
}: RovingTabindexOptions = {}) => {
  const getItems = (container: HTMLElement) =>
    [...container.querySelectorAll<HTMLElement>(selector)]
      .filter(el => !(el as HTMLButtonElement | HTMLInputElement).disabled);

  const onFocusin = (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    if (!target.matches(selector)) return;
    getItems(event.currentTarget as HTMLElement)
      .forEach(el => { el.tabIndex = el === target ? 0 : -1; });
  };

  const onKeydown = (event: KeyboardEvent) => {
    const offsets: Partial<Record<string, number>> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -columns,
      ArrowDown: columns,
    };
    const offset = offsets[event.key];
    if (offset === undefined) return;
    const items = getItems(event.currentTarget as HTMLElement);
    const index = items.indexOf(event.target as HTMLElement);
    if (index === -1) return;
    event.preventDefault();
    const next = index + offset;
    if (wrap) items.at(((next % items.length) + items.length) % items.length)?.focus();
    else items[next]?.focus();
  };

  return { onFocusin, onKeydown };
};
