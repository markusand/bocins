import type { Meta, StoryObj } from '@storybook/vue3';
import { TreeList, type TreeNode, type TreeListProps } from '/@/components';
import UserProfile from './UserProfile.vue';
import { users, type User } from './assets/users';

type Team = {
  name: string;
  users: User[];
};

type Department = {
  name: string;
  users: (Team | User)[];
};

const teams: TreeNode<Department, 'users'>[] = [...Array(3).keys()].map(i => ({
  name: `Department #${i}`,
  users: Object.values(users.reduce((acc, user) => {
    if (!acc[user.area]) acc[user.area] = { name: user.area, users: [] };
    acc[user.area].users.push(user as User);
    return acc;
  }, {} as Record<string, Team>)),
}));

const props = {
  schema: teams,
  nameNode: 'name',
  childrenNode: 'users',
  open: false,
} satisfies TreeListProps<Department, 'users'>;

const meta = {
  title: 'TreeList',
  component: TreeList,
  tags: ['autodocs'],
  // @ts-expect-error TS doesn't infer args properly
  args: props,
} satisfies Meta<typeof TreeList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => ({
    components: { TreeList, UserProfile },
    setup: () => ({ args }),
    template: `<TreeList v-bind="args">
      <template #title="{ item, parent }">
        {{ item.name }} ({{ item.users.length }})
      </template>
      <template #default="{ item, parent }">
        <UserProfile v-if="'id' in item" :user="item" />
      </template>
    </TreeList>`,
  }),
};

