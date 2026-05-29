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
    label: { description: 'The text to display on the toggler button.' },
    block: { description: 'Display the dropdown menu as a block full width element.' },
    disabled: { description: 'Disable the dropdown menu.' },
    lazy: { description: 'Defer rendering slot content until the dropdown is first opened.' },
    toggler: { description: 'The toggler options' },
  },
  args: {
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
    template: `<Dropdown v-bind="args">
      Content
    </Dropdown>`,
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

