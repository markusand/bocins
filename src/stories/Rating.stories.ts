import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Rating, Icon } from '/@/components';
import './assets/styles.scss';

const meta = {
  title: 'Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Provide feedback or rate items.',
      },
    },
  },
  argTypes: {
    max: {
      description: 'The maximum value of the rating.',
      control: 'number',
    },
    disabled: { description: 'Disable the rating.' },
  },
  args: {
    max: 5,
    disabled: false,
  },
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: undefined },
  render: args => ({
    components: { Rating },
    setup: () => {
      const rating = ref(args.modelValue);
      return { args, rating };
    },
    template: '<Rating v-bind="args" v-model="rating" />',
  }),
};

export const HeartsRange: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use custom icons to represent your rating range.',
      },
    },
  },
  args: { modelValue: undefined },
  render: args => ({
    components: { Rating, Icon },
    setup: () => {
      const rating = ref(args.modelValue);
      return { args, rating };
    },
    template: `<Rating v-bind="args" v-model="rating">
      <Icon src="/@/stories/assets/heart.svg" />
    </Rating>`,
  }),
};

export const Emitted: Story = {
  render: () => ({
    components: { Rating },
    setup: () => {
      const onRate = (value: number) => alert(value);
      return { onRate };
    },
    template: '<Rating @rate="onRate" />',
  }),
};
