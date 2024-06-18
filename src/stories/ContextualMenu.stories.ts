import type { Meta, StoryObj } from '@storybook/vue3';
import { ContextualMenu, type ContextualMenuActions, Button, Icon } from '/@/components';
import './assets/styles.scss';

type User = { name: string; age: number };
type UserActions = 'copy' | 'download' | 'archive' | 'delete';

const user: User = {
  name: 'John Doe',
  age: 30,
};

const actions: ContextualMenuActions<User, UserActions>[] = [
  {
    label: 'Group 1',
    actions: [
      { id: 'copy', onClick: console.log },
      { id: 'download', label: 'Download', icon: '/@/stories/assets/download.svg', onClick: console.log },
      { id: 'archive', label: 'Archive', icon: '/@/stories/assets/archive.svg', onClick: console.log },
    ],
  }, {
    actions: [
      { id: 'delete', label: 'Delete', icon: '/@/stories/assets/trash.svg', type: 'delete', onClick: console.log },
    ],
  },
];

const meta = {
  title: 'ContextualMenu',
  component: ContextualMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A menu that appears contextually based on user actions, typically offering relevant options or actions.',
      },
    },
  },
  argTypes: {
    item: { description: 'The item that the menu is associated with.' },
    actions: { description: 'The actions to display in the menu.' },
    top: { description: 'Display the menu upwards.' },
    right: { description: 'Display the menu anchored to the right.' },
    disabled: { description: 'Disable the menu.' },
  },
  args: {
    item: user,
    actions,
    top: false,
    right: false,
    disabled: false,
  },
} satisfies Meta<typeof ContextualMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const CustomToggler: Story = {
  render: args => ({
    components: { ContextualMenu, Button, Icon },
    setup: () => ({ args }),
    template: `<ContextualMenu v-bind="args">
      <template #toggler>
        <Button variant="flat" even>
          <Icon src="/@/stories/assets/more.svg" />
        </Button>
      </template>
    </ContextualMenu>`,
  }),
};

export const CustomAction: Story = {
  render: args => ({
    components: { ContextualMenu, Button },
    setup: () => ({ args }),
    template: `<ContextualMenu v-bind="args">
      <template #delete="{ action }">
        <Button style="--color:#f65;" block>
          {{ action.label }}
        </Button>
      </template>
    </ContextualMenu>`,
  }),
};
