import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Slider } from '/@/components';
import './assets/styles.css';

const meta = {
  title: 'Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Select a numeric value or range by dragging a thumb along a track.',
      },
    },
  },
  argTypes: {
    min: { description: 'Minimum value.', control: 'number' },
    max: { description: 'Maximum value.', control: 'number' },
    step: { description: 'Step increment.', control: 'number' },
    gap: { description: 'Minimum distance between thumbs in range mode. Defaults to `step`.', control: 'number' },
    disabled: { description: 'Disable the slider.' },
    invalid: { description: 'Mark the slider as invalid.' },
    block: { description: 'Display the slider as a full-width block element.' },
    width: { description: 'Width of the slider. Number (rem) or CSS length string.', control: 'text' },
    inset: { description: 'Constrain thumbs within the track bounds.' },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    invalid: false,
    block: false,
    inset: false,
  },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => ({
    components: { Slider },
    setup: () => {
      const value = ref(40);
      return { args, value };
    },
    template: '<Slider v-bind="args" v-model="value" /> {{ value }}',
  }),
};

export const Range: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Bind a `[number, number]` tuple to enable dual-handle range selection. Use `gap` to enforce a minimum distance between the two thumbs (defaults to `step`).',
      },
    },
  },
  args: { gap: 10 },
  render: args => ({
    components: { Slider },
    setup: () => {
      const value = ref<[number, number]>([20, 75]);
      return { args, value };
    },
    template: '<Slider v-bind="args" v-model="value" /> {{ value[0] }} – {{ value[1] }}',
  }),
};

export const CustomStyle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Customize the slider appearance using CSS custom properties',
      },
    },
  },
  args: {
    inset: true,
    gap: 10,
    style: {
      '--radius': '0.25rem',
      '--color': '#ca452a',
      '--track-color': '#8882',
      '--track-height': '1.25rem',
      '--thumb-color': '#fff',
      '--thumb-border': '0.25rem solid var(--color)',
      '--thumb-height': '0.75rem',
      '--thumb-width': '0.25rem',
    },
  },
  render: args => ({
    components: { Slider },
    setup: () => {
      const value = ref([30, 70]);
      return { args, value };
    },
    template: '<Slider v-bind="args" v-model="value" />',
  }),
};

export const Disabled: Story = {
  render: args => ({
    components: { Slider },
    setup: () => {
      const value = ref(50);
      return { args, value };
    },
    template: '<Slider v-bind="args" v-model="value" disabled />',
  }),
};
