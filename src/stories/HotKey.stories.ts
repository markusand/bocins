import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { HotKey } from '/@/components';
import './assets/styles.css';

const meta = {
  title: 'HotKey',
  component: HotKey,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Displays a keyboard shortcut and fires events when the combo is pressed.',
      },
    },
  },
  argTypes: {
    keys: { description: 'The keyboard combo to listen for, keys separated by `+` (e.g. `meta+k`).' },
  },
  args: {
    keys: 'ctrl+k',
  },
} satisfies Meta<typeof HotKey>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const SingleKey: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A single key with no modifiers.',
      },
    },
  },
  args: { keys: 'escape' },
};

export const WithModifiers: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modifier keys are rendered as icons.',
      },
    },
  },
  args: { keys: 'ctrl+shift+p' },
};

export const Combos: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Several hotkeys side by side.',
      },
    },
  },
  render: () => ({
    components: { HotKey },
    template: `
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <HotKey keys="meta + k" />
        <HotKey keys="ctrl + shift + p" />
        <HotKey keys="escape" />
        <HotKey keys="alt + tab" />
        <HotKey keys="alt + tab" />
        <HotKey keys="enter" />
      </div>
    `,
  }),
};
