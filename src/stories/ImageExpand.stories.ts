import type { Meta, StoryObj } from '@storybook/vue3';
import { ImageExpand } from '/@/components';

const meta = {
  title: 'ImageExpand',
  component: ImageExpand,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Enlarge or view an image in more detail.',
      },
    },
  },
  argTypes: {
    src: { description: 'The source of the image.' },
    thumbnail: { description: 'The source of a lowest resolution image.' },
    alt: { description: 'The alternative text for the image.' },
  },
  args: {
    src: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?q=80&w=1400',
    thumbnail: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?q=80&w=200',
    alt: 'Beach',
  },
} satisfies Meta<typeof ImageExpand>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
