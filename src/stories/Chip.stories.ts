import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Chip, Icon } from '/@/components';
import './assets/styles.css';

const meta = {
  title: 'Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A small, interactive representation of an item or attribute.',
      },
    },
  },
  argTypes: {
    action: { description: 'The function to be called when the action button is clicked. Enables the action button' },
    text: { description: 'The text to display on the chip.' },
  },
  args: {
    text: 'Chip',
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const Colored: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use <code>--chip-color</code> to tint chips with a custom color.',
      },
    },
  },
  render: () => ({
    components: { Chip },
    setup: () => ({
      tags: [
        { label: 'Vue', color: '#41b883' },
        { label: 'TypeScript', color: '#3178c6' },
        { label: 'Vite', color: '#bd34fe' },
        { label: 'CSS', color: '#1572b6' },
        { label: 'Node', color: '#417e38' },
        { label: 'Rust', color: '#ce4a00' },
      ],
    }),
    template: `<div class="toolbar">
      <Chip
        v-for="tag in tags"
        :key="tag.label"
        :text="tag.label"
        :style="\`--chip-color:\${tag.color}\`" />
    </div>`,
  }),
};

export const Removable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pass an <code>action</code> function to show a remove button on each chip.',
      },
    },
  },
  render: () => ({
    components: { Chip },
    setup: () => {
      const skills = ref(['Figma', 'Wireframing', 'Prototyping', 'User Research', 'A/B Testing']);
      return { skills };
    },
    template: `<div class="toolbar">
      <Chip
        v-for="skill in skills"
        :key="skill"
        :text="skill"
        :action="() => skills.splice(skills.indexOf(skill), 1)" />
    </div>`,
  }),
};

export const CustomAction: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Replace the default × with a custom icon via the <code>#action</code> slot.',
      },
    },
  },
  render: () => ({
    components: { Chip, Icon },
    setup: () => ({
      tags: ref(['Design', 'Frontend', 'Backend']),
    }),
    template: `<div class="toolbar">
      <Chip v-for="tag in tags" :key="tag" :action="() => tags.splice(tags.indexOf(tag), 1)">
        {{ tag }}
        <template #action>
          <Icon src="trash.svg" />
        </template>
      </Chip>
    </div>`,
  }),
};
