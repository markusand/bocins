import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Passcode } from '/@/components';
import './assets/styles.scss';

const meta = {
  title: 'Passcode',
  component: Passcode,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Accept user input, such as text or numbers.',
      },
    },
  },
  argTypes: {
    length: { description: 'The length of the passcode.' },
    invalid: { description: 'Set state to invalid.' },
    disabled: { description: 'Disable the input.' },
    numeric: { description: 'Accept only numbers.' },
  },
  args: {
    length: 5,
    invalid: false,
    disabled: false,
    numeric: false,
  },
} satisfies Meta<typeof Passcode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
