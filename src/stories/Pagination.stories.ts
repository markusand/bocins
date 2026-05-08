import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Pagination } from '/@/components';
import './assets/styles.css';

const meta = {
  title: 'Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Accept user input, such as text or numbers.',
      },
    },
  },
  argTypes: {
    pages: {
      description: 'The total number of pages.',
      control: 'number',
      required: true,
    },
    truncate: {
      description: 'The number of pages to show before and after the current page.',
      control: 'number',
    },
    controls: { description: 'Display prev and next buttons.' },
    disabled: { description: 'Disable the pagination buttons.' },
  },
  args: {
    pages: 7,
    controls: false,
    disabled: false,
    truncate: undefined,
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const DotPagination: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use the default slot to render fully custom page indicators. Here each page is a dot that grows and fills when active.',
      },
    },
  },
  render: args => ({
    components: { Pagination },
    setup: () => {
      const current = ref(0);
      return { args, current };
    },
    template: `<Pagination v-bind="args" v-model="current" style="gap: 0.375rem;">
      <template #default="{ page, goTo }">
        <button
          @click="goTo(page)"
          :style="{
            width: page - 1 === current ? '1.5rem' : '0.5rem',
            height: '0.5rem',
            borderRadius: '999px',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            background: page - 1 === current ? 'var(--color-accent, #333)' : '#ccc',
            transition: 'all 0.2s ease',
          }"
        />
      </template>
    </Pagination>`,
  }),
};
