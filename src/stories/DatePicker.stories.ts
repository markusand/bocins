import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { DatePicker, Button } from '/@/components';
import { addDays } from '/@/utils';
import './assets/styles.css';

const meta = {
  title: 'DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Select dates from a calendar.',
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
    width: {
      description: 'The width of the input. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
    locale: {
      description: 'The locale to use for the calendar.',
      control: 'select',
      options: ['en', 'ca', 'zh'],
    },
    startSunday: { description: 'Start the week on Sunday instead of Monday.' },
    disabled: { description: 'Disable the date picker.' },
    invalid: { description: 'Mark the date picker as invalid' },
    clearable: { description: 'Enable the clear button.' },
    top: { description: 'Display the calendar upwards.' },
    right: { description: 'Display the calendar anchored to the right.' },
    block: { description: 'Display the calendar as a block full width element.' },
    formatter: { description: 'The function used to format the date.' },
    presets: { description: 'Display a list of preset dates and ranges', control: 'boolean' },
  },
  args: {
    locale: 'en',
    disabled: false,
    invalid: false,
    presets: false,
    startSunday: false,
    clearable: true,
    top: false,
    right: false,
    width: undefined,
    block: false,
    formatter: (date: Date) => date.toLocaleDateString(),
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: undefined },
  render: args => ({
    components: { DatePicker },
    setup() {
      const date = ref(args.modelValue);
      return { args, date };
    },
    template: '<DatePicker v-bind="args" v-model="date" />',
  }),
};

export const RangeDatePicker: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Enable selecting a range of dates.',
      },
    },
  },
  args: {
    modelValue: [undefined, undefined],
    placeholder: 'Select dates range',
    formatter: (date: Date) => date.toLocaleDateString(),
  },
  render: args => ({
    components: { DatePicker },
    setup() {
      const dates = ref(args.modelValue);
      return { args, dates };
    },
    template: '<DatePicker v-bind="args" v-model="dates" />',
  }),
};

export const CustomPresets: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Provide custom preset shortcuts via the `presets` slot. The slot exposes a `select` function that accepts an array of dates.',
      },
    },
  },
  args: {
    modelValue: [undefined, undefined],
    placeholder: 'Select dates range',
    formatter: (date: Date) => date.toLocaleDateString(),
  },
  render: args => ({
    components: { DatePicker, Button },
    setup() {
      const dates = ref(args.modelValue);
      const today = new Date();
      const presets = {
        '2002': [new Date(2002, 0, 1), new Date(2003, 0, 0)],
        'Last 30 days': [addDays(today, 29), today],
        'Last 7 days': [addDays(today, -6), today],
        'Next 7 days': [today, addDays(today, 6)],
        'Next 30 days': [today, addDays(today, 29)],
      };
      return { args, dates, presets };
    },
    template: `
      <DatePicker v-bind="args" v-model="dates">
        <template #presets="{ select }">
          <Button v-for="dates, label in presets" :key="label" flat sm @click="select(dates)">
            {{ label }}
          </Button>
        </template>
      </DatePicker>
    `,
  }),
};

