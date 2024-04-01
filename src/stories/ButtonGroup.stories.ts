import type { Meta, StoryObj } from '@storybook/vue3';
import { ButtonGroup, Button } from '/@/components';

const meta = {
  title: 'ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: [undefined, 'ghost', 'flat'],
    },
    width: { control: 'text' },
  },
  args: {
    variant: undefined,
    block: false,
    disabled: false,
    width: '',
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => ({
    components: { ButtonGroup, Button },
    setup: () => ({ args }),
    template: `<ButtonGroup v-bind="args">
      <Button>Text</Button>
      <Button>Text</Button>
      <Button>Text</Button>
    </ButtonGroup>`,
  }),
};
