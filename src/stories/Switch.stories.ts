import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Switch } from '/@/components';
import './assets/styles.scss';

const meta = {
  title: 'Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Turn a single option on or off.',
      },
    },
  },
  argTypes: {
    disabled: { description: 'Disable the switch.' },
    value: { description: 'The value that the switch enables.' },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Allow only one option to be selected.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Allow multiple options to be selected.',
      },
    },
  },
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
