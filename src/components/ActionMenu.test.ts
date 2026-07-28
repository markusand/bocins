import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { userEvent } from '@testing-library/user-event';
import ActionMenu from './ActionMenu.vue';

// Happy-dom lacks popover API; stub the methods Dropdown calls
beforeAll(() => {
  HTMLElement.prototype.showPopover ??= vi.fn();
  HTMLElement.prototype.hidePopover ??= vi.fn();
});

const actions = [
  {
    name: 'File',
    actions: [
      { id: 'edit', label: 'Edit', icon: 'pencil.svg' },
      { id: 'delete', label: 'Delete', onClick: vi.fn() },
    ],
  },
];

const props = { item: { id: 1 }, actions };

describe('ActionMenu', () => {
  it('should render toggler button', () => {
    render(ActionMenu, { props });
    expect(screen.getByLabelText('Actions')).toBeInTheDocument();
  });

  it('should render menu with menuitems', () => {
    render(ActionMenu, { props });
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem')).toHaveLength(2);
  });

  it('should render action labels', () => {
    render(ActionMenu, { props });
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should render group name', () => {
    render(ActionMenu, { props });
    expect(screen.getByText('File')).toBeInTheDocument();
  });

  it('should call onClick with item when action is clicked', async () => {
    render(ActionMenu, { props });
    await userEvent.click(screen.getByText('Delete'));
    expect(actions[0].actions[1].onClick).toHaveBeenCalledWith({ id: 1 });
  });

  it('should render icon for actions that have one', () => {
    render(ActionMenu, { props });
    const editButton = screen.getByText('Edit').closest('button');
    expect(editButton?.querySelector('.icon')).toBeInTheDocument();
    const deleteButton = screen.getByText('Delete').closest('button');
    expect(deleteButton?.querySelector('.icon')).not.toBeInTheDocument();
  });

  it('should render nested sub-menu actions', () => {
    const nestedActions = [{
      actions: [{
        id: 'move',
        label: 'Move to',
        groups: [{
          actions: [
            { id: 'move-archive', label: 'Archive' },
            { id: 'move-trash', label: 'Trash' },
          ],
        }],
      }],
    }];
    render(ActionMenu, { props: { item: { id: 1 }, actions: nestedActions } });
    expect(screen.getByText('Move to')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Move to/ })).toHaveAttribute('aria-haspopup', 'menu');
    expect(screen.getByText('Archive')).toBeInTheDocument();
    expect(screen.getByText('Trash')).toBeInTheDocument();
  });

  it('should disable toggler when disabled', () => {
    render(ActionMenu, { props: { ...props, disabled: true } });
    expect(screen.getByLabelText('Actions')).toBeDisabled();
  });
});
