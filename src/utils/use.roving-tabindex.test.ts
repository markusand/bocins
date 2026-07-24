import { describe, it, expect } from 'vitest';
import { useRovingTabindex } from './use.roving-tabindex';

const createContainer = (...labels: string[]) => {
  const container = document.createElement('div');
  labels.forEach(label => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.tabIndex = 0;
    container.appendChild(btn);
  });
  return container;
};

describe('useRovingTabindex', () => {
  it('should set tabIndex 0 on focused item and -1 on others', () => {
    const container = createContainer('A', 'B', 'C');
    const buttons = container.querySelectorAll('button');
    const { onFocusin } = useRovingTabindex();

    onFocusin({ target: buttons[1], currentTarget: container } as unknown as FocusEvent);

    expect(buttons[0].tabIndex).toBe(-1);
    expect(buttons[1].tabIndex).toBe(0);
    expect(buttons[2].tabIndex).toBe(-1);
  });

  it('should move focus with ArrowRight', () => {
    const container = createContainer('A', 'B', 'C');
    const buttons = container.querySelectorAll('button');
    const focused: string[] = [];
    buttons[1].focus = () => focused.push('B');

    const { onKeydown } = useRovingTabindex();
    onKeydown({
      key: 'ArrowRight',
      target: buttons[0],
      currentTarget: container,
      preventDefault: () => {},
    } as unknown as KeyboardEvent);

    expect(focused).toEqual(['B']);
  });

  it('should move focus with ArrowLeft', () => {
    const container = createContainer('A', 'B', 'C');
    const buttons = container.querySelectorAll('button');
    const focused: string[] = [];
    buttons[0].focus = () => focused.push('A');

    const { onKeydown } = useRovingTabindex();
    onKeydown({
      key: 'ArrowLeft',
      target: buttons[1],
      currentTarget: container,
      preventDefault: () => {},
    } as unknown as KeyboardEvent);

    expect(focused).toEqual(['A']);
  });

  it('should not move past boundaries without wrap', () => {
    const container = createContainer('A', 'B');
    const buttons = container.querySelectorAll('button');
    const focused: string[] = [];
    buttons.forEach(b => { b.focus = () => focused.push(b.textContent!); });

    const { onKeydown } = useRovingTabindex();
    onKeydown({
      key: 'ArrowLeft',
      target: buttons[0],
      currentTarget: container,
      preventDefault: () => {},
    } as unknown as KeyboardEvent);

    expect(focused).toEqual([]);
  });

  it('should wrap around with wrap: true', () => {
    const container = createContainer('A', 'B', 'C');
    const buttons = container.querySelectorAll('button');
    const focused: string[] = [];
    buttons.forEach(b => { b.focus = () => focused.push(b.textContent!); });

    const { onKeydown } = useRovingTabindex({ wrap: true });
    onKeydown({
      key: 'ArrowLeft',
      target: buttons[0],
      currentTarget: container,
      preventDefault: () => {},
    } as unknown as KeyboardEvent);

    expect(focused).toEqual(['C']);
  });

  it('should skip disabled buttons', () => {
    const container = createContainer('A', 'B', 'C');
    const buttons = container.querySelectorAll('button');
    buttons[1].disabled = true;
    const focused: string[] = [];
    buttons.forEach(b => { b.focus = () => focused.push(b.textContent!); });

    const { onKeydown } = useRovingTabindex();
    onKeydown({
      key: 'ArrowRight',
      target: buttons[0],
      currentTarget: container,
      preventDefault: () => {},
    } as unknown as KeyboardEvent);

    expect(focused).toEqual(['C']);
  });

  it('should support grid navigation with columns', () => {
    const container = createContainer('1', '2', '3', '4', '5', '6');
    const buttons = container.querySelectorAll('button');
    const focused: string[] = [];
    buttons.forEach(b => { b.focus = () => focused.push(b.textContent!); });

    const { onKeydown } = useRovingTabindex({ columns: 3 });
    onKeydown({
      key: 'ArrowDown',
      target: buttons[1],
      currentTarget: container,
      preventDefault: () => {},
    } as unknown as KeyboardEvent);

    expect(focused).toEqual(['5']);
  });

  it('should ignore non-arrow keys', () => {
    const container = createContainer('A', 'B');
    const prevented: boolean[] = [];

    const { onKeydown } = useRovingTabindex();
    onKeydown({
      key: 'Enter',
      target: container.querySelector('button'),
      currentTarget: container,
      preventDefault: () => prevented.push(true),
    } as unknown as KeyboardEvent);

    expect(prevented).toEqual([]);
  });

});
