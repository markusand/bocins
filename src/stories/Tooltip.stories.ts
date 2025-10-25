import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Tooltip } from '/@/components';
import './assets/styles.scss';

const meta = {
  title: 'Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Display additional content when user clicks or hovers over it.',
      },
    },
  },
  argTypes: {
    text: { description: 'The text to display in the tooltip.' },
    position: {
      description: 'The position of the popover relative to the anchor.',
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'select' },
    },
    click: { description: 'Show the tooltip on click instead of hover.' },
    width: {
      description: 'The width of the tooltip. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
  },
  args: {
    text: 'Lorem ipsum dolor sit amet.',
    position: 'top',
    click: false,
    width: '12',
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => ({
    components: { Tooltip },
    setup: () => ({ args }),
    template: `<p style="margin:5rem 0">
      Lorem ipusm dolor sit
      <Tooltip v-bind="args">amet</Tooltip>
      consectetur adipisicing elit.
    </p>`,
  }),
};

export const WithSlot: Story = {
  render: args => ({
    components: { Tooltip },
    setup: () => ({ args }),
    template: `<p style="margin:5rem 0">
      Lorem ipusm dolor sit
      <Tooltip v-bind="args">
        <template #content>
          <h3>Tooltip title</h3>
          <p>Lorem ipsum dolor sit amet</p>
        </template>
        amet
      </Tooltip>
      consectetur adipisicing elit.
    </p>`,
  }),
};
