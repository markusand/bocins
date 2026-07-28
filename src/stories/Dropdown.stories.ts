import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Dropdown, Button, Icon } from '/@/components';
import UserProfile from './UserProfile.vue';
import { users } from './assets/users';
import './assets/styles.css';

const meta = {
  title: 'Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Reveal and select additional content or options hidden from view until activated.',
      },
    },
  },
  argTypes: {
    position: {
      description: 'The position of the dropdown relative to the toggler.',
      control: { type: 'select' },
      options: [
        'top-left', 'top-start', 'top', 'top-end', 'top-right',
        'left', 'left-start', 'left-end',
        'right', 'right-start', 'right-end',
        'bottom-left', 'bottom-start', 'bottom', 'bottom-end', 'bottom-right',
      ],
    },
    label: { description: 'The text to display on the toggler button.' },
    block: { description: 'Display the dropdown menu as a block full width element.' },
    disabled: { description: 'Disable the dropdown menu.' },
    lazy: { description: 'Defer rendering slot content until the dropdown is first opened.' },
    toggler: { description: 'The toggler options' },
  },
  args: {
    position: undefined,
    label: '',
    block: false,
    disabled: false,
    lazy: undefined,
    width: undefined,
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { label: 'View' },
  render: args => ({
    components: { Dropdown, Button, Icon },
    setup: () => ({ args }),
    template: `
      <div style="text-align:center">
        <Dropdown v-bind="args">
          <div class="panel"">
            <Button flat block><Icon src="layout-grid.svg" /> Grid</Button>
            <Button flat block><Icon src="list.svg" /> List</Button>
            <Button flat block><Icon src="table.svg" /> Table</Button>
            <Button flat block><Icon src="calendar.svg" /> Calendar</Button>
          </div>
        </Dropdown>
      </div>`,
  }),
};

export const CustomToggler: Story = {
  render: args => ({
    components: { Dropdown, Button, Icon },
    setup: () => ({ args }),
    template: `<Dropdown v-bind="args">
      <template #toggler="{ open }">
        <Button even @click="open">
          <Icon src="ellipsis-vertical.svg" />
        </Button>
      </template>
      <div class="panel">
        <Button flat block><Icon src="pencil.svg" /> Rename</Button>
        <Button flat block><Icon src="copy.svg" /> Duplicate</Button>
        <Button flat block><Icon src="share.svg" /> Share</Button>
        <Button flat block delete><Icon src="trash.svg" /> Delete</Button>
      </div>
    </Dropdown>`,
  }),
};

export const CustomLabel: Story = {
  render: args => ({
    components: { Dropdown, Button, Icon, UserProfile },
    setup: () => ({ args, user: users[0] }),
    template: `<Dropdown v-bind="args">
      <template #label>
        <UserProfile :user />
      </template>
      <div class="panel">
        <Button flat block><Icon src="user.svg" /> Profile</Button>
        <Button flat block><Icon src="settings.svg" /> Settings</Button>
        <Button flat block><Icon src="bell.svg" /> Notifications</Button>
        <Button flat block delete><Icon src="log-out.svg" /> Sign out</Button>
      </div>
    </Dropdown>`,
  }),
};

