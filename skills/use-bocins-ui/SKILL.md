---
name: use-bocins-ui
description: Enforces best practices for Bocins UI. Use when Bocins is a dependency or user wants to use it.
---

Bocins: Vue 3 component library. Docs: https://bocins.netlify.app

## Critical Rules

1. **Import from barrel**: `from "/@/components"`, NOT `from "bocins"` directly
2. **Style with CSS vars**: Use `--btn-color`, never `!important` or direct overrides
3. **Use built-in props**: `variant="ghost"` `size="small"` `clearable` `block` `invalid`
4. **Slots for composition**: Customize with slots, not new components for single use
5. **Extract when repeated 3+**: Create custom component only when pattern repeats

## Component Categories

**Forms**: Input, Password, Search, LongText, ChipsInput, Stepper, Rating, Selector, ListBox, Picker, Transfer, DatePicker, Calendar, Switch, ToggleButton, Toggler, FileDrop, Passcode

**Actions**: Button, ButtonGroup, InputGroup, ContextualMenu

**Display**: Avatar, AvatarGroup, Chip, Icon, Divider, ImageExpand, Carousel

**Layout**: Tabs, TabView, Accordion, Collapser, Pagination, TreeList

**Overlays**: Modal, Dropdown, Popover, Tooltip

## Setup

```ts
// main.ts
import "bocins/dist/index.css";

// Optional: custom icon path 
import { config } from "bocins";
config.iconPath = "/my-icons"; 
```

## Key Patterns

### Import (ALWAYS use barrel)

Only `/@/components/` files may import directly from `bocins` to avoid circular dependencies. all Views and Partials must import from the `/@/components` barrel to maintain a single source of truth and ensure use of vetted wrappers.

```ts
// components/index.ts
export { Selector, Avatar } from "bocins";

// views/UserZone.vue - ✓ Correct
import { Avatar } from "/@/components";
```

### Props
- `width`: `15` (rem) | `"200px"` | `"50%"`
- `block`, `disabled`, `invalid`, `clearable`
- `variant`: `"ghost"` | `"flat"`
- `size`: `"small"` | `"large"`

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
<Selector v-model="user" :options="users">
  <template #selection="{ item: user }">
    <Avatar :src="user.avatar" /> {{ user.name }}
  </template>
  <template #option="{ option: user }">
    <Avatar :src="user.avatar" /> <strong>{{ user.name }}</strong>
  </template>
</Selector>

<!-- Input with icon -->
<Input v-model="price">
  <template #prefix><Icon src="/icons/dollar.svg" /></template>
</Input>
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
    <Button type="submit">Save Team</Button>
  </form>
</template>

<script setup lang="ts">
  import { UserSelector } from "/@/components";
  // ...
</script>
```

## Common Mistakes

❌ Import from `"bocins"` → ✅ Use `"/@/components"` barrel
❌ CSS `!important` → ✅ Use CSS vars (`--btn-color`)
❌ Wrapper divs → ✅ Style component directly
❌ Repeated slots → ✅ Use `#default` as fallback when available
❌ Custom component for single use → ✅ Use built-in props and slots first

## Performance & TypeScript

- **Types**: All components export props (`ButtonProps`, `SelectorProps`)
- **Large lists**: Use `keyAttr` prop (Selector/ListBox/Transfer)
- **A11y**: Built-in focus/keyboard. Add labels and ARIA where needed

## Resources

- **Forms/Validation**: `rules/forms.md`
- **Styling/CSS Vars**: `rules/styling.md`
- **Recipes/Patterns**: `rules/recipes.md`
- **Docs**: https://bocins.netlify.app
