import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Button, Icon } from '/@/components';
import './assets/styles.css';

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
    ghost: { description: 'Display the button with a ghost variant (no background, colored border).' },
    flat: { description: 'Display the button with a flat variant (no background, no border).' },
    sm: { description: 'Display the button in small size.' },
    lg: { description: 'Display the button in large size.' },
    width: {
      description: 'The width of the button. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
    block: { description: 'Display the button as a block full width element.' },
    even: { description: 'Display the button with even padding, useful when the only content is an icon.' },
    disabled: { description: 'Disable the button.' },
  },
  args: {
    ghost: false,
    flat: false,
    sm: false,
    lg: false,
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

export const WithIcon: Story = {
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
    template: `<Button>
      <Icon src="/@/stories/assets/feather.svg" />
      Button
    </Button>`,
  }),
};

export const OnlyIcon: Story = {
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
    template: `<Button even>
      <Icon src="/@/stories/assets/feather.svg" />
    </Button>`,
  }),
};

export const CustomColor: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Customize the button color using the `--btn-color` CSS custom property.',
      },
    },
  },
  render: args => ({
    components: { Button },
    setup: () => ({ args }),
    template: `
      <Button v-bind="args" style="--btn-color: #e34">Button</Button>
      &nbsp;
      <Button v-bind="args" style="--btn-color: #e34" ghost>Button</Button>
      &nbsp;
      <Button v-bind="args" style="--btn-color: #e34" flat>Button</Button>
    `,
  }),
};
