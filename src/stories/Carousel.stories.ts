import type { Meta, StoryObj } from '@storybook/vue3';
import { Carousel } from '/@/components';
import Cover from './Cover.vue';
import './assets/styles.scss';

const items = [
  { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=900', author: 'Bailey Zindel' },
  { url: 'https://images.unsplash.com/photo-1413752362258-7af2a667b590?q=80&w=900', author: 'Ales Krivec' },
  { url: 'https://images.unsplash.com/photo-1506260408121-e353d10b87c7?q=80&w=900', author: 'Claudio Testa' },
  { url: 'https://images.unsplash.com/photo-1513875528452-39400945934d?q=80&w=900', author: 'Rodrigo Soares' },
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
    components: { Carousel, Cover },
    setup: () => ({ args }),
    template: `<Carousel v-bind="args">
      <template #default="{ item }">
        <Cover :src="item.url" :license="\`photo by \${item.author} on Unsplash\`" />
      </template>
    </Carousel>`,
  }),
};
