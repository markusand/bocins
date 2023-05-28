<template>
  <section class="section">
    <!-- Basic buttons -->
    <Button>Button</Button>
    <Button primary>Primary</Button>
    <Button alert>Alert</Button>
    <Button outline>Outline</Button>
    <Button alert outline>Alert</Button>
    <Button flat>Flat</Button>
    <Button>
      <Icon src="https://www.unpkg.com/remixicon@2.5.0/icons/Business/printer-line.svg" class="unique" />
    </Button>
    <Button>
      <Icon src="https://www.unpkg.com/remixicon@2.5.0/icons/Business/printer-line.svg" />
      Print
    </Button>
    <Button alert>
      <Icon src="https://www.unpkg.com/remixicon@2.5.0/icons/System/close-circle-line.svg" />
      Close
    </Button>

    <!-- Custom buttons -->
    <Button class="custom">Custom</Button>
    <Button class="custom" outline>Custom</Button>
    <Button class="custom" flat>Custom</Button>

    <!-- Button groups -->
    <span class="button-group">
      <Button>Group</Button>
      <Button>Group</Button>
      <Button>Group</Button>
    </span>
    <span class="button-group">
      <Button primary outline>Group</Button>
      <Button primary outline>Group</Button>
      <Button primary outline>Group</Button>
    </span>
    <span class="button-group">
      <Button><Icon src="https://www.unpkg.com/remixicon@2.5.0/icons/Editor/align-left.svg" class="unique" /></Button>
      <Button><Icon src="https://www.unpkg.com/remixicon@2.5.0/icons/Editor/align-center.svg" class="unique" /></Button>
      <Button><Icon src="https://www.unpkg.com/remixicon@2.5.0/icons/Editor/align-right.svg" class="unique" /></Button>
      <Button><Icon src="https://www.unpkg.com/remixicon@2.5.0/icons/Editor/align-justify.svg" class="unique" /></Button>
    </span>
  
    <!-- Split button -->
    <div class="button-group">
      <Button>{{ action }}</Button>
      <Dropdown right>
        <template #toggler>
          <Button><Icon src="/icons/chevron-down.svg" class="unique" /></Button>
        </template>
        <div class="dropmenu">
          <ToggleButton v-model="action" value="New" flat>
            <Icon src="/icons/new.svg" />New
          </ToggleButton>
          <hr>
          <ToggleButton v-model="action" value="Download" flat>
            <Icon src="/icons/download.svg" />Download
          </ToggleButton>
          <ToggleButton v-model="action" value="Move" flat>
            <Icon src="/icons/move.svg" />Move
          </ToggleButton>
          <hr>
          <ToggleButton v-model="action" value="Edit" flat>
            <Icon src="/icons/edit.svg" />Edit
          </ToggleButton>
          <ToggleButton v-model="action" value="Delete" flat alert>
            <Icon src="/icons/delete-bin.svg" />Delete
          </ToggleButton>
        </div>
      </Dropdown>
    </div>

    <!-- Expandable button -->
    <Dropdown right>
      <template #toggler>
        <Button><Icon src="/icons/more.svg" class="unique" /></Button>
      </template>
      <template #default="{ close }">
        <div class="dropmenu spaced">
          <Button flat @click="consoleMessage(); close()">
            <Icon src="/icons/edit.svg" />Edit
          </Button>
          <Button alert block @click="alertMessage(); close()">
            <Icon src="/icons/delete-bin.svg" />Delete
          </Button>
        </div>
      </template>
    </Dropdown>

    <Button disabled>Disabled</Button>

    <Button size="10">Fixed width</Button>

    <Button block>Block</Button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon, Button, ToggleButton, Dropdown } from '/@/components';

const action = ref('Section');

const alertMessage = () => alert('Alert button clicked');
const consoleMessage = () => console.log('Console button clicked');
</script>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.dropmenu {
  background: var(--color-bg);
  border: var(--border);
  border-radius: var(--border-radius);

  &.spaced { padding: 0.25rem; }
}

hr {
  border: 0;
  border-top: var(--border);
}

.custom {
  --button-color: green;
  --button-font-color: #fff;
}
</style>
