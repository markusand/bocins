# Recipes

Common UI patterns. See <https://bocins.netlify.app> for full implementations.

These are non-exhaustive examples of how to compose Bocins. Do not force these specific components if the user request implies a different UI; instead, apply the underlying logic (slots, props, and composition) to the requested context.

## Confirmation Dialog

```html
<Modal>
  <template #toggler="{ open }">
    <Button @click="open">Delete</Button>
  </template>
  <template #default="{ close }">
    <p><Icon src="/icons/alert.svg" /> Are you sure?</p>
    <footer>
      <Button alert @click="deleteItem();close()">Delete</Button>
      <Button variant="ghost" @click="close">Cancel</Button>
    </footer>
  </template>
</Modal>
```

## Data Table

```html
<Search v-model="searchBy" />
<table>
  <tr v-for="user in users">
    <td><Avatar :src="user.avatar" /></td>
    <td>{{ user.name }}</td>
    <td><Chip>{{ user.status }}</Chip></td>
    <td><ContextualMenu :item="user" :items="actions" /></td>
  </tr>
</table>
<Pagination v-model="page" :total="totalPages" />
```

## User Zone

```html
<Tabs>
  <TabView id="profile" label="Profile">
    <UserProfile :user />
  <TabView id="badges" label="Badges">
    <UserBadges :badges="user.badges" />
  </TabView>
  <TabView id="settings" label="Settings">
    <UserSettings
      :settings="user.settings"
      @update="updateSettings" />
  </TabView>
</Tabs>
```

## File Upload

```html
<FileDrop @change="onDrop">
  <div v-for="file in previews" class="preview">
    <img :src="file.url" />
    <Button @click="remove(file)"><Icon src="/icons/x.svg" /></Button>
  </div>
</FileDrop>
```

## Search & Filter

```html
<Search v-model="searchBy" />
<Selector v-model="filterBy" :options="filterOptions">
  <template #selections="{ items: filters }">
    <Chip v-for="filter in filters">{{ filter.label }}</Chip>
  </template>
</Selector>
<div class="cards" data-empty="No results found">
  <article v-for="item in items" :key="item.id">
    {{ item.name }} {{ item.qty }}
  </article>
</div>
<Pagination v-model="page" :total="totalPages" />
```

## Troubleshooting

- Icons not showing → Set `config.iconPath` before mount
- Styles not applied → Import `bocins/dist/index.css` in main.ts
- v-model not working → Use `v-model`, not `:value` + `@input`
- Selector empty → Provide `keyAttr` for object arrays
- Styles not overriding → Use CSS variables, not `!important`
