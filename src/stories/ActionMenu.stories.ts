import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ActionMenu, type ActionGroup } from '/@/components';
import { Button, Icon, Switch } from '/@/components';
import './assets/styles.css';

type User = { name: string; role: string };

const user: User = { name: 'Jane Smith', role: 'editor' };

const actions: ActionGroup<User>[] = [
  {
    name: 'files',
    actions: [
      { id: 'copy', label: 'Copy', icon: 'copy.svg', onClick: console.log },
      { id: 'download', label: 'Download', icon: 'download.svg', onClick: console.log },
      { id: 'archive', label: 'Archive', icon: 'archive.svg', onClick: console.log },
      { id: 'dark', label: 'Dark Mode', icon: 'moon.svg', onClick: console.log },
    ],
  },
  {
    actions: [
      { id: 'delete', label: 'Delete', icon: 'trash.svg', attrs: { delete: true }, onClick: console.log },
    ],
  },
] as const;

const meta = {
  title: 'ActionMenu',
  component: ActionMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A contextual menu for item-level actions, supporting grouped actions, hotkeys, and nested submenus.',
      },
    },
  },
  argTypes: {
    item: { description: 'The item associated with this menu, passed to each action\'s `onClick` handler.' },
    actions: { description: 'Array of action groups to display.' },
    disabled: { description: 'Disable the menu' },
  },
  args: {
    item: user,
    actions,
    disabled: false,
  },
} satisfies Meta<typeof ActionMenu<User>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const WithHotkeys: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Actions with keyboard shortcuts displayed and triggered via hotkeys.',
      },
    },
  },
  args: {
    item: user,
    actions: [
      {
        actions: [
          { id: 'copy', label: 'Copy', icon: 'copy.svg', hotkey: 'meta+c', onClick: console.log },
          { id: 'download', label: 'Download', icon: 'download.svg', hotkey: 'meta+d', onClick: console.log },
          { id: 'archive', label: 'Archive', icon: 'archive.svg', hotkey: 'meta+shift+a', onClick: console.log },
        ],
      },
      {
        actions: [
          { id: 'delete', label: 'Delete', icon: 'trash.svg', hotkey: 'meta+backspace', attrs: { delete: true }, onClick: console.log },
        ],
      },
    ],
  },
};

export const SubMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: 'An action can contain nested groups, rendered as a submenu.',
      },
    },
  },
  args: {
    item: user,
    actions: [
      {
        actions: [
          { id: 'copy', label: 'Copy', icon: 'copy.svg', onClick: console.log },
          {
            id: 'share',
            label: 'Share',
            icon: 'share.svg',
            groups: [
              {
                name: 'Send to',
                actions: [
                  { id: 'share-email', icon: 'mail.svg', label: 'Email', onClick: console.log },
                  {
                    id: 'share-slack',
                    icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/7482b32c4d7e062a265e2f4000094577230251fb/icons/slack.svg',
                    label: 'Slack',
                    onClick: console.log,
                  },
                  { id: 'share-link', icon: 'link.svg', label: 'Copy link', onClick: console.log },
                ],
              },
            ],
          },
          { id: 'delete', label: 'Delete', icon: 'trash.svg', attrs: { delete: true }, onClick: console.log },
        ],
      },
    ],
  },
};

export const CustomToggler: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Replace the default toggler with a custom button using the `#toggler` slot.',
      },
    },
  },
  render: args => ({
    components: { ActionMenu, Button, Icon },
    setup: () => ({ args }),
    template: `<ActionMenu v-bind="args">
      <template #toggler>
        <Button flat even>
          <Icon src="ellipsis.svg" />
        </Button>
      </template>
    </ActionMenu>`,
  }),
};

export const CustomAction: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Override a specific action\'s rendering via its named slot.',
      },
    },
  },
  render: args => ({
    components: { ActionMenu, Button, Switch },
    setup: () => {

      return { args };
    },
    template: `<ActionMenu v-bind="args">
      <template #dark="{ action }">
        <label class="action-menu-item">
          <span>{{ action.label }}</span>
          <Switch @toggle="action.onClick" />
        </label>
      </template>
      <template #delete="{ action }">
        <Button flat block style="--color: #f65;">
          {{ action.label }} {{ args.item.name }}
        </Button>
      </template>
    </ActionMenu>`,
  }),
};
