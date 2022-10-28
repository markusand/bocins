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

    <Button disabled>Disabled</Button>

    <Button block>Block</Button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon, Button, Dropdown } from '/@/components';

const action = ref('Section');
</script>
