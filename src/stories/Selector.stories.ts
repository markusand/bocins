import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Selector, type SelectorProps, AvatarGroup, Avatar } from '/@/components';
import UserProfile from './UserProfile.vue';
import { users, type User } from './assets/users';

const formatters = [undefined, (item: any) => item.name];

const args = {
  keyAttr: 'name',
  placeholder: 'Select...',
  clearable: true,
  top: false,
  right: false,
  width: undefined,
  block: false,
  formatter: formatters[1],
  search: undefined,
  searchText: 'Search user...',
  emptyText: 'No users found',
  invalid: false,
  disabled: false,
  options: users,
} satisfies SelectorProps<User>;

const meta = {
  title: 'Selector',
  component: Selector,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
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
} satisfies Meta<typeof Selector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: undefined },
  render: args => ({
    components: { Selector },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: '<Selector v-bind="args" v-model="value" />',
  }),
};

export const MultipleSelector: Story = {
  args: {
    modelValue: [],
    placeholder: 'Select users',
  },
  render: args => ({
    components: { Selector },
    setup() {
      const values = ref(args.modelValue);
      return { args, values };
    },
    template: '<Selector v-bind="args" v-model="values" />',
  }),
};

export const SlotContent: Story = {
  args: {
    modelValue: [],
    width: 15,
  },
  render: args => ({
    components: { Selector, UserProfile, AvatarGroup, Avatar },
    setup() {
      const values = ref(args.modelValue);
      return { args, values };
    },
    template: `<Selector v-bind="args" v-model="values">
      <template #placeholder>Choose your team</template>
      <template #selections="{ items: users }">
        <AvatarGroup stacked>
          <Avatar
            v-for="user in users"
            :key="user.name"
            :src="user.avatar"
            :name="user.name"
            style="--size:1.5rem" />
        </AvatarGroup>
        {{ users[0].name }}
        <span v-if="users.length > 1">+{{ users.length - 1 }}</span>
      </template>
      <template #option="{ option: user }">
        <UserProfile :user="user" />
      </template>
    </Selector>`,
  }),
};

