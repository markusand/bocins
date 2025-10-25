import { ref, computed } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ToggleButton, ButtonGroup } from '/@/components';
import './assets/styles.scss';

const meta = {
  title: 'ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Toggles between two states, or solect between multiple states.',
      },
    },
  },
  argTypes: {
    block: { description: 'Display as a block input.' },
    disabled: { description: 'Disable the button.' },
    even: { description: 'Display as an even button.' },
    required: { description: 'Button cannot toggle to undefined.' },
    variant: {
      description: 'The appearance of the button.',
      control: 'select',
      options: [undefined, 'ghost', 'flat'],
    },
    size: {
      description: 'The size of the button.',
      control: 'select',
      options: [undefined, 'small', 'large'],
    },
    width: {
      description: 'The width of the button. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
    value: { description: 'The value of the toggler.' },
  },
  args: {
    variant: undefined,
    size: undefined,
    width: undefined,
    block: false,
    even: false,
    required: false,
    disabled: false,
    value: undefined,
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: false },
  render: args => ({
    components: { ToggleButton },
    setup: () => {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: '<ToggleButton v-bind="args" v-model="value">Toggle</ToggleButton>',
  }),
};

export const SingleValue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toggle a specific value.',
      },
    },
  },
  args: { modelValue: undefined },
  render: args => ({
    components: { ToggleButton },
    setup: () => {
      const status = ref(args.modelValue);
      const label = computed(() => status.value ?? 'inactive');
      return { args, status, label };
    },
    template: '<ToggleButton v-model="status" value="active">{{ label }}</ToggleButton>',
  }),
};

export const SingleChoice: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toggle a single choice between multiple values.',
      },
    },
  },
  args: { modelValue: undefined },
  render: args => ({
    components: { ToggleButton, ButtonGroup },
    setup: () => {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `<ButtonGroup>
      <ToggleButton v-model="value" value="good" required>Good</ToggleButton>
      <ToggleButton v-model="value" value="cheap" required>Cheap</ToggleButton>
      <ToggleButton v-model="value" value="pretty" required>Pretty</ToggleButton>
    </ButtonGroup>`,
  }),
};

export const MultipleChoices: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toggle multiple choices.',
      },
    },
  },
  args: { modelValue: [] },
  render: args => ({
    components: { ToggleButton, ButtonGroup },
    setup: () => {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `<ButtonGroup>
      <ToggleButton v-model="value" value="good">Good</ToggleButton>
      <ToggleButton v-model="value" value="cheap">Cheap</ToggleButton>
      <ToggleButton v-model="value" value="pretty">Pretty</ToggleButton>
    </ButtonGroup>`,
  }),
};




