![bocins](https://github.com/markusand/vue-ui-components/assets/12972543/762e3261-34bf-470b-8420-0c56f6333d37)

# Bocins

Collection of reusable UI components for Vue 3 that can be used standalone or combined together to create flexible and customized interfaces. The term **bocins** is derived from catalan and means *small bits or pieces of something*.

[![NPM](https://img.shields.io/npm/v/bocins)](https://npmjs.org/package/bocins)
[![NPM](https://img.shields.io/bundlephobia/minzip/bocins)](https://npmjs.org/package/bocins)
[![NPM](https://img.shields.io/npm/l/bocins)](https://npmjs.org/package/bocins)

## Get started

Install bocins with npm

```bash
npm i bocins
```

Import components directly in your vue files

```html
<template>
  <Selector v-model="user" :options="store.users">
    <template #default="{ item: user }">
      <Avatar :src="user.avatar" :name="user.name" />
      {{ user.name }}
    </template>
  </Selector>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Selector, Avatar } from 'bocins';
import store, { type User } from './store';

const user = ref<User>();
</script>

<style scoped>
.b-avatar { --size: 1.5rem; }
</style>
```
