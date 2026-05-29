import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ButtonGroup, Button, Icon, ActionMenu, Tooltip, Popover } from '/@/components';
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
      <Button>Day</Button>
      <Button>Week</Button>
      <Button>Month</Button>
    </ButtonGroup>`,
  }),
};

export const WithDropdowns: Story = {
  render: args => ({
    components: { ButtonGroup, Button, Icon, ActionMenu },
    setup: () => {
      const current = ref({ label: 'Publish', icon: 'send.svg', onClick: console.log });
      const actions = [{
        actions: [
          { id: 'publish', label: 'Publish', icon: 'send.svg', onClick: () => { current.value = { label: 'Publish', icon: 'send.svg', onClick: console.log }; } },
          { id: 'schedule', label: 'Schedule', icon: 'calendar.svg', onClick: () => { current.value = { label: 'Schedule', icon: 'calendar.svg', onClick: console.log }; } },
          { id: 'draft', label: 'Draft', icon: 'file.svg', onClick: () => { current.value = { label: 'Draft', icon: 'file.svg', onClick: console.log }; } },
        ],
      }, {
        actions: [
          { id: 'discard', label: 'Discard', icon: 'trash.svg', attrs: { delete: true }, onClick: console.log },
        ],
      }];
      return { args, actions, current };
    },
    template: `<ButtonGroup v-bind="args">
      <Button @click="console.log">
        <Icon :src="current.icon" />{{ current.label }}
      </Button>
      <ActionMenu :item="{}" :actions="actions">
        <template #toggler="{ open }">
          <Button even @click="open">
            <Icon src="chevron-down.svg" />
          </Button>
        </template>
      </ActionMenu>
    </ButtonGroup>`,
  }),
};
