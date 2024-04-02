import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { LongText } from '/@/components';

const meta = {
  title: 'LongText',
  component: LongText,
  tags: ['autodocs'],
  argTypes: {
    cols: { control: 'text' },
    rows: { control: 'text' },
    maxLength: { control: 'number' },
  },
  args: {
    cols: '20',
    rows: '5',
    placeholder: 'LongText',
    disabled: false,
    invalid: false,
    block: false,
    indentable: false,
    maxLength: undefined,
  },
} satisfies Meta<typeof LongText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: '' },
  render: args => ({
    components: { LongText },
    setup: () => {
      const text = ref(args.modelValue);
      return { args, text };
    },
    template: '<LongText v-bind="args" v-model="text" />',
  }),
};
