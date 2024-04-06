import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Search } from '/@/components';

const meta = {
  title: 'Search',
  component: Search,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Enter search queries to retrieve relevant results from a dataset or database.',
      },
    },
  },
  argTypes: {
    clearable: { description: 'Enable the clear button.' },
    block: { description: 'Display as a block input.' },
    disabled: { description: 'Disable the input.' },
    invalid: { description: 'Set state to invalid.' },
    suffix: { description: 'The suffix text to display after the input.' },
    placeholder: {
      description: 'The text to display when the input is empty.',
      control: 'text',
    },
    width: {
      description: 'The width of the input. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
  },
  args: {
    width: undefined,
    placeholder: 'Search...',
    clearable: true,
    suffix: '',
    disabled: false,
    invalid: false,
    block: false,
  },
} satisfies Meta<typeof Search>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: '' },
  render: args => ({
    components: { Search },
    setup: () => {
      const search = ref(args.modelValue);
      return { args, search };
    },
    template: '<Search v-bind="args" v-model="search" />',
  }),
};
