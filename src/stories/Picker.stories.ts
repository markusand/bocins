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
  argTypes: {
    formatter: {
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


export const SlotContent: Story = {
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
