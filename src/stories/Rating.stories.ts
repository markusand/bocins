import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Rating, Icon } from '/@/components';

const meta = {
  title: 'Rating',
  component: Rating,
  tags: ['autodocs'],
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
