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
  parameters: {
    docs: {
      description: {
        component: 'Move items between two lists or containers.',
      },
    },
  },
  argTypes: {
    options: { description: 'List of options to display.' },
    keyAttr: { description: 'Key to use to identify each item.' },
    limit: { description: 'Limit the number of items that can be selected. 0 means no limit.' },
    searchText: { description: 'Text to display on the search input.' },
    emptyText: { description: 'Text to display when there are no items in the list.' },
    formatter: {
      description: 'Customize the item format.',
      control: 'select',
      options: formatters,
    },
    search: {
      description: 'Customize the content that can be searched.',
      control: 'select',
      options: [undefined, (user: User) => `${user.name} ${user.surname} ${user.email}`],
    },
    invalid: { description: 'Set as invalid state.' },
    disabled: { description: 'Set as disabled state.' },
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

export const CustomOption: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Customize the option format.',
      },
    },
  },
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
