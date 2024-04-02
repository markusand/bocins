import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Input, Icon } from '/@/components';

const meta = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'color', 'password', 'datetime-local', 'email', 'month', 'number', 'search', 'tel', 'time', 'url', 'week'],
    },
    width: { control: 'text' },
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

export const Prefixed: Story = {
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
