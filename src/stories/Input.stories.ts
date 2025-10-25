import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Input, Icon } from '/@/components';
import './assets/styles.scss';

const meta = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Accept user input, such as text or numbers.',
      },
    },
  },
  argTypes: {
    type: {
      description: 'The type of input content.',
      control: 'select',
      options: ['text', 'color', 'password', 'datetime-local', 'email', 'month', 'number', 'search', 'tel', 'time', 'url', 'week'],
    },
    placeholder: { description: 'The placeholder text to display when the input is empty.' },
    clearable: { description: 'Enable the clear button.' },
    prefix: { description: 'The prefix text to display before the input.' },
    suffix: { description: 'The suffix text to display after the input.' },
    disabled: { description: 'Disable the input.' },
    invalid: { description: 'Set state to invalid.' },
    block: { description: 'Display as a block input.' },
    width: {
      description: 'The width of the input. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
  },
  args: {
    type: 'text',
    width: undefined,
    placeholder: 'Input field',
    clearable: true,
    prefix: '',
    suffix: '',
    disabled: false,
    invalid: false,
    block: false,
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: '' },
  render: args => ({
    components: { Input },
    setup: () => {
      const input = ref(args.modelValue);
      return { args, input };
    },
    template: '<Input v-bind="args" v-model="input" />',
  }),
};

export const Prefix: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Add content to the start (or end) of the input.',
      },
    },
  },
  args: { modelValue: '' },
  render: args => ({
    components: { Input, Icon },
    setup: () => {
      const input = ref(args.modelValue);
      return { args, input };
    },
    template: `<Input v-bind="args" v-model="input">
      <template #prefix>
        <Icon src="/@/stories/assets/feather.svg" />
      </template>`,
  }),
};
