import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Collapser } from '/@/components';
import './assets/styles.css';

const meta = {
  title: 'Collapser',
  component: Collapser,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Collapse or expand sections of content.',
      },
    },
  },
  argTypes: {
    title: { description: 'The title of the collapser.' },
    open: { description: 'The open state of the collapser.' },
    name: { description: 'Used as identifier in Accordion mode' },
    disabled: { description: 'The collapser is disabled' },
  },
  args: {
    title: 'Collapser',
    open: false,
    disabled: false,
  },
} satisfies Meta<typeof Collapser>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => ({
    components: { Collapser },
    setup: () => ({ args }),
    template: `<Collapser v-bind="args">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
      dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
      anim id est laborum.
    </Collapser>`,
  }),
};

export const CustomToggler: Story = {
  render: args => ({
    components: { Collapser },
    setup: () => ({ args }),
    template: `<Collapser v-bind="args">
      <template #toggler="{ open }">
        Collapser is {{ open ? 'open' : 'closed' }}
      </template>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </Collapser>`,
  }),
};

export const Accordion: Story = {
  args: { name: 'accordion' },
  render: args => ({
    components: { Collapser },
    setup: () => ({ args }),
    template: `
    <Collapser v-bind="args" title="Collapser #1">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </Collapser>
    <Collapser v-bind="args" title="Collapser #2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
      dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
      anim id est laborum.
    </Collapser>
    <Collapser v-bind="args" title="Collapser #3">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </Collapser>`,
  }),
};
