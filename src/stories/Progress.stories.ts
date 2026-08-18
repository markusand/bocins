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
        component: 'Visualize the completion status of a task, linearly or as a ring.',
      },
    },
  },
  argTypes: {
    value: { description: 'Current value. Omit for indeterminate state.', control: 'number' },
    max: { description: 'Maximum value.', control: 'number' },
    ring: { description: 'Display as a ring instead of a linear bar.' },
  },
  args: {
    value: 65,
    max: 100,
    ring: false,
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

export const Ring: Story = {
  render: args => ({
    components: { Progress },
    setup: () => ({ args }),
    template: '<Progress v-bind="args" ring />',
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
    template: `<Progress v-bind="args" style="
      --progress-color: #5a4;
      --progress-track-color: #5a43;
    " />`,
  }),
};

export const RangeColors: Story = {
  parameters: {
    docs: {
      description: {
        story: `Use \`--progress-color-low\`, \`--progress-color-mid\`, \
\`--progress-color-high\`, and \`--progress-color-complete\` \
to color by range. Falls back to \`--progress-color\` if unset.`,
      },
    },
  },
  render: () => ({
    components: { Progress },
    template: `<div style="
      display: flex; flex-direction: column; gap: 0.75rem;
      --progress-color-low: #e53;
      --progress-color-mid: #f90;
      --progress-color-high: #5a4;
      --progress-color-complete: #07d;
    ">
      <Progress :value="15" />
      <Progress :value="50" />
      <Progress :value="80" />
      <Progress :value="100" />
    </div>`,
  }),
};

export const PartialRangeColors: Story = {
  parameters: {
    docs: {
      description: {
        story: `Only some range colors set. Unset ranges fall back \
to \`--progress-color\`.`,
      },
    },
  },
  render: () => ({
    components: { Progress },
    template: `<div style="
      display: flex; flex-direction: column; gap: 0.75rem;
      --progress-color: #888;
      --progress-color-complete: #07d;
    ">
      <Progress :value="20" />
      <Progress :value="50" />
      <Progress :value="80" />
      <Progress :value="100" />
    </div>`,
  }),
};
