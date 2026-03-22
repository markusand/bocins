# Bocins

Collection of reusable UI components for Vue 3 that can be used standalone or combined together to create flexible and customized interfaces. The term **bocins** is derived from catalan and means *small bits or pieces of something*.

Explore all components in [Storybook](https://bocins.netlify.app).

![bocins](https://github.com/markusand/vue-ui-components/assets/12972543/762e3261-34bf-470b-8420-0c56f6333d37)

[![NPM](https://img.shields.io/npm/v/bocins)](https://npmjs.org/package/bocins)
[![NPM](https://img.shields.io/bundlephobia/minzip/bocins)](https://npmjs.org/package/bocins)
[![NPM](https://img.shields.io/npm/l/bocins)](https://npmjs.org/package/bocins)
[![Netlify Status](https://api.netlify.com/api/v1/badges/57ca7f9d-4047-4f47-b37c-53102f268e60/deploy-status)](https://app.netlify.com/sites/bocins/deploys)

## Get started

Install the library

```bash
npm i bocins
```

Default icons are copied from `/node_modules/bocins/dist/icons` to `/public/icons/`. Replace them to use your own icons. Existing icons won't be replaced.

To load icons from a custom path (e.g., a CDN), configure the icon path **before** importing components:

```ts
// main.ts
import { config } from 'bocins';

// Configure icon path BEFORE using any components
config.iconPath = 'https://cdn.example.com/icons'; // CDN
config.iconPath = '/my-custom-icons'; // Custom local path
```

Import styles in your app entry point file or in your styles entry point

```ts
// main.ts
import 'bocins/dist/index.css';

// main.scss
@import 'bocins/dist/index.css';
```

You can customize the theme using CSS custom properties and extending some base styles

```css
:root {
  font-size: 16px;
  font-family: system-ui, Arial, sans-serif;

  color-scheme: light dark;

  --color-bg: light-dark(#f8f8f8, #333);
  --color-text: light-dark(#333, #efefec);
  --color-error: #d33;
  --color-accent: #39f;
  --btn-color: var(--color-accent);
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

## Claude Code Skill

A Claude Code skill is available in `skills/use-bocins-ui/` to help AI assistants follow Bocins best practices when working in projects that use this library. It enforces correct import patterns, component usage, styling conventions, and composition patterns.
