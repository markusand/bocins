import type { Meta, StoryObj } from '@storybook/vue3';
import { Modal, Button } from '/@/components';
import './assets/styles.scss';

const meta = {
  title: 'Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "A pop-up window that temporarily interrupts the user's workflow to display important information or request input.",
      },
    },
  },
  argTypes: {
    closeable: { description: 'Enable the close button.' },
    open: { description: 'Open state of the modal.' },
    plain: { description: 'Display a modal without a backdrop.' },
    width: { description: 'The width of the modal. Can be a number (in rem) or any string representing length and unit.' },
    height: { description: 'The height of the modal. Can be a number (in rem) or any string representing length and unit.' },
  },
  args: {
    closeable: true,
    open: false,
    plain: false,
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
  render: args => ({
    components: { Modal, Button },
    setup: () => ({ args }),
    template: `<Modal v-bind="args">
      <template #toggler="{ open }">
        <Button @click="open">Open</Button>
      </template>
      <h2>Modal component</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, quidem</p>
    </Modal>`,
  }),
};

export const Plain: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Display a modal without a backdrop and allowing interaction with the background.',
      },
    },
  },
  args: { plain: true },
  render: args => ({
    components: { Modal, Button },
    setup: () => ({ args }),
    template: `<Modal v-bind="args">
      <template #toggler="{ open }">
        <Button @click="open">Open</Button>
      </template>
      <h2>Modal component</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, quidem</p>
    </Modal>`,
  }),
};

export const Confirmation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The modal is only closeable by accepting the default action.',
      },
    },
  },
  args: { closeable: false },
  render: args => ({
    components: { Modal, Button },
    setup: () => ({ args }),
    template: `<Modal v-bind="args">
      <template #toggler="{ open }">
        <Button @click="open">Open</Button>
      </template>
      <template #default="{ close }">
        <h2>Confirm you've read this?</h2>
        <p>I give my soul to the devil and my savings to the creator of this library.</p>
        <p>
          <Button @click="close">I confirm</Button>
        </p>
      </template>
    </Modal>`,
  }),
};

export const Nested: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modal can be nested in other modals.',
      },
    },
  },
  render: args => ({
    components: { Modal, Button },
    setup: () => ({ args }),
    template: `<Modal v-bind="args">
      <template #toggler="{ open }">
        <Button @click="open()">Open parent</Button>
      </template>
      <h2>Modal component</h2>
      <p>Parent modal</p>
      <Modal v-bind="args">
        <template #toggler="{ open }">
          <Button @click="open()">Open nested</Button>
        </template>
        <h2>Nested modal component</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, quidem.</p>
      </Modal>
    </Modal>`,
  }),
};
