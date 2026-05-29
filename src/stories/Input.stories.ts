import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Input, Icon } from '/@/components';
import './assets/styles.css';

const meta = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Accept user input, such as text or numbers.',
      },
    },
  },
  argTypes: {
    type: {
      description: 'The type of input content.',
      control: 'select',
      options: ['text', 'color', 'password', 'datetime-local', 'email', 'month', 'number', 'search', 'tel', 'time', 'url', 'week'],
    },
    placeholder: { description: 'The placeholder text to display when the input is empty.' },
    clearable: { description: 'Enable the clear button.' },
    prefix: { description: 'The prefix text to display before the input.' },
    suffix: { description: 'The suffix text to display after the input.' },
    disabled: { description: 'Disable the input.' },
    invalid: { description: 'Set state to invalid.' },
    block: { description: 'Display as a block input.' },
    width: {
      description: 'The width of the input. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
  },
  args: {
    type: 'text',
    width: undefined,
    placeholder: 'Full name',
    clearable: true,
    prefix: '',
    suffix: '',
    disabled: false,
    invalid: false,
    block: false,
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: '' },
  render: args => ({
    components: { Input },
    setup: () => {
      const input = ref(args.modelValue);
      return { args, input };
    },
    template: '<Input v-bind="args" v-model="input" />',
  }),
};

export const Prefix: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Add content to the start or end of the input using the prefix/suffix slots.',
      },
    },
  },
  args: { modelValue: '', placeholder: 'your-workspace' },
  render: args => ({
    components: { Input, Icon },
    setup: () => {
      const search = ref('');
      const url = ref('');
      const price = ref(0);
      return { args, search, url, price };
    },
    template: `<div class="toolbar">
      <Input v-bind="args" v-model="search" placeholder="Search files...">
        <template #prefix><Icon src="search.svg" /></template>
      </Input>
      <Input v-bind="args" v-model="url" placeholder="your-workspace" width="18">
        <template #prefix>
          <span style="opacity:0.75;font-size:0.75em">app.example.com/</span>
        </template>
      </Input>
      <Input v-bind="args" v-model="price" placeholder="0.00" type="number">
        <template #prefix>€</template>
        <template #suffix>EUR</template>
      </Input>
    </div>`,
  }),
};
