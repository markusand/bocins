import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Password } from '/@/components';

const meta = {
  title: 'Password',
  component: Password,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Securely entering passwords.',
      },
    },
  },
  argTypes: {
    placeholder: { description: 'The text to display when the input is empty.' },
    clearable: { description: 'Enable the clear button.' },
    prefix: { description: 'The prefix text to display before the input.' },
    disabled: { description: 'Disable the input.' },
    invalid: { description: 'Set state to invalid.' },
    block: { description: 'Display as a block input.' },
    strength: { description: 'List of validation functions to assess the strength of the password' },
    width: {
      description: 'The width of the input. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
  },
  args: {
    width: undefined,
    placeholder: 'Password',
    clearable: true,
    prefix: '',
    disabled: false,
    invalid: false,
    block: false,
  },
} satisfies Meta<typeof Password>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: '' },
  render: args => ({
    components: { Password },
    setup: () => {
      const password = ref(args.modelValue);
      return { args, password };
    },
    template: '<Password v-bind="args" v-model="password" />',
  }),
};


const strength = [
  (pswd: string) => pswd.length > 8,
  (pswd: string) => pswd.length > 12,
  (pswd: string) => pswd.toUpperCase() !== pswd, // Has at least 1 lowecase
  (pswd: string) => pswd.toLowerCase() !== pswd, // Has at least 1 uppercase
  (pswd: string) => /\d/.test(pswd), // Has at least 1 number
  (pswd: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pswd), // Has at least 1 special character
];

export const PasswordStrength: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Display a password strength indicator based on the rules provided.',
      },
    },
  },
  args: {
    modelValue: '',
    strength,
  },
  render: args => ({
    components: { Password },
    setup: () => {
      const password = ref(args.modelValue);
      return { args, password };
    },
    template: '<Password v-bind="args" v-model="password" />',
  }),
};
