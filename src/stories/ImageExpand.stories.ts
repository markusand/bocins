import type { Meta, StoryObj } from '@storybook/vue3';
import { ImageExpand } from '/@/components';
import './assets/styles.scss';

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
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1400',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=200',
    alt: 'photo by Bailey Zindel on Unsplash',
  },
} satisfies Meta<typeof ImageExpand>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
