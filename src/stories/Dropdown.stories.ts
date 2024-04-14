import type { Meta, StoryObj } from '@storybook/vue3';
import { Dropdown, Button, Icon } from '/@/components';

const meta = {
  title: 'Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Reveal and select additional content or options hidden from view until activated.',
      },
    },
  },
  argTypes: {
    label: { description: 'The text to display on the toggler button.' },
    width: {
      description: 'The width of the dropdown. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
    top: { description: 'Align the dropdown menu to the top of the button.' },
    right: { description: 'Align the dropdown menu to the right of the button.' },
    block: { description: 'Display the dropdown menu as a block full width element.' },
    disabled: { description: 'Disable the dropdown menu.' },
    toggler: { description: 'The toggler options' },
  },
  args: {
    label: '',
    top: false,
    right: false,
    block: false,
    disabled: false,
    toggler: {
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

export const CustomToggler: Story = {
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
