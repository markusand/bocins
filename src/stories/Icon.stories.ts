import type { Meta, StoryObj } from '@storybook/vue3';
import { Icon } from '/@/components';

const meta = {
  title: 'Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: [undefined, 'small', 'medium', 'large'],
    },
  },
  args: {
    src: '/@/stories/assets/feather.svg',
    size: undefined,
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
