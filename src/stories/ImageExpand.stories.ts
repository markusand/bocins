import type { Meta, StoryObj } from '@storybook/vue3';
import { ImageExpand } from '/@/components';

const meta = {
  title: 'ImageExpand',
  component: ImageExpand,
  tags: ['autodocs'],
  args: {
    src: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?q=80&w=200',
    srcHd: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?q=80&w=1400',
    alt: 'Beach',
  },
} satisfies Meta<typeof ImageExpand>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
