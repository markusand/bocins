import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Avatar } from '/@/components';
import './assets/styles.scss';

const meta = {
  title: 'Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Image that represents a user or entity.',
      },
    },
  },
  argTypes: {
    src: { description: 'The source of the avatar image.' },
    name: { description: 'The name of the user. Used to generate the initials if no image is provided.' },
    badge: {
      description: 'Display a badge on the avatar to show its status. If a number is provided, a number badge will be displayed.',
      control: 'boolean',
    },
  },
  args: {
    src: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300',
    name: 'John Doe',
    badge: false,
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const Initials: Story = {
  args: { src: undefined },
  parameters: {
    docs: {
      description: {
        story: 'Display the initials of the user when there is no image.',
      },
    },
  },
};

export const Badge: Story = {
  args: { badge: true },
  parameters: {
    docs: {
      description: {
        story: 'Display a badge on the avatar to show its status.',
      },
    },
  },
};

export const NumberBadge: Story = {
  args: { badge: 2 },
  parameters: {
    docs: {
      description: {
        story: 'Display a number badge on the avatar to show some count.',
      },
    },
  },
};
