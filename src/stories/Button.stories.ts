import type { Meta, StoryObj } from '@storybook/vue3';
// import { fn } from '@storybook/test';
import { Button, Icon } from '/@/components';

const meta = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Trigger actions or navigate to different parts of an application with a mouse click.',
      },
    },
  },
  argTypes: {
    text: { description: 'The text to display on the button.' },
    variant: {
      description: 'The variant to use for the button.',
      control: 'select',
      options: [undefined, 'ghost', 'flat'],
    },
    size: {
      description: 'The size of the button.',
      control: 'select',
      options: [undefined, 'small', 'large'],
    },
    width: {
      description: 'The width of the button. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
    block: { description: 'Display the button as a block full width element.' },
    even: { description: 'Display the button with even padding, useful when the only content is an icon.' },
    disabled: { description: 'Disable the button.' },
  },
  args: {
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

export const Base: Story = {
  render: args => ({
    components: { Button, Icon },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const IconButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Display a button with only an icon.',
      },
    },
  },
  render: args => ({
    components: { Button, Icon },
    setup: () => ({ args }),
    template: '<Button even><Icon src="/@/stories/assets/feather.svg" /></Button>',
  }),
};
