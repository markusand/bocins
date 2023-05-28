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

        <fieldset class="label">
          <legend>Panel replacement</legend>
          <Selector
            v-model="data.user"
            :options="teams"
            placeholder="Select one..."
            clearable
            size="12">
            <template #selected="{ selected }">
              <Avatar :src="selected.avatar" :initials="selected.name" class="avatar--s" />
              {{ selected.name }}
            </template>
            <template #panel="{ options, select }">
              <TreeList :schema="options" children-node="members" class="treelist">
                <template #title="{ item: area }">
                  <div @click.prevent="select(area)">
                    <Avatar :src="area.avatar" :initials="area.name" class="avatar--s" />
                    {{ area.name }}
                  </div>
                </template>
                <template #default="{ item: user }">
                  <div class="user" @click="select(user)">
                    <Avatar :src="user.avatar" :initials="user.name" class="avatar--s" />
                    {{ user.name }}
                  </div>
                </template>
              </TreeList>
            </template>
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
import { ListBox, Selector, Transfer, Avatar, TreeList } from '/@/components';
import users from '/@/assets/data/users.json';

const data = reactive({
  user: undefined,
  users: [],
  admins: [],
});

const teams = Object.values(users.reduce((acc, member) => {
  if (!acc[member.area]) acc[member.area] = { name: member.area, members: [] };
  acc[member.area].members.push(member as any);
  return acc;
}, {} as Record<string, any>));
</script>

<style lang="scss" scoped>
.avatar {
  &--s { --size: 1.5rem; }
  &--xs { --size: 1rem; }
}

.selector__label > .avatar--s,
.avatar-group {
  margin: -0.25rem 0;
}
</style>

<style lang="scss">
.treelist {
  margin: 0.75rem 0.25rem !important;

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0 0.5rem 0 1.85rem !important;
    padding: 0.5rem 0.75rem !important;
    border-left: 1px solid #8888;
  }

  .user {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
