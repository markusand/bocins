import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ChipsInput } from '/@/components';
import './assets/styles.scss';

const meta = {
  title: 'ChipsInput',
  component: ChipsInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "Enter multiple values as individual 'chips', often used for tagging or categorizing items.",
      },
    },
  },
  argTypes: {
    width: {
      description: 'The width of the input. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
    separator: {
      description: 'The character(s) that triigers the addition of a new chip.',
      control: 'text',
    },
    placeholder: { description: 'The placeholder text to display when the input is empty.' },
    clearable: { description: 'Enable the clear button.' },
    suffix: { description: 'The suffix text to display after the input.' },
    disabled: { description: 'Disable the input.' },
    invalid: { description: 'Set state to invalid.' },
    block: { description: 'Display the input as a block full width element.' },
  },
  args: {
    separator: ',',
    width: undefined,
    placeholder: 'Chips field',
    clearable: true,
    suffix: '',
    disabled: false,
    invalid: false,
    block: false,
  },
} satisfies Meta<typeof ChipsInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: [] },
  render: args => ({
    components: { ChipsInput },
    setup: () => {
      const input = ref(args.modelValue);
      return { args, input };
    },
    template: '<ChipsInput v-bind="args" v-model="input" />',
  }),
};
