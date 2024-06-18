import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { LongText } from '/@/components';
import './assets/styles.scss';

const meta = {
  title: 'LongText',
  component: LongText,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Multi-line input field to enter and edit large amounts of text.',
      },
    },
  },
  argTypes: {
    placeholder: { description: 'The text to display when the input is empty.' },
    indentable: { description: 'Enable text indentation.' },
    width: {
      description: 'The width of the input. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
    height: {
      description: 'The height of the input. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
    maxLength: {
      description: 'The maximum length of the input.',
      control: 'number',
    },
    disabled: { description: 'Disable the input.' },
    invalid: { description: 'Set state to invalid.' },
    block: { description: 'Display as a block input.' },
  },
  args: {
    width: '20',
    height: '5',
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
