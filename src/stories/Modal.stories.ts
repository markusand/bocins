import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { Modal, Input, LongText, Button, Selector, ActionMenu, type ActionGroup } from '/@/components';
import './assets/styles.css';

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
    open: { description: 'Two-way binding for the open state. Use v-model:open for external control or the #toggler slot for self-contained usage.' },
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
  args: { width: '22' },
  render: args => ({
    components: { Modal, Button, Input, LongText },
    setup: () => ({ args }),
    template: `<Modal v-bind="args">
      <template #toggler="{ open }">
        <Button @click="open">New project</Button>
      </template>
      <template #default="{ close }">
        <h3>Create new project</h3>
        <form class="form">
          <label class="label">
            Project name
            <Input placeholder="My awesome project" block />
          </label>
          <label class="label">
            Description
            <LongText placeholder="What is this project about?" block />
          </label>
          <div class="toolbar right">
            <Button flat @click.stop="close">Cancel</Button>
            <Button @click.stop="close">Create project</Button>
          </div>
        </form>
      </template>
    </Modal>`,
  }),
};

export const Plain: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Display a modal without a backdrop, allowing interaction with the background.',
      },
    },
  },
  args: { plain: true, width: '18' },
  render: args => ({
    components: { Modal, Button },
    setup: () => ({ args }),
    template: `<Modal v-bind="args">
      <template #toggler="{ open }">
        <Button @click="open">Show release notes</Button>
      </template>
      <h3>What's new in v3.0</h3>
      <ul>
        <li>CSS anchor positioning for dropdowns</li>
        <li>16-position layout system</li>
        <li>Popover arrow with directional variants</li>
        <li>Tooltip preset with dark theme</li>
      </ul>
    </Modal>`,
  }),
};

export const Confirmation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The modal is only closeable by accepting or dismissing the action.',
      },
    },
  },
  args: { closeable: false, width: '18' },
  render: args => ({
    components: { Modal, Button },
    setup: () => ({ args }),
    template: `<Modal v-bind="args">
      <template #toggler="{ open }">
        <Button delete @click="open">Delete account</Button>
      </template>
      <template #default="{ close }">
        <h3>Delete your account?</h3>
        <p>
          All your data, projects, and settings will be permanently removed.
          This action cannot be undone.
        </p>
        <div class="toolbar right">
          <Button flat @click="close">Keep account</Button>
          <Button delete @click="close">Yes, delete</Button>
        </div>
      </template>
    </Modal>`,
  }),
};

export const Nested: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modals can be nested — useful for confirmation steps inside a form flow.',
      },
    },
  },
  args: { width: '20' },
  render: args => ({
    components: { Modal, Button, Input },
    setup: () => ({ args }),
    template: `<Modal v-bind="args">
      <template #toggler="{ open }">
        <Button @click="open">Transfer ownership</Button>
      </template>
      <template #default="{ close }">
        <h3>Transfer project ownership</h3>
        <form class="form">
          <label class="label">
            New owner email
            <Input placeholder="colleague@company.com" block />
          </label>
          <div class="toolbar right">
            <Button flat @click="close">Cancel</Button>
            <Modal>
              <template #toggler="{ open }">
                <Button @click="open">Transfer</Button>
              </template>
              <template #default="{ close }">
                <h3>Are you sure?</h3>
                <p>You will lose admin access to this project.</p>
                <div class="toolbar right">
                  <Button flat @click="close">Go back</Button>
                  <Button delete @click="close">Confirm transfer</Button>
                </div>
              </template>
            </Modal>
          </div>
        </form>
      </template>
    </Modal>`,
  }),
};

export const ExternalControl: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Control the modal state externally using <code>v-model:open</code>.',
      },
    },
  },
  args: { plain: true },
  render: args => ({
    components: { Modal, Button },
    setup: () => ({ args, isOpen: ref(false) }),
    template: `<div class="toolbar">
      <Button @click="isOpen = true">Open settings</Button>
      <Button flat @click="isOpen = false">Close</Button>
      <span>{{ isOpen ? 'Settings open' : 'Settings closed' }}</span>
      <Modal v-bind="args" v-model:open="isOpen" width="18">
        <h3>Workspace settings</h3>
        <p>Manage your workspace preferences and integrations.</p>
      </Modal>
    </div>`,
  }),
};

export const CustomTo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Teleport the modal into a specific DOM element using the <code>to</code> prop.',
      },
    },
  },
  render: args => ({
    components: { Modal, Button },
    setup: () => ({ args }),
    template: `<Modal v-bind="args" width="18" to="#anchor--modal--custom-to .docs-story">
      <template #toggler="{ open }">
        <Button @click="open">View report</Button>
      </template>
      <h3>Monthly summary</h3>
      <p>Rendered inside the story container via the <code>to</code> prop.</p>
    </Modal>`,
  }),
};

export const WithDropdowns: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dropdowns and selectors inside a modal stack correctly above the backdrop.',
      },
    },
  },
  render: args => ({
    components: { Modal, Button, Selector, ActionMenu },
    setup: () => ({
      args,
      roles: ['Admin', 'Editor', 'Viewer', 'Billing'],
      actions: [{
        actions: [
          { id: 'resend', label: 'Resend invite', icon: 'mail.svg', onClick: console.log },
          { id: 'remove', label: 'Remove member', icon: 'trash.svg', attrs: { delete: true }, onClick: console.log },
        ],
      }] satisfies ActionGroup<unknown>[],
    }),
    template: `<Modal v-bind="args">
      <template #toggler="{ open }">
        <Button @click="open">Manage team</Button>
      </template>
      <h3>Team members</h3>
      <div style="display:grid;gap:0.5rem">
        <div class="toolbar">
          <span style="flex:1">sarah@company.com</span>
          <Selector :options="roles" :modelValue="'Editor'" width="8" />
          <ActionMenu :item="{}" :actions position="bottom-in-right" />
        </div>
        <div class="toolbar">
          <span style="flex:1">john@company.com</span>
          <Selector :options="roles" :modelValue="'Viewer'" width="8" />
          <ActionMenu :item="{}" :actions position="bottom-in-right" />
        </div>
      </div>
    </Modal>`,
  }),
};

export const WithStyledBackdrop: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The modal has a styled backdrop.',
      },
    },
  },
  args: {
    closeable: true,
    width: '18',
    style: {
      '--backdrop-color': '#f001',
      '--backdrop-filter': 'blur(10px)',
    },
  },
  render: args => ({
    components: { Modal, Button },
    setup: () => ({ args }),
    template: `<Modal v-bind="args">
      <template #toggler="{ open }">
        <Button @click="open">Open</Button>
      </template>
      Yeah!
    </Modal>`,
  }),
};
