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
  parameters: {
    docs: {
      description: {
        component: 'Select one or more items from a predefined list of options.',
      },
    },
  },
  argTypes: {
    options: { description: 'List of options to display.' },
    keyAttr: { description: 'Key to use to identify each item.' },
    search: {
      description: 'Customize what content can be searched.',
      control: 'select',
      options: [undefined, (user: User) => `${user.name} ${user.surname} ${user.email}`],
    },
    searchText: { description: 'Text to display on the search input.' },
    emptyText: { description: 'Text to display when the list is empty.' },
    invalid: { description: 'Set state to invalid.' },
    disabled: { description: 'Disable the list box.' },
    formatter: {
      description: 'The formatter function to display options in a custom format.',
      control: 'select',
      options: formatters,
    },
  },
  args,
} satisfies Meta<typeof ListBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: undefined },
  render: args => ({
    components: { ListBox },
    setup: () => {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: '<ListBox v-bind="args" v-model="value" />',
  }),
};

export const Multiple: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select multiple values',
      },
    },
  },
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

export const Search: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Enable searching in the list of options.',
      },
    },
  },
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
    template: '<ListBox v-bind="args" v-model="value" />',
  }),
};

export const CustomOption: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Display options in a custom format.',
      },
    },
  },
  args: { modelValue: [] },
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
