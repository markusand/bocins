import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Progress } from '/@/components';
import './assets/styles.css';

const meta = {
  title: 'Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Visualize the completion status of a task, linearly or as a circular ring.',
      },
    },
  },
  argTypes: {
    value: { description: 'Current value. Omit for indeterminate state.', control: 'number' },
    max: { description: 'Maximum value.', control: 'number' },
    circular: { description: 'Display as a circular ring instead of a linear bar.' },
  },
  args: {
    value: 65,
    max: 100,
    circular: false,
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Linear: Story = {
  render: args => ({
    components: { Progress },
    setup: () => ({ args }),
    template: '<Progress v-bind="args" />',
  }),
};

export const Circular: Story = {
  render: args => ({
    components: { Progress },
    setup: () => ({ args }),
    template: '<Progress v-bind="args" circular />',
  }),
};

export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Omit `value` to show an animated indeterminate state.',
      },
    },
  },
  render: args => ({
    components: { Progress },
    setup: () => ({ args }),
    template: '<Progress />',
  }),
};

export const CustomColor: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Override colors with `--progress-color` and `--progress-track-color`.',
      },
    },
  },
  render: args => ({
    components: { Progress },
    setup: () => ({ args }),
    template: '<Progress v-bind="args" style="--progress-color: #5a4; --progress-track-color: #5a43" />',
  }),
};
