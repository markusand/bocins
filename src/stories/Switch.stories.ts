import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Switch } from '/@/components';

const meta = {
  title: 'Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    disabled: false,
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: false },
  render: args => ({
    components: { Switch },
    setup: () => {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: '<Switch v-bind="args" v-model="value" />',
  }),
};

export const UniqueSelection: Story = {
  args: { modelValue: undefined },
  render: args => ({
    components: { Switch },
    setup: () => {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `<div>
      <p><Switch value="good" v-model="value" /> Good</p>
      <p><Switch value="cheap" v-model="value" /> Cheap</p>
      <p><Switch value="pretty" v-model="value" /> Pretty</p>
    </div>`,
  }),
};

export const MultipleSelections: Story = {
  args: { modelValue: [] },
  render: args => ({
    components: { Switch },
    setup: () => {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `<div>
      <p><Switch value="good" v-model="value" /> Good</p>
      <p><Switch value="cheap" v-model="value" /> Cheap</p>
      <p><Switch value="pretty" v-model="value" /> Pretty</p>
    </div>`,
  }),
};
