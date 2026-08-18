---
name: use-bocins-ui
description: Best practices guide for Bocins, a Vue 3 UI component library. Use this skill whenever the user is working with Bocins components (Button, Input, Selector, Modal, Tabs, etc.), adding UI to a Vue project that has bocins as a dependency, asking how to style or customize bocins components, or building forms, tables, dialogs, or overlays in a Vue app. Trigger even when the user doesn't say "bocins" by name — if they ask to add a dropdown, modal, form, or table in a Vue project where bocins is installed, use this skill.
---

Bocins: Vue 3 component library. Docs: https://bocins.netlify.app

## Approach

When the user asks to build or add UI, implement it directly using Bocins components if it's a dependency — don't ask whether they want Bocins or something else. If context is missing (e.g. data shape, filter options), make reasonable assumptions and note them inline.

## Critical Rules

1. **Import from barrel**: Views and Partials import from the project's `components` barrel (e.g. `"/@/components"`, `"@/components"` — check the project alias), NOT from `"bocins"` directly. Only files inside `components/` may import from `"bocins"`.
2. **Style with CSS vars**: Use `--btn-color`, never `!important` or direct property overrides
3. **Use built-in props**: `ghost` `flat` `sm` `lg` `clearable` `block` `invalid`
4. **Slots for composition**: Customize with slots, not new components for single use
5. **Extract when repeated**: Create a custom component only when a pattern repeats in multiple places

## Component Categories

**Forms**: Input, Password, Search, LongText, ChipsInput, Stepper, Rating, Selector, ListBox, Picker, Transfer, DatePicker, Calendar, Switch, ToggleButton, Toggler, FileDrop, Passcode

**Actions**: Button, ButtonGroup, InputGroup, ActionMenu

**Display**: Avatar, AvatarGroup, Chip, Icon, HotKey, Divider, ImageExpand, Carousel

**Layout**: Tabs, TabView, Collapser, Pagination, TreeList

**Overlays**: Modal, Dropdown, Popover, Tooltip

## Setup

```ts
// main.ts
import "bocins/dist/index.css";

// Optional: override default icon path (defaults to Lucide GitHub source)
import { config } from "bocins";
config.iconPath = "/my-icons";
```

## Key Patterns

### Import (ALWAYS use the barrel)

Only files inside the `components/` directory may import directly from `"bocins"`, to avoid circular dependencies. All Views and Partials must import from the barrel to maintain a single source of truth and use vetted wrappers.

The barrel path depends on the project's path alias — check `vite.config.ts` or `tsconfig.json`:

```ts
// components/index.ts
export { Selector, Avatar } from "bocins";

// views/UserZone.vue - ✓ Correct
import { Avatar } from "/@/components"; // or "@/components", "~/components", etc.
```

### Props

- `width`: `15` (rem) | `"200px"` | `"50%"`
- `block`, `disabled`, `invalid`, `clearable`
- Button variants: `ghost` | `flat` (boolean props)
- Button sizes: `sm` | `lg` (boolean props)
- `keyAttr`: Required when options are objects — tells Selector/ListBox/Transfer which property to use as unique key (e.g. `keyAttr="id"`)

### Slots (Primary customization method)

**Selector** (most complex):

- `#selection="{ item }"` - Single selected item display
- `#selections="{ items }"` - Multiple selected items display
- `#option="{ option }"` - Dropdown option display
- `#default="{ item }"` - Fallback for both selection and option
- `#placeholder`, `#empty` - Text states

**Input**: `#prefix`, `#suffix`

```html
<!-- Selector with custom display -->
<Selector v-model="user" :options="users" :formatter="u => u.name">
  <template #selection="{ item: user }">
    <Avatar :src="user.avatar" /> {{ user.name }}
  </template>
  <template #option="{ option: user }">
    <Avatar :src="user.avatar" /> <strong>{{ user.name }}</strong>
  </template>
</Selector>

<!-- Input with icon -->
<Input v-model="price">
  <template #prefix><Icon src="dollar.svg" /></template>
</Input>
```

### Overlays

**Modal** — wraps native `<dialog>`. Control via `#toggler` slot or `v-model:open`:

```html
<Modal closeable>
  <template #toggler="{ open }">
    <Button @click="open">Open</Button>
  </template>
  <template #default="{ close }">
    <p>Dialog content</p>
    <Button @click="close">Dismiss</Button>
  </template>
</Modal>

<!-- Programmatic control -->
<Modal v-model:open="isOpen">...</Modal>
```

Slots: `#toggler="{ open, close, toggle }"` · `#default="{ close, open }"` · `#close="{ close }"`
Props: `closeable` · `plain` (non-modal, no backdrop) · `width` · `height` · `to` (teleport target)

**Dropdown** — uses the Popover API; opens/closes on click of the toggle button. Use `#toggler` to replace the default button:

