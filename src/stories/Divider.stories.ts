import type { Meta, StoryObj } from '@storybook/vue3';
import { Divider } from '/@/components';
import './assets/styles.scss';

const meta = {
  title: 'Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Separate or divide sections of content.',
      },
    },
  },
  argTypes: {
    label: { description: 'The text to display in the divider. If empty, the divider will not be shown.' },
  },
  args: {
    label: '',
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const DividerContent: Story = {
  render: args => ({
    components: { Divider },
    setup: () => ({ args }),
    template: '<Divider>Divider Slot</Divider>',
  }),  
};
