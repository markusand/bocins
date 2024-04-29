import type { Meta, StoryObj } from '@storybook/vue3';
import { AvatarGroup, Avatar } from '/@/components';

const meta = {
  title: 'AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A group of avatars displayed next to each other.',
      },
    },
  },
  argTypes: {
    stacked: {
      description: 'Display avatars stacked on top of each other to save space.',
      control: 'boolean',
    },
  },
  args: {
    stacked: false,
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => ({
    components: { AvatarGroup, Avatar },
    setup: () => ({ args }),
    template: `<AvatarGroup v-bind="args">
      <Avatar name="Jane Doe" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300" />
      <Avatar name="Jill Doe" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300" />
      <Avatar name="Jim Doe" src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=300" />
      <Avatar name="John Doe" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300" />
    </AvatarGroup>`,
  }),
};
