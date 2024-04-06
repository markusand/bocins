import type { Meta, StoryObj } from '@storybook/vue3';
import { Carousel } from '/@/components';

const items = [
  'https://images.unsplash.com/photo-1639182946622-7de9d7efa6b4?q=80&h=700',
  'https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&h=500',
  'https://images.unsplash.com/photo-1644891153709-188147e8e8d6?q=80&h=700',
  'https://images.unsplash.com/photo-1470165511815-34e78ff7a111?q=80&h=500',
];

const meta = {
  title: 'Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Display a set of content in a rotating fashion',
      },
    },
  },
  argTypes: {
    items: { description: 'List of slides of the carousel' },
    controls: {
      description: 'The position of the controls. If not set, the controls will be hidden.',
      options: [undefined, 'top', 'bottom', 'bottom-left', 'bottom-right', 'top-left', 'top-right'],
      control: { type: 'select' },
    },
    interval: {
      description: 'The interval between each slide in seconds. If 0, the carousel will not rotate automatically.',
      control: { type: 'number' },
    },
  },
  args: {
    items,
    interval: 0,
    controls: 'bottom',
  },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
  render: args => ({
    components: { Carousel },
    setup: () => ({ args }),
    template: `<Carousel v-bind="args" style="height:400px">
      <template #default="{ item }">
        <img :src="item" style="display:block;height:100%;width:100%;object-fit:cover" />
      </template>
    </Carousel>`,
  }),
};
