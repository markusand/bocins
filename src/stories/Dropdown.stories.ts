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
        'top-left', 'top-in-left', 'top', 'top-in-right', 'top-right',
        'right-in-top', 'right', 'right-in-bottom',
        'bottom-right', 'bottom-in-right', 'bottom', 'bottom-in-left', 'bottom-left',
        'left-in-bottom', 'left', 'left-in-top',
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
    lazy: false,
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => ({
    components: { Dropdown },
    setup: () => ({ args }),
    template: `
      <div style="text-align:center">
      <Dropdown v-bind="args">
        <div style="background:white;border:1px dotted #888; padding:1rem;">Content</div>
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
          <Icon src="ellipsis.svg" />
        </Button>
      </template>
      Content
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
      Content
    </Dropdown>`,
  }),
};

