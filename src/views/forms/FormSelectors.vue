<template>
  <section class="section">
    <h3>Selectors<em>Select data from a bunch of options</em></h3>
    
    <div class="columns">
      <fieldset class="label">
        <legend>List box</legend>
        <ListBox
          v-model="data.user"
          :options="users"
          clearable="Clear selection">
          <template #default="{ item: user }">
            <Avatar
              :src="user.avatar"
              :name="`${user.name} ${user.surname}`"
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
              <Avatar :src="user.avatar" :name="user.name" class="avatar--s" />
              {{ user.name }}
            </template>
            <template #option="{ option: user }">
              <Avatar :src="user.avatar" :name="user.name" class="avatar--s" />
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
            <template #selecteds="{ selected }">
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
            <template #selecteds="{ selected }">
              <span class="avatar-group">
                <Avatar
                  v-for="user in selected"
                  :key="user.id"
                  :src="user.avatar"
                  :name="user.name"
                  class="avatar--s" />
              </span>
            </template>
            <template #option="{ option: user }">
              <Avatar :src="user.avatar" :name="user.name" class="avatar--s" />
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
            <template #selecteds="{ selected }">
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
            v-model="data.target"
            :options="teams"
            placeholder="Select one..."
            clearable
            size="12">
            <template #selected="{ selected }">
              <template v-if="'avatar' in selected">
                <Avatar :src="selected.avatar" :name="selected.name" class="avatar--s" />
              </template>
              {{ selected.name }}
            </template>
            <template #panel="{ select }">
              <TreeList
                :schema="teams"
                name-node="name"
                children-node="members"
                class="treelist">
                <template #default="{ item }">
                  <label class="treelist-leaf">
                    <input
                      name="user"
                      type="radio"
                      :value="item"
                      @input="select(item)">
                    <div class="treelist-leaf__label">
                      <template v-if="'avatar' in item">
                        <Avatar :src="item.avatar" :name="item.name" class="avatar--s" />
                      </template>
                      {{ item.name }}
                    </div>
                  </label>
                </template>
              </TreeList>
            </template>
          </Selector>
        </fieldset>
      </fieldset>
    </div>
    
    <fieldset class="label">
      <legend>Transfer</legend>
      <Transfer v-model="data.admins" :options="users">
        <template #default="{ item: user }">
          <Avatar
            :src="user.avatar"
            :name="`${user.name} ${user.surname}`"
            class="avatar--s" />
          {{ user.name }}
        </template>
      </Transfer>
    </fieldset>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ListBox, Selector, Transfer, Avatar, TreeList, type TreeNode } from '/@/components';
import users from '/@/assets/data/users.json';

type User = { name: string; avatar: string };
type Team = { name: string; members: (Team | User)[] };

const teams: TreeNode<Team, 'members'>[] = Object.values(users.reduce((acc, member) => {
  if (!acc[member.area]) acc[member.area] = { name: member.area, members: [] };
  acc[member.area].members.push(member as any);
  return acc;
}, {} as Record<string, Team>));

const data = reactive({
  user: undefined,
  target: teams[0] as Team | User,
  users: [],
  admins: [],
});

</script>

<style lang="scss">
.avatar--s { --size: 1.5rem; }

.b-selector__label > .avatar--s,
.avatar-group { margin: -0.25rem 0; }

.treelist {
  padding: 0.5rem;
  background: var(--background);
  border: var(--input-border);
  border-radius: var(--input-border-radius);

  ul {
    display: flex;
    flex-direction: column;
    margin-left: 0.5rem !important;
    padding-left: 0.5rem !important;
    border-left: 1px solid #8883;
  }

  &-item__label:hover,
  summary:focus &-item__label { background: #8882; }

  &-leaf {
    display: block;
    flex: 1;

    input { display: none; }

    // stylelint-disable no-descending-specificity
    &__label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem;
      border-radius: var(--border-radius);
      cursor: pointer;

      :checked + & {
        background: var(--color-primary);
        color: #fff;
        cursor: default;
      }
    }
  }
}
</style>
