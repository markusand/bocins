import type { Meta, StoryObj } from '@storybook/vue3';
import { Divider } from '/@/components';

const meta = {
  title: 'Divider',
  component: Divider,
  tags: ['autodocs'],
  args: {
    label: '',
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const Slot: Story = {
  render: args => ({
    components: { Divider },
    setup: () => ({ args }),
    template: '<Divider>Divider Slot</Divider>',
  }),  
};
