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
    <Button class="custom">Bla bla bla</Button>
    <Button class="custom" outline>Bla bla bla</Button>
    <Button class="custom" flat>Bla bla bla</Button>

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
        <Button><Icon src="/icons/chevron-down.svg" class="unique" /></Button>
        <template #dropdown>
          <label><input v-model="action" value="Section" type="radio"> Section</label>
          <label><input v-model="action" value="Slope" type="radio"> Slope</label>
          <label><input v-model="action" value="Resort" type="radio"> Resort</label>
        </template>
      </Dropdown>
    </div>

    <!-- Expandable button -->
    <Dropdown right>
      <Button><Icon src="/icons/more.svg" class="unique" /></Button>
      <template #dropdown="{ close }">
        <Button primary block @click="consoleMessage(); close()">Console</Button>
        <Button alert block @click="alertMessage(); close()">Alert</Button>
      </template>
    </Dropdown>

    <Button disabled>Disabled</Button>

    <Button size="10">Fixed width</Button>

    <Button block>Block</Button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon, Button, Dropdown } from '/@/components';

const action = ref('Section');

const alertMessage = () => alert('Alert button clicked');
const consoleMessage = () => console.log('Console button clicked');
</script>

<style>
.custom {
  --button-color: green;
  --button-font-color: #fff;
}
</style>
