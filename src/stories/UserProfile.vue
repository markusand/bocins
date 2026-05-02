<template>
  <div class="user-profile">
    <Avatar
      :name="`${user.name} ${user.surname}`"
      :src="user.avatar" />
    <div class="details">
      <strong>{{ user.name }} {{ user.surname }}</strong>
      <em>{{ user.email }}</em>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Avatar } from '/@/components';
import type { User } from './assets/users';

defineProps<{ user: User }>();
</script>

<style scoped>
.user-profile {
  display: flex;
  gap: 0.5rem;
  padding: 0.25rem;
  flex: 1;

  .details {
    display: flex;
    flex-direction: column;

    em {
      color: #888;
      font-size: 0.8rem;
      font-style: normal;
    }
  }
}
</style>
