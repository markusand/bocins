import type { Meta, StoryObj } from '@storybook/vue3';
import { Chip } from '/@/components';

const meta = {
  title: 'Chip',
  component: Chip,
  tags: ['autodocs'],
  args: {
    text: 'Chip',
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const CloseFunction: Story = {
  args: { close: console.log },
};

export const Slots: Story = {
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
