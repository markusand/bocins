import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Carousel } from '/@/components';
import Cover from './Cover.vue';
import './assets/styles.css';

const items = [
  { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=900', author: 'Bailey Zindel' },
  { url: 'https://images.unsplash.com/photo-1413752362258-7af2a667b590?q=80&w=900', author: 'Ales Krivec' },
  { url: 'https://images.unsplash.com/photo-1506260408121-e353d10b87c7?q=80&w=900', author: 'Claudio Testa' },
  { url: 'https://images.unsplash.com/photo-1513875528452-39400945934d?q=80&w=900', author: 'Rodrigo Soares' },
];

const meta = {
  title: 'Carousel',
  // @ts-expect-error generic component
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

export const CustomControls: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Replace the entire navigation bar with a custom layout using the <code>#controls</code> slot.',
      },
    },
  },
  render: args => ({
    components: { Carousel, Cover },
    setup: () => ({ args }),
    template: `<Carousel v-bind="args">
      <template #default="{ item }">
        <Cover :src="item.url" :license="\`photo by \${item.author} on Unsplash\`" />
      </template>
      <template #controls="{ active, goto }">
        <div style="display:flex;align-items:center;justify-content:center;gap:1rem;padding:0.5rem">
          <button type="button" :disabled="active === 0" @click.prevent="goto(active - 1)">&#8592;</button>
          <span>{{ active + 1 }} / {{ args.items.length }}</span>
          <button type="button" :disabled="active === args.items.length - 1" @click.prevent="goto(active + 1)">&#8594;</button>
        </div>
      </template>
    </Carousel>`,
  }),
};

export const CustomIndicators: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Customize each individual navigation indicator using the <code>#control</code> slot.',
      },
    },
  },
  args: { interval: 5 },
  render: args => ({
    components: { Carousel, Cover },
    setup: () => ({ args }),
    template: `<Carousel v-bind="args">
      <template #default="{ item }">
        <Cover :src="item.url" :license="\`photo by \${item.author} on Unsplash\`" />
      </template>
      <template #control="{ item, current, active, goto }">
        <button
          type="button"
          :style="{
            width: '3rem',
            aspectRatio: '1',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            opacity: current === active ? 1 : 0.5,
            padding: 0,
            overflow: 'hidden',
          }"
          @click.prevent="goto()">
          <img :src="item.url" style="width:100%;height:100%;object-fit:cover" />
        </button>
      </template>
    </Carousel>`,
  }),
};
