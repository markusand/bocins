import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Stepper } from '/@/components';

const meta = {
  title: 'Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
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
