![bocins](https://github.com/markusand/vue-ui-components/assets/12972543/762e3261-34bf-470b-8420-0c56f6333d37)

# Bocins

Collection of reusable UI components for Vue 3 that can be used standalone or combined together to create flexible and customized interfaces. The term **bocins** is derived from catalan and means *small bits or pieces of something*.

[![NPM](https://img.shields.io/npm/v/bocins)](https://npmjs.org/package/bocins)
[![NPM](https://img.shields.io/bundlephobia/minzip/bocins)](https://npmjs.org/package/bocins)
[![NPM](https://img.shields.io/npm/l/bocins)](https://npmjs.org/package/bocins)

## Get started

Install the library

```bash
npm i bocins
```

Default icons are copied from `/node_modules/bocins/dist/icons` to `/public/icons/`. Replace them to use your own icons. Existing icons won't be replaced.

Import styles in your app entry point file or in your styles entry point

```ts
// main.ts
import 'bocins/dist/style.css';

// main.scss
@import 'bocins/dist/style.css';
```

You can customize the theme using CSS variables and extending some base styles

```css
:root {
  font-size: 16px;
  font-family: system-ui, Arial, sans-serif;

  color-scheme: light dark;

  --color-bg: light-dark(#f8f8f8, #333);
  --color-text: light-dark(#333, #efefec);
  --color-error: #d33;
  --color-accent: #39f;
  --color-btn: var(--color-accent);
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}

.btn[alert] { --color: var(--color-error); }

.switch {
  --color-on: lightgreen;
  --color-off: var(--color-error);
}
```

## Usage

Import and use components directly in your vue files

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
.avatar { --size: 1.5rem; }
</style>
```
