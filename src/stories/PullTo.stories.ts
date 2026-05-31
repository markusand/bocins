import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { PullTo, Icon } from '/@/components';
import './assets/styles.css';

const meta = {
  title: 'PullTo',
  component: PullTo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Detects a pull-down gesture at the top of the page and emits a `trigger` event when the pull exceeds a threshold. Intended for mobile touch interactions.',
      },
    },
  },
  argTypes: {
    threshold: {
      description: 'Distance in pixels the user must pull before the `action` event fires on release.',
      control: { type: 'number' },
    },
  },
  args: {
    threshold: 150,
  },
} satisfies Meta<typeof PullTo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Listen to the `trigger` event to respond when the user releases past the threshold. Use an async handler to track loading state.',
      },
    },
  },
  render: args => ({
    components: { PullTo, Icon },
    setup: () => {
      const count = ref(0);
      const loading = ref(false);

      const refresh = async () => {
        loading.value = true;
        await new Promise(res => setTimeout(res, 1000));
        count.value += 1;
        loading.value = false;
      };

      return { args, count, loading, refresh };
    },
    template: `
      <PullTo v-bind="args" @trigger="refresh">
        <Icon :src="loading ? 'loader-circle.svg' : 'arrow-down.svg'" />
        {{ loading ? 'Refreshing…' : 'Pull to refresh' }}
      </PullTo>
      {{ count }}
    `,
  }),
};
