import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { FileDrop, ImageExpand, Button, Icon } from '/@/components';
import './assets/styles.scss';

const meta = {
  title: 'FileDrop',
  component: FileDrop,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Drag and drop files for uploading or processing.',
      },
    },
  },
  argTypes: {
    maxSize: { description: 'The maximum size of the file in kilobytes.' },
    formats: { description: 'The accepted file formats. Use extensions or mime types.' },
    capture: { description: 'Enable the camera.' },
    multiple: { description: 'Allow multiple files to be selected.' },
    disabled: { description: 'Disable the file drop.' },
    block: { description: 'Display the file drop as a block full width element.' },
    height: {
      description: 'The height of the drop area. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
    width: {
      description: 'The width of the drop area. Can be a number (in rem) or any string representing length and unit.',
      control: 'text',
    },
    label: {
      control: 'text',
      description: 'The label text.',
    },
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
  parameters: {
    docs: {
      description: {
        story: 'Preview dropped images.',
      },
    },
  },
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
