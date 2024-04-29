import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { DatePicker } from '/@/components';

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
      options: ['en', 'ca', 'zh', 'he'],
    },
    startSunday: { description: 'Start the week on Sunday instead of Monday.' },
    disabled: { description: 'Disable the calendar.' },
    clearable: { description: 'Enable the clear button.' },
    top: { description: 'Display the calendar upwards.' },
    right: { description: 'Display the calendar anchored to the right.' },
    block: { description: 'Display the calendar as a block full width element.' },
    formatter: { description: 'The function used to format the date.' },
  },
  args: {
    locale: 'en',
    disabled: false,
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

