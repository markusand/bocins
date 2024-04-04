import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ListBox, type ListBoxProps } from '/@/components';
import UserProfile from './UserProfile.vue';
import { users, type User } from '/@/stories/assets/users';

const formatters = [undefined, (item: any) => item.name];

const args = {
  options: users,
  keyAttr: 'name',
  formatter: formatters[1],
  search: undefined,
  searchText: 'Search user...',
  emptyText: 'No users found',
  invalid: false,
  disabled: false,
} satisfies ListBoxProps<User>;

const meta = {
  title: 'ListBox',
  component: ListBox,
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
  args,
} satisfies Meta<typeof ListBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: [] },
  render: args => ({
    components: { ListBox },
    setup: () => {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: '<ListBox v-bind="args" v-model="value" />',
  }),
};

export const SlotContent: Story = {
  args: {
    modelValue: [],
    search: (user: User) => `${user.name} ${user.surname} ${user.email}`,
  },
  render: args => ({
    components: { ListBox, UserProfile },
    setup: () => {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `<ListBox v-bind="args" v-model="value">
      <template #default="{ option: user }">
        <UserProfile :user="user" />
      </template>
    </ListBox>`,
  }),
};
