<template>
  <section class="section">
    <h3>Selectors<em>Select data from a bunch of options</em></h3>
    
    <div class="columns">
      <fieldset class="label">
        <legend>List box</legend>
        <ListBox
          v-model="data.user"
          :options="users"
          :as-key="user => user.id"
          clearable="Clear selection">
          <template #default="{ item: user }">
            <Avatar
              :src="user.avatar"
              :initials="`${user.name} ${user.surname}`"
              class="avatar--s" />
            {{ user.name }}
          </template>
        </ListBox>
      </fieldset>

      <fieldset>
        <fieldset class="label">
          <legend>Simple select</legend>
          <Selector
            v-model="data.user"
            :options="users"
            placeholder="Select one..."
            :searchable="user => user.name"
            clearable
            size="12">
            <template #selected="{ selected: user }">
              <Avatar :src="user.avatar" :initials="user.name" class="avatar--s" />
              {{ user.name }}
            </template>
            <template #option="{ option: user }">
              <Avatar :src="user.avatar" :initials="user.name" class="avatar--s" />
              {{ user.name }}
            </template>
          </Selector>
        </fieldset>
        
        <fieldset class="label">
          <legend>Multiple select</legend>
          <Selector
            v-model="data.users"
            :options="users"
            placeholder="Select many..."
            size="12"
            multiple>
            <template #selected="{ selected }">
              {{ selected[0].name }}
              <span v-if="selected.length > 1" class="chip">
                +{{ selected.length - 1 }}
              </span>
            </template>
            <template #default="{ item: user }">{{ user.name }}</template>
          </Selector>
        </fieldset>

        <fieldset class="label">
          <legend>Multiple select</legend>
          <Selector
            v-model="data.users"
            :options="users"
            placeholder="Select many..."
            size="12"
            clearable
            multiple>
            <template #selected="{ selected }">
              <span class="avatar-group">
                <Avatar
                  v-for="user in selected"
                  :key="user.id"
                  :src="user.avatar"
                  :initials="user.name"
                  class="avatar--s" />
              </span>
            </template>
            <template #option="{ option: user }">
              <Avatar :src="user.avatar" :initials="user.name" class="avatar--s" />
              {{ user.name }}
            </template>
          </Selector>
        </fieldset>

        <fieldset class="label">
          <legend>Multiple select</legend>
          <Selector
            v-model="data.users"
            :options="users"
            placeholder="Select many..."
            size="12"
            multiple>
            <template #selected="{ selected }">
              <div class="chip-group">
                <span v-for="user in selected" :key="user.id" class="chip">
                  {{ user.name }}
                </span>
              </div>
            </template>
            <template #default="{ item: user }">{{ user.name }}</template>
          </Selector>
        </fieldset>
      </fieldset>
    </div>
    
    <fieldset class="label">
      <legend>Transfer</legend>
      <Transfer v-model="data.admins" :options="users" multiple>
        <template #default="{ item: user }">
          <Avatar
            :src="user.avatar"
            :initials="`${user.name} ${user.surname}`"
            class="avatar--s" />
          {{ user.name }}
        </template>
      </Transfer>
    </fieldset>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ListBox, Selector, Transfer, Avatar } from '/@/components';
import users from '/@/assets/data/users.json';

const data = reactive({
  user: undefined,
  users: [],
  admins: [],
});
</script>

<style lang="scss" scoped>
.avatar {
  margin-right: 0.25rem;

  &--s { --size: 1.5rem; }
  &--xs { --size: 1rem; }
}

.selector__label > .avatar--s,
.avatar-group {
  margin: -0.25rem 0;
}
</style>
