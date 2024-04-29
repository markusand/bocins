import type { Meta, StoryObj } from '@storybook/vue3';
import { Chip } from '/@/components';

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
    close: { description: 'The function to be called when the close button is clicked. Enables the close button' },
    text: { description: 'The text to display on the chip.' },
  },
  args: {
    text: 'Chip',
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const CloseFunction: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Specify a function to be called when the close button is clicked.',
      },
    },
  },
  args: { close: console.log },
};

export const CustomClose: Story = {
  args: { close: console.log },
  render: args => ({
    components: { Chip },
    setup: () => ({ ...args }),
    template: `<Chip :close="close">
      <template #close>Close</template>
      Content
    </Chip>`,
  }),
};
