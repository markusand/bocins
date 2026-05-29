import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ChipsInput } from '/@/components';
import './assets/styles.css';

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

export const WithValues: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pre-populated with existing values.',
      },
    },
  },
  args: {
    modelValue: ['Vue', 'TypeScript', 'Vite'],
    placeholder: 'Add technology…',
  },
  render: args => ({
    components: { ChipsInput },
    setup: () => {
      const input = ref([...args.modelValue]);
      return { args, input };
    },
    template: '<ChipsInput v-bind="args" v-model="input" />',
  }),
};

export const EmailRecipients: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use a space or comma as separator for email-style recipient input.',
      },
    },
  },
  args: {
    modelValue: ['alice@company.com', 'bob@company.com'],
    placeholder: 'Add recipient…',
    separator: ' ',
    width: 20,
  },
  render: args => ({
    components: { ChipsInput },
    setup: () => {
      const input = ref([...args.modelValue]);
      return { args, input };
    },
    template: '<ChipsInput v-bind="args" v-model="input" />',
  }),
};
