import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Stepper } from '/@/components';
import './assets/styles.scss';

const meta = {
  title: 'Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Increase or decrease a numerical value.',
      },
    },
  },
  argTypes: {
    placeholder: { description: 'The placeholder text to display when the input is empty.' },
    clearable: { description: 'Enable the clear button.' },
    disabled: { description: 'Disable the input.' },
    invalid: { description: 'Set state to invalid.' },
    block: { description: 'Display as a block input.' },
    width: {
      description: 'The width of the input. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
    min: { description: 'The minimum value.' },
    max: { description: 'The maximum value.' },
    step: { description: 'The interval between numbers when increasing or decreasing.' },
  },
  args: {
    min: 0,
    max: 99,
    step: 1,
    width: undefined,
    placeholder: 'Number',
    clearable: false,
    disabled: false,
    invalid: false,
    block: false,
  },
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: 18 },
  render: args => ({
    components: { Stepper },
    setup: () => {
      const number = ref(args.modelValue);
      return { args, number };
    },
    template: '<Stepper v-bind="args" v-model="number" />',
  }),
};
