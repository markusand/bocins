import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { DatePicker } from '/@/components';

const meta = {
  title: 'DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'date' },
    notBefore: { control: 'date' },
    notAfter: { control: 'date' },
    width: { control: 'text' },
    locale: {
      control: 'select',
      options: ['en', 'ca', 'zh', 'he'],
    },
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

