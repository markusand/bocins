# Vue 3 UI components

## Install

## Components

### Avatar

Avatars are circular components that usually wrap an image or icon. They can be used to represent a person or an object.

Display an image that represents a person or an object, or displays the name initials as fallback. If wrapped in an `avatar-group` element, avatars are overlapped.

```html
<Avatar :src="user.avatar" :initials="user.name" />
```

#### Props

| prop | type | default | description |
|---|---|---|---|
| src | `string`, `null` | `undefined` | Image url |
| initials | `string` | `undefined` | Name from  where extract fallback initials |

#### Events

None

#### Slots

None

#### CSS custom properties

`--avatar-size: 2rem`  
`--avatar-radius: 15%`

### Button

```html
<Button primary @click="doSomething">Do it!</Button>
```

#### Props

| prop | type | default | description |
|---|---|---|---|
| primary | `boolean` | `undefined` |  |
| alert | `boolean` | `undefined` | |
| outline | `boolean` | `undefined` | |
| flat | `boolean`  | `undefined` | |
| block | `boolean` | `undefined` | |
| loading | `boolean` | `undefined` | |
| disabled | `boolean` | `undefined` | |
| submit | `boolean` | `undefined` | |
| reset | `boolean` | `undefined` | |

#### Events

None

#### Slots

`default`

#### CSS custom properties

`--button-padding: 0.5rem`  
`--button-margin: 1px`  
`--button-border-radius: 4px`  
`--button-color: #f8f8f8`  
`--button-font-color: #606068`  
`--button-border: 1px solid #c8c8cf`

### Collapser

```html
<Collapser>
  <template #title>Title</template>
  <section>Content</section>
</Collapser>
```

#### Props

| prop | type | default | description |
|---|---|---|---|
| disabled | `boolean` | `undefined` |  |
| open | `boolean` | `undefined` | |

#### Events

`toggle`

#### Slots

`title` Title

`default` Content

#### CSS custom properties

`--collapser-padding: 0.75rem`  
`--collapser-border: 1px solid #0001`
