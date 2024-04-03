import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Calendar } from '/@/components';

const meta = {
  title: 'Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'date' },
    notBefore: { control: 'date' },
    notAfter: { control: 'date' },
    locale: {
      control: 'select',
      options: ['en', 'ca', 'zh', 'he'],
    },
  },
  args: {
    locale: 'en',
    disabled: false,
    startSunday: false,
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

