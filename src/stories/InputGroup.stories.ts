import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { InputGroup, Input, Stepper, Selector, Button } from '/@/components';
import UserProfile from './UserProfile.vue';
import { users } from './assets/users';

const meta = {
  title: 'InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
  },
  args: {
    block: false,
    disabled: false,
    width: '',
  },
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => ({
    components: { InputGroup, Input, Stepper, Selector, Button, UserProfile },
    setup: () => {
      const text = ref('');
      const number = ref(0);
      const user = ref(undefined);
      return { args, text, number, user, users };
    },
    template: `<InputGroup v-bind="args">
      <Input v-model="text" width="8" clearable />
      <Stepper v-model="number" width="6" />
      <Selector v-model="user" :options="users" right>
        <template #default="{ item: user }">
          <div style="padding:0.25rem 0.5rem">{{ user.name }}</div>
        </template>
      </Selector>
      <Button>Submit</Button>
    </InputGroup>`,
  }),
};
