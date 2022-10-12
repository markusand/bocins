<template>
  <section class="section">
    <h3>Tree list<em>Hierachical dropdown tree structure</em></h3>
    <TreeList :schema="teams" children-node="members" class="members-tree">
      <template #title="{ item }">{{ item.name }}</template>
      <template #default="{ item: user }">
        <Avatar :src="user.avatar" :initials="`${user.name} ${user.surname}`" />
        {{ user.name }} {{ user.surname }}
      </template>
    </TreeList>
  </section>
</template>

<script setup lang="ts">
import { TreeList, Avatar } from '/@/components';
import users from '/@/assets/data/users.json';

type Member = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    }
  },
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  },
  surname: string;
  avatar: string;
  area: string;
  team: string;
};

type Team = {
  name: string;
  members: (Team | Member)[];
};

const teams = [{
  name: 'company',
  members: Object.values(users.reduce((acc, member) => {
    if (!acc[member.area]) acc[member.area] = { name: member.area, members: [] };
    acc[member.area].members.push(member as Member);
    return acc;
  }, {} as Record<string, Team>)),
}];
</script>

<style lang="scss">
.members-tree {
  padding: 0 0.5rem !important;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);

  li { margin: 0.5rem 0; }
}
</style>
