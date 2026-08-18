import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Calendar } from '/@/components';
import './assets/styles.css';

const meta = {
  title: 'Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'View and interact with dates.',
      },
    },
  },
  argTypes: {
    modelValue: { control: 'date' },
    notBefore: {
      description: 'The earliest date that can be selected.',
      control: 'date',
    },
    notAfter: {
      description: 'The latest date that can be selected.',
      control: 'date',
    },
    locale: {
      description: 'The locale to use for the calendar.',
      control: 'select',
      options: ['en', 'ca', 'zh'],
    },
    startSunday: { description: 'Start the week on Sunday instead of Monday.' },
    disabled: { description: 'Disable the calendar.' },
    excluded: { description: 'Dates that should not be selectable.' },
    allowed: { description: 'Only these dates should be selectable.' },
    years: { description: 'The years range available in the year selector.' },
  },
  args: {
    locale: 'en',
    disabled: false,
    startSunday: false,
    years: '-10:+1',
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: undefined },
  render: args => ({
    components: { Calendar },
    setup() {
      const date = ref(args.modelValue);
      return { args, date };
    },
    template: '<Calendar v-bind="args" v-model="date" />',
  }),
};

export const RangeCalendar: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Enable selecting a range of dates.',
      },
    },
  },
  args: { modelValue: [undefined, undefined] },
  render: args => ({
    components: { Calendar },
    setup() {
      const dates = ref(args.modelValue);
      return { args, dates };
    },
    template: '<Calendar v-bind="args" v-model="dates" />',
  }),
};

export const ExcludedDates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Specific dates or ranges that cannot be selected.',
      },
    },
  },
  args: {
    modelValue: undefined,
    excluded: ['2026-05-04', '2026-05-07', ['2026-05-16', '2026-05-25']],
  },
  render: args => ({
    components: { Calendar },
    setup() {
      const date = ref(new Date('2026-05-10'));
      return { args, date };
    },
    template: '<Calendar v-bind="args" v-model="date" />',
  }),
};

export const AllowedDates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Only specific dates or ranges are selectable.',
      },
    },
  },
  args: {
    modelValue: undefined,
    allowed: ['2026-05-04', '2026-05-07', ['2026-05-16', '2026-05-25']],
  },
  render: args => ({
    components: { Calendar },
    setup() {
      const date = ref(new Date('2026-05-21'));
      return { args, date };
    },
    template: '<Calendar v-bind="args" v-model="date" />',
  }),
};

