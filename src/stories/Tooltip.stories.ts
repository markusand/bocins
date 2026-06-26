import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Tooltip } from '/@/components';
import './assets/styles.css';

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
      control: { type: 'select' },
      options: [
        'top-left', 'top-in-left', 'top', 'top-in-right', 'top-right',
        'right-in-top', 'right', 'right-in-bottom',
        'bottom-right', 'bottom-in-right', 'bottom', 'bottom-in-left', 'bottom-left',
        'left-in-bottom', 'left', 'left-in-top',
      ],
    },
    width: {
      description: 'The width of the tooltip. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
  },
  args: {
    text: 'Bold (⌘B)',
    position: 'top',
    width: undefined,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use the content slot to render rich tooltip content.',
      },
    },
  },
  render: args => ({
    components: { Tooltip },
    setup: () => ({ args }),
    template: `<div>
      <Tooltip v-bind="args">
        <template #content>
          <h3>Pro plan</h3>
          Unlimited projects, custom domains,<br>and priority support.
        </template>
        <span style="border-bottom:1px dashed currentcolor; cursor:help">Pro</span>
      </Tooltip>
      plan members can invite up to 50 collaborators.
    </div>`,
  }),
};
