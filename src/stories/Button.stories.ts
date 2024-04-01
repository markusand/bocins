import type { Meta, StoryObj } from '@storybook/vue3';
// import { fn } from '@storybook/test';
import { Button, Icon } from '/@/components';

const meta = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [undefined, 'ghost', 'flat'],
    },
    size: {
      control: 'select',
      options: [undefined, 'small', 'large'],
    },
    width: { control: 'text' },
  },
  args: {
    text: 'Button',
    variant: undefined,
    size: undefined,
    width: undefined,
    block: false,
    even: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const IconButton: Story = {
  render: args => ({
    components: { Button, Icon },
    setup: () => ({ args }),
    template: '<Button even><Icon src="/@/stories/assets/feather.svg" /></Button>',
  }),
};
