import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Toggler } from '/@/components';

const meta = {
  title: 'Toggler',
  component: Toggler,
  tags: ['autodocs'],
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
