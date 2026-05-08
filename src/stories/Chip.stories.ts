import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Chip, Icon } from '/@/components';
import './assets/styles.css';

const meta = {
  title: 'Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A small, interactive representation of an item or attribute.',
      },
    },
  },
  argTypes: {
    action: { description: 'The function to be called when the action button is clicked. Enables the action button' },
    text: { description: 'The text to display on the chip.' },
  },
  args: {
    text: 'Chip',
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const Colored: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Assign color to chips.',
      },
    },
  },
  render: () => ({
    components: { Chip },
    setup: () => {
      const colors = ['red', 'blue', 'green'];
      return { colors };
    },
    template: `<div class="toolbar">
      <Chip
        v-for="i in colors.length"
        :key="i"
        :text="colors[i-1]"
        :style="\`--color:\${colors[i-1]}\`" />
    </div>`,
  }),
};

export const ActionFunction: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Specify a function to be called when the action button is clicked.',
      },
    },
  },
  args: { action: console.log },
};

export const CustomAction: Story = {
  args: { action: console.log },
  render: args => ({
    components: { Chip, Icon },
    setup: () => ({ ...args }),
    template: `<Chip :action="action">
      <template #action>
        <Icon src="arrow-right.svg" size="small" />
      </template>
      Content
    </Chip>`,
  }),
};
