import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Divider, ButtonGroup, Button, Icon } from '/@/components';
import './assets/styles.css';

const meta = {
  title: 'Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Separate or divide sections of content.',
      },
    },
  },
  argTypes: {
    label: { description: 'The text to display in the divider. If empty, the divider will not be shown.' },
  },
  args: {
    label: 'Divider',
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const DividerContent: Story = {
  render: args => ({
    components: { Divider, ButtonGroup, Button, Icon },
    setup: () => ({ args }),
    template: `<Divider style="--btn-color:#888">
      <ButtonGroup>
        <Button flat><Icon src="arrow-left.svg" /></Button>
        <Button flat><Icon src="plus.svg" /></Button>
        <Button flat><Icon src="arrow-right.svg" /></Button>
      </ButtonGroup>
    </Divider>`,
  }),  
};
