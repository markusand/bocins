import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { FileDrop, ImageExpand, Button, Icon } from '/@/components';

const meta = {
  title: 'FileDrop',
  component: FileDrop,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
  },
  args: {
    maxSize: 100,
    formats: 'image/*',
    capture: false,
    multiple: false,
    disabled: false,
    block: false,
  },
} satisfies Meta<typeof FileDrop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { modelValue: undefined },
  render: args => ({
    components: { FileDrop },
    setup: () => {
      const files = ref(args.modelValue);
      return { args, files };
    },
    template: '<FileDrop v-bind="args" v-model="files"@error="console.log" />',
  }),
};

export const ImagePreview: Story = {
  args: { modelValue: undefined },
  render: args => ({
    components: { FileDrop, ImageExpand, Button, Icon },
    setup: () => {
      const files = ref(args.modelValue);
      const toImage = (file: File) => URL.createObjectURL(file);
      return { args, files, toImage };
    },
    template: `<FileDrop v-bind="args" v-model="files"@error="console.log">
      <template #file="{ file, remove }">
        <ImageExpand :src="toImage(file)" :alt="file.name">
          <template #controls>
            <Button even @click.prevent="remove(file)">
              <Icon src="/@/stories/assets/trash.svg" />
            </Button">
          </template>
        </ImageExpand>
      </template>
    </FileDrop>`,
  }),
};
