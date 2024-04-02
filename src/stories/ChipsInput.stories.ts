import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ChipsInput } from '/@/components';

const meta = {
  title: 'ChipsInput',
  component: ChipsInput,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    separator: { control: 'text' },
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
