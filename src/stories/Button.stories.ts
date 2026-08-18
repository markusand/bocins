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
    template: `<div class="toolbar">
      <Button v-bind="args">Save changes</Button>
      <Button v-bind="args" ghost>Discard</Button>
      <Button v-bind="args" flat>Cancel</Button>
      <Button v-bind="args" delete>Delete</Button>
    </div>`,
  }),
};

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pair an icon with a label for clearer affordance.',
      },
    },
  },
  render: args => ({
    components: { Button, Icon },
    setup: () => ({ args }),
    template: `<div class="toolbar">
      <Button v-bind="args"><Icon src="download.svg" /> Export</Button>
      <Button v-bind="args" ghost><Icon src="share.svg" /> Share</Button>
      <Button v-bind="args" flat><Icon src="pencil.svg" /> Edit</Button>
    </div>`,
  }),
};

export const OnlyIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use <code>even</code> for square icon-only buttons with balanced padding.',
      },
    },
  },
  render: args => ({
    components: { Button, Icon },
    setup: () => ({ args }),
    template: `<div class="toolbar">
      <Button v-bind="args" even><Icon src="settings.svg" /></Button>
      <Button v-bind="args" even ghost><Icon src="bell.svg" /></Button>
      <Button v-bind="args" even flat><Icon src="search.svg" /></Button>
    </div>`,
  }),
};

export const CustomColor: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Override the button color with the <code>--btn-color</code> CSS custom property.',
      },
    },
  },
  render: args => ({
    components: { Button, Icon },
    setup: () => ({ args }),
    template: `<div class="toolbar" style="--btn-color:#0ea5e9">
      <Button v-bind="args"><Icon src="cloud.svg" /> Deploy</Button>
      <Button v-bind="args" ghost><Icon src="cloud.svg" /> Deploy</Button>
      <Button v-bind="args" flat><Icon src="cloud.svg" /> Deploy</Button>
    </div>`,
  }),
};
