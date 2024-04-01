import type { Meta, StoryObj } from '@storybook/vue3';
import { Avatar } from '/@/components';

const meta = {
  title: 'Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    badge: { control: 'boolean' },
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
};

export const Badge: Story = {
  args: { badge: true },
};

export const NumberBadge: Story = {
  args: { badge: 2 },
};

export const SlotBadge: Story = {
  render: args => ({
    components: { Avatar },
    setup: () => ({ ...args }),
    template: `<Avatar :src="src" :name="name">
      <template #badge>JD</template>
    </Avatar>`,
  }),
};
