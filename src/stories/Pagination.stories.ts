import type { Meta, StoryObj } from '@storybook/vue3';
import { Pagination } from '/@/components';
import './assets/styles.scss';

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
    pages: 10,
    truncate: 3,
    controls: false,
    disabled: false,
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
