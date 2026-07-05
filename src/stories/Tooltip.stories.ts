import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Tooltip, Button } from '/@/components';
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
        'top-left', 'top-start', 'top', 'top-end', 'top-right',
        'left', 'left-start', 'left-end',
        'right', 'right-start', 'right-end',
        'bottom-left', 'bottom-start', 'bottom', 'bottom-end', 'bottom-right',
      ],
    },
    width: {
      description: 'The width of the tooltip. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
    hoverable: {
      description: 'Open the popover on hover instead of click.',
    },
  },
  args: {
    text: 'Bold (⌘B)',
    position: 'top',
    width: undefined,
    hoverable: false,
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

export const WithButton: Story = {
  render: args => ({
    components: { Tooltip, Button },
    setup: () => ({ args }),
    template: `<div class="toolbar">
      <Tooltip position="top" text="Discard changes" hoverable>
        <Button flat>Cancel</Button>
      </Tooltip>
      <Tooltip position="top" text="Save changes" hoverable>
        <Button>Save</Button>
      </Tooltip>
    </div>`,
  }),
};

