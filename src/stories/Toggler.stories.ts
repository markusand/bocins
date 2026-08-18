import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Toggler } from '/@/components';
import './assets/styles.css';

const meta = {
  title: 'Toggler',
  component: Toggler,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Select or deselect an option.',
      },
    },
  },
  argTypes: {
    label: { description: 'The text to display on the button.' },
    group: { description: 'Name to group toggler with (making a radio).' },
    invalid: { description: 'Set state to invalid.' },
    disabled: { description: 'Disable the button.' },
    block: { description: 'Display as a block input.' },
    value: { description: 'The value that the button enables.' },
  },
  args: {
    label: 'Toggler',
    group: undefined,
    invalid: false,
    disabled: false,
    block: false,
  },
} satisfies Meta<typeof Toggler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: false },
  render: args => ({
    components: { Toggler },
    setup: () => {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: '<Toggler v-bind="args" v-model="value" />',
  }),
};

export const Radio: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Allow only selection of a single option.',
      },
    },
  },
  args: {
    modelValue: false,
    group: 'mygroup',
  },
  render: args => ({
    components: { Toggler },
    setup: () => {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: '<Toggler v-bind="args" v-model="value">',
  }),
};
