import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { InputGroup, Input, Stepper, Selector, Button, Icon, Tooltip, Popover } from '/@/components';
import UserProfile from './UserProfile.vue';
import { users } from './assets/users';
import './assets/styles.css';

const meta = {
  title: 'InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Group and style multiple input elements together.',
      },
    },
  },
  argTypes: {
    width: {
      description: 'The width of the input group. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
    block: { description: 'Display as a block input group.' },
    disabled: { description: 'Disable the input group.' },
  },
  args: {
    block: false,
    disabled: false,
    width: '',
  },
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithOverlays: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Inputs and buttons wrapped in Tooltip or Popover components are styled correctly within a group.',
      },
    },
  },
  render: args => ({
    components: { InputGroup, Input, Selector, Button, Icon, Tooltip, Popover },
    setup: () => {
      const query = ref('');
      const category = ref(undefined);
      return { args, query, category, categories: ['All', 'Docs', 'Images', 'Videos'] };
    },
    template: `<InputGroup v-bind="args">
      <Tooltip text="Category">
        <Selector v-model="category" :options="categories" width="7" />
      </Tooltip>
      <Popover>
        <template #anchor>
          <Input v-model="query" placeholder="Search…" width="12" clearable />
        </template>
        <div style="padding: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem">
          <label style="font-size: 0.85em; font-weight: 600; opacity: 0.7">Sort by</label>
          <Selector :options="['Relevance', 'Date', 'Title']" width="10" />
        </div>
      </Popover>
      <Tooltip text="Search">
        <Button even><Icon src="search.svg" /></Button>
      </Tooltip>
    </InputGroup>`,
  }),
};

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
      <Selector
        v-model="user"
        :options="users"
        :formatter="user => user.name"
        width="10"
        right
      />
      <Button>Submit</Button>
    </InputGroup>`,
  }),
};
