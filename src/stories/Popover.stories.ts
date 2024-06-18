import type { Meta, StoryObj } from '@storybook/vue3';
import { Popover } from '/@/components';
import UserProfile from './UserProfile.vue';
import { users } from './assets/users';
import './assets/styles.scss';

const meta = {
  title: 'Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Display additional content when user clicks or hovers over it.',
      },
    },
  },
  argTypes: {
    position: {
      description: 'The position of the popover relative to the anchor.',
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'select' },
    },
    click: { description: 'Show the popover on click instead of hover.' },
    width: {
      description: 'The width of the popover. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
  },
  args: {
    position: 'top',
    click: false,
    width: '15',
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => ({
    components: { Popover, UserProfile },
    setup: () => {
      const user = users[0];
      return { args, user };
    },
    template: `<p style="margin:3rem 0">
      Lorem ipsum dolor sit 
      <Popover v-bind="args">
        <UserProfile :user="user" />
        <template #anchor>Leanne,</template>
      </Popover>
      amet consectetur adipisicing elit.
    </p>`,
  }),
};