```html
<!-- Default button toggle -->
<Dropdown label="Options" icon="settings.svg">
  <ActionMenu :items="actions" />
</Dropdown>

<!-- Custom toggle -->
<Dropdown>
  <template #toggler>
    <Avatar :src="user.avatar" tabindex="0" />
  </template>
  <ActionMenu :items="userActions" />
</Dropdown>
```

Props: `label` · `icon` · `position` · `block` · `disabled` · `width` · `lazy`

**Popover** — hover/focus tooltip overlay using CSS anchor positioning:

```html
<!-- Hover to show (default) -->
<Popover position="bottom">
  <template #anchor><Button>Hover me</Button></template>
  Tooltip content
</Popover>

<!-- Click/focus to show -->
<Popover click position="right">
  <template #anchor><Icon src="info.svg" tabindex="0" /></template>
  More details here
</Popover>
```

Slots: `#default` = popover content · `#anchor` = trigger element
Props: `position` (`top` default | `bottom` | `left` | `right`) · `click` · `width`

### Tabs

`v-model` binds the active tab id. `transition` accepts `tab-slide-x` (default), `tab-fade`, or `tab-slide-y`:

```html
<Tabs v-model="activeTab" transition="tab-fade">
  <TabView id="overview" label="Overview">...</TabView>
  <TabView id="settings" label="Settings" :disabled="!canEdit">...</TabView>
</Tabs>
```

Customize tab buttons with `#tab="{ id, label, active }"` (all tabs) or `#<id>` (per tab).

### Collapser

Set `name` to create an accordion — only one open at a time (native `<details name>`):

```html
<Collapser name="faq" title="What is Bocins?">A Vue 3 UI library.</Collapser>
<Collapser name="faq" title="How to install?">npm i bocins</Collapser>
```

Custom header via `#toggler="{ open }"`. Emits `open`, `close`, `toggle`.

### TreeList

Required props: `schema` (array), `nameNode` (key for display), `childrenNode` (key for nested array). Use `#default` for leaf nodes, `#title` for branch nodes:

```html
<TreeList :schema="tree" name-node="label" children-node="children">
  <template #default="{ item, path }">
    <a :href="item.url">{{ item.label }}</a>
  </template>
</TreeList>
```

### HotKey

`keys` is a `+`-joined string of modifier and key names. Listens globally on `document`. Emits `@press` / `@release`:

```html
<HotKey keys="ctrl+s" @press="save" />
<HotKey keys="meta+shift+k" @press="openSearch" />
```

### Transfer

`v-model` must always be `T[]` (the selected/right-hand items). Pool is derived automatically:

```html
<Transfer v-model="selected" :options="allItems" key-attr="id" :limit="5" />
```

### Component Extraction

Extract to a custom reusable component when:

1. A base component is used the same way in multiple places
2. Complex composition of multiple components
3. Specific domain logic needs encapsulation

```html
/* components/UserSelector.vue */
<template>
  <Selector v-model="selected" :options="users">
    <template #selections="{ items: selected }">
      <AvatarGroup stacked>
        <Avatar
          v-for="user in selected"
          :key="user.id"
          :src="user.avatar"
          :name="user.name"
        />
      </AvatarGroup>
      {{ selected[0].name }}
      <Chip v-if="selected.length > 1">+{{ selected.length - 1 }}</Chip>
    </template>
    <template #option="{ option: user }">
      <Avatar :src="user.avatar" :name="user.name" />
      {{ user.name }}
    </template>
  </Selector>
</template>

<script setup lang="ts">
  import { Selector, AvatarGroup, Avatar, Chip } from "bocins";
  import type { User } from "/@/types";

  defineProps<{ users: User[] }>();
  const selected = defineModel<User[]>({ default: () => [] });
</script>
```

```html
/* views/TeamForm.vue */
<template>
  <form @submit.prevent="onSubmit">
    <UserSelector v-model="teamMembers" :users="availableUsers" />
    <button type="submit">Save Team</button>
  </form>
</template>

<script setup lang="ts">
  import { UserSelector } from "/@/components";
  // ...
</script>
```

## Common Mistakes

❌ Import from `"bocins"` in views/partials → ✅ Use the project's `components` barrel
❌ CSS `!important` → ✅ Use CSS vars (`--btn-color`)
❌ Wrapper divs → ✅ Style component directly
❌ Repeated slots → ✅ Use `#default` slot as fallback when `#selection` and `#option` would be identical
❌ Custom component for single use → ✅ Use built-in props and slots first

## Performance & TypeScript

- **Types**: All components export props (`ButtonProps`, `SelectorProps`)
- **Large lists**: Use `keyAttr` prop (Selector/ListBox/Transfer)
- **A11y**: Built-in focus/keyboard. Add labels and ARIA where needed

## Reference Files

Read these when relevant — they contain details not duplicated here:

- **`rules/forms.md`** — Read when working with forms, validation, or v-model bindings
- **`rules/styling.md`** — Read when customizing appearance, theming, or CSS variables
- **`rules/recipes.md`** — Read when building common patterns (tables, dialogs, search, file upload)
- **Docs**: https://bocins.netlify.app
