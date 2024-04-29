import type { Meta, StoryObj } from '@storybook/vue3';
import { Collapser } from '/@/components';

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
    name: { description: 'The name of the collapser. Used as identifier in Accordion' },
  },
  args: {
    title: 'Collapser',
    open: false,
  },
} satisfies Meta<typeof Collapser>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => ({
    components: { Collapser },
    setup: () => ({ args }),
    template: `<Collapser v-bind="args">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
