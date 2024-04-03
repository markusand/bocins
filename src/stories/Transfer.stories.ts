import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Transfer, type TransferProps } from '/@/components';
import UserProfile from './UserProfile.vue';
import { users, type User } from '/@/stories/assets/users';

const formatters = [undefined, (item: any) => item.name];

const args = {
  limit: 0,
  options: users,
  keyAttr: 'name',
  formatter: formatters[1],
  search: undefined,
  searchText: 'Search user...',
  emptyText: 'No users found',
  invalid: false,
  disabled: false,
} satisfies TransferProps<User>;

const meta = {
  title: 'Transfer',
  component: Transfer,
  tags: ['autodocs'],
  argTypes: {
    formatter: {
      control: 'select',
      options: formatters,
    },
    search: {
      control: 'select',
      options: [undefined, (user: User) => `${user.name} ${user.surname} ${user.email}`],
    },
  },
  // @ts-expect-error keyAttr is not infered from generic 
  args,
} satisfies Meta<typeof Transfer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: [] },
  render: args => ({
    components: { Transfer },
    setup: () => {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: '<Transfer v-bind="args" v-model="value" />',
  }),
};

export const SlotContent: Story = {
  args: {
    modelValue: [],
    limit: 4,
    search: (user: User) => `${user.name} ${user.surname} ${user.email}`,
  },
  render: args => ({
    components: { Transfer, UserProfile },
    setup: () => {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `<Transfer v-bind="args" v-model="value">
      <template #default="{ option: user }">
        <UserProfile :user="user" />
      </template>
    </Transfer>`,
  }),
};
