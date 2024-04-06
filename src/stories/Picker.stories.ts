import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Picker, type PickerProps } from '/@/components';
import UserProfile from './UserProfile.vue';
import { users, type User } from '/@/stories/assets/users';

const formatters = [undefined, (item: any) => item.name];

const args = {
  options: users,
  keyAttr: 'name',
  formatter: formatters[1],
  columns: 0,
  invalid: false,
  disabled: false,
} satisfies PickerProps<User>;

const meta = {
  title: 'Picker',
  component: Picker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Select or pick values from a set of options.',
      },
    },
  },
  argTypes: {
    options: { description: 'List of options to display.' },
    keyAttr: { description: 'A key attribute used to uniquely identify each option.' },
    columns: { description: 'The number of columns to arrange the toggler items in' },
    invalid: { description: 'Set state to invalid.' },
    disabled: { description: 'Disable the picker.' },
    formatter: {
      description: 'The formatter function to display options in a custom format.',
      control: 'select',
      options: formatters,
    },
  },
  // @ts-expect-error keyAttr is not infered from generic 
  args,
} satisfies Meta<typeof Picker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: [] },
  render: args => ({
    components: { Picker },
    setup: () => {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: '<Picker v-bind="args" v-model="value" />',
  }),
};

export const SingleChoice: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Allow only one option to be selected.',
      },
    },
  },
  args: {
    modelValue: undefined,
  },
  render: args => ({
    components: { Picker },
    setup: () => {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: '<Picker v-bind="args" v-model="value" />',
  }),
};


export const CustomOption: Story = {
  args: {
    modelValue: [],
    columns: 2,
  },
  render: args => ({
    components: { Picker, UserProfile },
    setup: () => {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `<Picker v-bind="args" v-model="value">
      <template #default="{ option: user }">
        <UserProfile :user="user" />
      </template>
    </Picker>`,
  }),
};
