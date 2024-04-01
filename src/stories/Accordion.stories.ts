import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Accordion, Collapser } from '/@/components';

const meta = {
  title: 'Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => ({
    components: { Accordion, Collapser },
    setup() {
      const active = ref('collapser2');
      return { args, active };
    },
    template: `<Accordion v-model="active">
      <Collapser name="1">
        <template #toggler="{ open }">Collapser #1 ({{ open ? 'open' : 'closed' }})</template>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Collapser>
      <Collapser title="Collapser #2" name="collapser2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Collapser>
      <Collapser title="Collapser #3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Collapser>
    </Accordion>`,
  }),
};

