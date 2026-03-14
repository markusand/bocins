import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { config, Input, Search, Selector, DatePicker, Rating, Password } from '/@/components';
import './assets/styles.scss';

const meta = {
  title: 'Configuration/Custom Icon Path',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Configure the icon path to load icons from a custom location.

By default, icons load from \`/icons/\`. You can change this by setting \`config.iconPath\`
before using components.

**Important:** This must be set before components are rendered, typically in your \`main.ts\`.`,
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultPath: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default behavior - icons load from `/icons/`',
      },
    },
  },
  render: () => ({
    components: { Input, Search, Selector, DatePicker, Rating, Password },
    setup: () => {
      const input = ref('');
      const search = ref('');
      const selector = ref<string>();
      const date = ref<Date>();
      const rating = ref(0);
      const password = ref('');

      return { input, search, selector, date, rating, password };
    },
    template: `
      <div>
        <div style="padding: 1rem; background: #f0f0f0;
          border-radius: 0.25rem; margin-bottom: 1rem;">
          <strong>Icon Path:</strong> <code>/icons/</code> (default)
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
          <Input v-model="input" placeholder="Input with clearable"
            clearable />
          <Search v-model="search" />
          <Password v-model="password" />
          <Selector v-model="selector" :options="['Option 1', 'Option 2']"
            placeholder="Select..." clearable />
          <DatePicker v-model="date" clearable />
          <Rating v-model="rating" />
        </div>
      </div>
    `,
  }),
};

export const CustomPath: Story = {
  decorators: [
    story => {
      // Set custom path only for this story
      const originalPath = config.iconPath;
      config.iconPath = '/_icons';

      const result = story();

      // Reset after rendering
      setTimeout(() => {
        config.iconPath = originalPath;
      }, 0);

      return result;
    },
  ],
  parameters: {
    docs: {
      description: {
        story: `Custom icon path example - icons load from \`/_icons/\`.

This story demonstrates loading icons from \`/_icons/\` instead of \`/icons/\`.`,
      },
    },
  },
  render: () => ({
    components: { Input, Search, Selector, DatePicker, Rating, Password },
    setup: () => {
      const input = ref('');
      const search = ref('');
      const selector = ref<string>();
      const date = ref<Date>();
      const rating = ref(0);
      const password = ref('');

      return { input, search, selector, date, rating, password };
    },
    template: `
      <div>
        <div style="padding: 1rem; background: #f0f0f0;
          border-radius: 0.25rem; margin-bottom: 1rem;">
          <strong>Icon Path:</strong> <code>/_icons/</code>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
          <Input v-model="input" placeholder="Input with clearable"
            clearable />
          <Search v-model="search" />
          <Password v-model="password" />
          <Selector v-model="selector" :options="['Option 1', 'Option 2']"
            placeholder="Select..." clearable />
          <DatePicker v-model="date" clearable />
          <Rating v-model="rating" />
        </div>
      </div>
    `,
  }),
};
