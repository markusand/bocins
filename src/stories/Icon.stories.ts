import type { Meta, StoryObj } from '@storybook/vue3';
import { Icon } from '/@/components';
import './assets/styles.scss';

const meta = {
  title: 'Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A visual symbol or representation of information or actions.',
      },
    },
  },
  argTypes: {
    src: { description: 'The source of the icon' },
    size: {
      description: 'The size of the icon',
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
