import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Password } from '/@/components';

const meta = {
  title: 'Password',
  component: Password,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
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
