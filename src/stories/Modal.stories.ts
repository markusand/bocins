import type { Meta, StoryObj } from '@storybook/vue3';
import { Modal, Button } from '/@/components';

const meta = {
  title: 'Modal',
  component: Modal,
  tags: ['autodocs'],
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
