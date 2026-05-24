import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Tabs, TabView, Icon } from '/@/components';
import './assets/styles.css';

const meta = {
  title: 'Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Group multiple content and display only one at a time.',
      },
    },
  },
  argTypes: {
    transition: {
      control: 'select',
      options: ['tab-slide-x', 'tab-slide-y', 'tab-fade'],
      description: 'Name of the Vue transition applied to `TabView`. Three built-in transitions are provided: `tab-slide-x` (default, directional horizontal slide), `tab-slide-y` (new tab drops in from above), `tab-fade` (crossfade). Pass any custom transition name and define the corresponding CSS classes yourself.',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => ({
    components: { Tabs, TabView },
    setup: () => ({ args }),
    template: `<Tabs v-bind="args">
      <TabView id="tab1" label="Tab 1">Content #1</TabView>
      <TabView id="tab2" label="Tab 2">Content #2</TabView>
      <TabView id="tab3" label="Tab 3">Content #3</TabView>
      <TabView id="tab4" label="Tab 4">Content #4</TabView>
    </Tabs>`,
  }),
};

export const CustomTabs: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use the `tab` slot to customize the content of each tab toggler.',
      },
    },
  },
  render: args => ({
    components: { Tabs, TabView, Icon },
    setup: () => {
      const tabs = {
        drafts: { icon: 'feather.svg' },
        archive: { icon: 'archive.svg', badge: 3 },
        downloads: { icon: 'download.svg' },
      };
      return { args, tabs };
    },
    template: `<Tabs v-bind="args">
      <template #tab="{ id, label }">
        <Icon :src="tabs[id].icon" />
        {{ label }}
        <span v-if="tabs[id].badge" class="badge">
          {{ tabs[id].badge }}
        </span>
      </template>
      <template #trash="{ label }">
        <Icon src="trash-2.svg" style="--color:red" />
      </template>
      <TabView id="drafts" label="Drafts"><h2>Drafts</h2></TabView>
      <TabView id="archive" label="Archive"><h2>Archive</h2></TabView>
      <TabView id="downloads" disabled><h2>Downloads</h2></TabView>
      <TabView id="trash"><h2>Trash</h2></TabView>
    </Tabs>`,
  }),
};
