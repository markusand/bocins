import type { Meta, StoryObj } from '@storybook/vue3';
import { Dropdown, Button, Icon } from '/@/components';

const meta = {
  title: 'Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
  },
  args: {
    top: false,
    right: false,
    block: false,
    disabled: false,
    toggler: {
      text: '',
      variant: undefined,
      size: undefined,
    },
    width: '',
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => ({
    components: { Dropdown },
    setup: () => ({ args }),
    template: `<Dropdown v-bind="args">
      Content
    </Dropdown>`,
  }),
};

export const SlotToggler: Story = {
  render: args => ({
    components: { Dropdown, Button, Icon },
    setup: () => ({ args }),
    template: `<Dropdown v-bind="args">
      <template #toggler>
        <Button even>
          <Icon src="/@/stories/assets/more.svg" />
        </Button>
      </template>
      Content
    </Dropdown>`,
  }),
};
