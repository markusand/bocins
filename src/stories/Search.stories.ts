import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Search } from '/@/components';

const meta = {
  title: 'Search',
  component: Search,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    width: { control: 'text' },
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
