import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Toggler } from '/@/components';
import './assets/styles.scss';

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
    radio: { description: 'Allow only selection of a single option.' },
    invalid: { description: 'Set state to invalid.' },
    disabled: { description: 'Disable the button.' },
    block: { description: 'Display as a block input.' },
    value: { description: 'The value that the button enables.' },
  },
  args: {
    label: 'Toggler',
    radio: false,
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
    radio: true,
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
