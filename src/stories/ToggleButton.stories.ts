import { ref, computed } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ToggleButton, ButtonGroup } from '/@/components';

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
    text: { description: 'The text to display on the button.' },
    block: { description: 'Display as a block input.' },
    disabled: { description: 'Disable the button.' },
    even: { description: 'Display as an even button.' },
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
  },
  args: {
    text: 'Toggle',
    variant: undefined,
    size: undefined,
    width: undefined,
    block: false,
    even: false,
    disabled: false,
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
    template: '<ToggleButton v-bind="args" v-model="value" />',
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
    template: '<ToggleButton v-model="status" :text="label" value="active">',
  }),
};

export const MultipleValues: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toggle multiple values.',
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
      <ToggleButton v-model="value" text="Good" value="good" />
      <ToggleButton v-model="value" text="Cheap" value="cheap" />
      <ToggleButton v-model="value" text="Pretty" value="pretty" />
    </ButtonGroup>`,
  }),
};




