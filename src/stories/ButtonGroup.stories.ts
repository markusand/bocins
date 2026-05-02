import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ButtonGroup, Button, Icon, Dropdown, ActionMenu } from '/@/components';
import './assets/styles.css';

const meta = {
  title: 'ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A group of multiple buttons, often related to similar actions.',
      },
    },
  },
  argTypes: {
    width: {
      description: 'The width of the button group. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
    block: { description: 'Display the button group as a block full width element. Buttons take equal width.' },
    disabled: { description: 'Disable the buttons.' },
  },
  args: {
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

export const WithDropdowns: Story = {
  render: args => ({
    components: { ButtonGroup, Button, Icon, Dropdown, ActionMenu },
    setup: () => ({
      args,
      actions: [{
        actions: [
          { id: 'edit', label: 'Edit', onClick: () => {} },
          { id: 'duplicate', label: 'Duplicate', onClick: () => {} },
          { id: 'archive', label: 'Archive', onClick: () => {} },
        ],
      }],
    }),
    template: `<ButtonGroup v-bind="args">
      <Button>Action</Button>
      <Dropdown label="More" icon="chevron-down.svg">
        <Button block>Edit</Button>
        <Button block>Duplicate</Button>
        <Button block>Archive</Button>
      </Dropdown>
      <ActionMenu :item="{}" :actions="actions">
        <template #toggler>
          <Button even>
            <Icon src="ellipsis.svg" />
          </Button>
        </template>
      </ActionMenu>
    </ButtonGroup>`,
  }),
};
