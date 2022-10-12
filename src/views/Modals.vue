<template>
  <section class="section">
    <Modal closeable>
      <template #toggle="{ open }">
        <Button @click="open">Basic</Button>
      </template>
      <section class="section">
        <h3>Modal title<em>Optio tempora asperiores</em></h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Magnam voluptates nulla blanditiis, obcaecati pariatur voluptatum.
        </p>
      </section>
    </Modal>

    <Modal>
      <template #toggle="{ open }">
        <Button @click="open">Footer</Button>
      </template>
      <section class="section">
        <h3>Upgrade to PRO<em>Optio tempora asperiores</em></h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Magnam voluptates nulla blanditiis, obcaecati pariatur voluptatum.
        </p>
      </section>
      <template #footer="{ close }">
        <Button flat @click="close">Cancel</Button>
        <Button primary @click="close">Upgrade</Button>
      </template>
    </Modal>

    <Modal>
      <template #toggle="{ open }">
        <Button alert @click="open">Delete</Button>
      </template>
      <template #default="{ close }">
        <section class="section">
          <h3>Delete user</h3>
          <p>Are you sure to delete user {name}?</p>
          <p class="note">
            This action can't be undone. User registers will still be available
            for historic statistics.
          </p>
          <Button alert @click="close();deleteUser()">Delete</Button>
          <Button flat @click="close">Cancel</Button>
        </section>
      </template>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import { Modal, Button } from '/@/components';

const deleteUser = () => alert('User deleted');
</script>

<style scoped>
.note {
  opacity: 0.35;
  font-size: 0.8rem;
}
</style>
