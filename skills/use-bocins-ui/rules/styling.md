# Styling & Customization

## Best Practices Summary

1. **Scoped & Property-Based:** Always use `<style scoped>` and CSS custom properties `var(--btn-color)`. Avoid direct overrides or `!important`.
2. **Standard Units:** Use `em` for component-relative and `rem` for root-relative sizing.
3. **Logic-Driven UI:** Favor built-in props (`block`, `disabled`, `invalid`) and semantic variants (`ghost`, `flat`) over custom utility classes.
4. **Theme SSOT:** Define global variables in `:root`, then map them to component variables, e.g., `--btn-color: var(--accent-color)`.

## Global Design Tokens

Set these on `:root` and every component responds automatically:

| Token              | Used for                          |
| ------------------ | --------------------------------- |
| `--bg-color`       | Panel / input background          |
| `--text-color`     | Text color                        |
| `--border-color`   | Input / panel border              |
| `--border-width`   | Input / panel border width        |
| `--radius`         | Border radius fallback            |
| `--accent-color`   | Focus, active, and hover state    |
| `--disabled-color` | Disabled state                    |
| `--error-color`    | Invalid / error state             |

## Utility Classes

Applied by components internally, also usable directly:

- **`.is-panel`** — background + border + radius (uses global tokens)
- **`.is-block`** — full-width (`width: 100%`)
- **`.is-disabled`** — dimmed + `cursor: not-allowed`, sets `--disabled-color`
- **`.is-invalid`** — red border/background/text, sets `--error-color`

## Theming

Set CSS variables in `:root`. Always use internal component variables (like `--btn-color`) instead of direct CSS properties (like `background`).

```css
@import "bocins/dist/index.css";

:root {
  --accent-color: #39f;
  --error-color: #d33;

  --btn-color: var(--accent-color);
}

.btn[primary] { --color: var(--accent-color); }
```

## Variants & Icons

Use built-in variants: `ghost`, `flat` (boolean props on Button/ToggleButton). Size: `sm`, `lg`.

Icons use Lucide by default. Change path with `config.iconPath = '/my-icons'` before using components. Style icons with `--icon-size` and `--icon-color`.

## Component CSS Variables

Each component follows a two-level convention:

- **Theme var** (`--{component}-*`): set on `:root` to affect all instances
- **Instance var** (shorter internal name): set on a specific element to override just that one

```css
/* Theme all buttons */
:root { --btn-color: royalblue; }

/* Override a single button */
.btn-danger { --color: crimson; }
```

### ActionMenu

Root class: `.action-menu`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--action-menu-text-color` | `--text-color` | `inherit` | Text/icon color |
| `--action-menu-border` | `--border` | `1px solid #8884` | Separator between groups |
| `--action-menu-spacing` | `--spacing` | `0.25em` | Inner padding and gaps |
| `--action-menu-min-width` | `--min-width` | `7rem` | Minimum panel width |
| `--action-menu-max-width` | `--max-width` | `12rem` | Maximum panel width |

### Avatar

Root class: `.avatar`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--avatar-size` | `--size` | `2rem` | Width/height |
| `--avatar-radius` | `--radius` | `15%` | Border radius |
| `--avatar-color` | `--color` | `#8883` | Initials background |
| `--avatar-text-color` | `--text-color` | `#888` | Initials text color |
| `--avatar-badge-color` | `--badge-color` | `#66b132` | Badge background |
| `--avatar-badge-outline` | `--badge-outline` | `2px solid #fff` | Badge outline ring |

### AvatarGroup

Root class: `.avatar-group`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--avatar-group-overlap` | `--overlap` | `0.35` | Fractional overlap (multiplied by `--size`) |
| `--avatar-group-outline` | `--outline` | `2px solid #fff` | Outline ring between stacked avatars |

### Button

Root class: `.btn`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--btn-spacing` | `--spacing` | `0.5rem` | Padding and gap |
| `--btn-color` | `--color` | `#333` | Background/accent color |
| `--btn-text-color` | `--text-color` | `#fff` | Text/icon color |
| `--btn-border-width` | `--border-width` | `1px` | Border width |
| `--btn-radius` | `--radius` | `0.25em` | Border radius |

### Calendar

Root class: `.calendar`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--calendar-spacing` | `--spacing` | `0.5rem` | Padding and gap |
| `--calendar-selected-color` | `--selected-color` | `#333` | Selected day background |
| `--calendar-selected-text-color` | `--selected-text-color` | `#fff` | Selected day text |
| `--calendar-text-color` | `--text-color` | `currentcolor` | Default text color |
| `--calendar-bg-color` | `--bg-color` | `#fff` | Background |
| `--calendar-radius` | `--radius` | `0.25rem` | Day cell border radius |

### Carousel

Root class: `.carousel`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--carousel-control-color` | `--control-color` | `#fff` | Dot indicator color |
| `--carousel-control-size` | `--control-size` | `0.5rem` | Dot diameter |
| `--carousel-control-spacing` | `--control-spacing` | `var(--control-size)` | Gap between dots |

### Chip

Root class: `.chip`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--chip-color` | `--color` | `#888` | Text and border tint |
| `--chip-opacity` | `--opacity` | `5%` | Background fill opacity |
| `--chip-size` | `--size` | `0.8em` | Font size |
| `--chip-border` | `--border` | `inset 0 0 0 1px ...` | Box-shadow border |
| `--chip-radius` | — | `var(--radius, 0.25em)` | Border radius |

### ChipsInput

Root class: `.chips-input`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--chips-input-spacing` | `--spacing` | `0.5rem` | Gap between chips |
| `--chips-input-color` | `--chip-color` | `#888` | Child Chip color |

### Collapser

Root class: `.collapser`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--collapser-spacing` | `--spacing` | `0.75rem` | Padding |
| `--collapser-separator-color` | `--separator-color` | `#8882` | Border between collapsers |
| `--collapser-timing` | `--timing` | `0.3s` | Animation duration |
| `--collapser-text-color` | `--text-color` | `inherit` | Text color |
| `--collapser-bg-color` | `--bg-color` | `transparent` | Background |

### DatePicker

Root class: `.datepicker`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--date-picker-border` | `--border` | `1px solid #8884` | Border between presets and calendar |

### Divider

Root class: `.divider`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--divider-color` | `--color` | `#8888` | Line and label color |
| `--divider-margin` | `--margin` | `2rem` | Vertical margin |
| `--divider-width` | `--width` | `1px` | Line thickness |
| `--divider-opacity` | `--opacity` | `75%` | Line opacity |

### Dropdown

Root class: `.dropdown`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--dropdown-gap` | `--gap` | `0.25rem` | Offset between toggler and panel |
| `--dropdown-timing` | `--timing` | `0.2s` | Transition duration |

### FileDrop

Root class: `.file-drop`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--file-drop-color` | `--color` | `#888` | Border, text, icon color |
| `--file-drop-border` | `--border` | `1px dashed ...` | Drop-zone border |
| `--file-drop-radius` | `--radius` | `0.25rem` | Border radius |
| `--file-drop-timing` | `--timing` | `0.3s` | Transition duration |
| `--file-drop-active-color` | `--active-color` | `var(--accent-color, #333)` | Color when focused/dragging |

### HotKey

Root class: `.hotkey`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--hotkey-color` | `--color` | `#888` | Key badge color |
| `--hotkey-active-color` | `--active-color` | `#333` | Color when pressed |
| `--hotkey-size` | `--size` | `0.75em` | Font size |

### Icon

Root class: `.icon`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--icon-color` | `--color` | `currentcolor` | SVG color |
| `--icon-size` | `--size` | `1.25rem` | Width/height |

### ImageExpand

Root class: `.image-expand`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--image-expand-bg-color` | `--bg-color` | `#000a` | Fullscreen background |

### ListBox

Root class: `.listbox`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--listbox-color` | `--color` | `var(--accent-color, #333)` | Selected option highlight |
| `--listbox-max-height` | `--max-height` | `10rem` | Scrollable list max height |
| `--listbox-border-color` | `--border-color` | `#8886` | Panel border |
| `--listbox-spacing` | `--spacing` (on `.picker`) | `1px` | Gap between options |

### LongText

Root class: `.longtext`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--longtext-spacing` | `--spacing` | `0.5rem` | Textarea padding |

### Modal

Root class: `.modal`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--modal-border` | `--border` | `1px solid #8884` | Border |
| `--modal-padding` | `--padding` | `0.75rem` | Internal padding |
| `--modal-radius` | `--radius` | `0.25rem` | Border radius |
| `--modal-max-width` | `--max-width` | `calc(100dvw - 2rem)` | Maximum width |
| `--modal-max-height` | `--max-height` | `calc(100dvh - 2rem)` | Maximum height |
| `--modal-backdrop-color` | `--backdrop-color` | `#0006` | Backdrop color |
| `--modal-backdrop-filter` | `--backdrop-filter` | `none` | Backdrop filter (blur, etc.) |
| `--modal-in-translate` | `--translate` | `0 2rem` | Entry/exit animation offset |
| `--modal-timing` | `--timing` | `0.3s` | Animation duration |

### Pagination

Root class: `.pagination`

| Theme var | Controls |
|---|---|
| `--pagination-separator-color` | Ellipsis color (default: `#8888`) |
| `--pagination-color` | Active page button (default: `var(--accent-color, #333)`) |

### Passcode

Root class: `.passcode`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--passcode-size` | `--size` | `2rem` | Cell font size |
| `--passcode-gap` | `--gap` | `0.5em` | Gap between cells |
| `--passcode-bg-color` | `--bg-color` | `none` | Cell background |
| `--passcode-text-color` | `--text-color` | `currentcolor` | Digit color |
| `--passcode-border` | `--border` | `1px solid #8886` | Cell border |
| `--passcode-radius` | — | `var(--radius, 0.25em)` | Cell border radius |

### Password

Root class: `.password`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--password-strong-color` | `--strong-color` | `#5aa45d` | Strong strength bar |
| `--password-moderate-color` | `--moderate-color` | `#e2a140` | Moderate strength bar |
| `--password-low-color` | `--low-color` | `#ce4d44` | Low strength bar |

### Picker

Root class: `.picker`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--picker-spacing` | `--spacing` | `0.25rem` | Padding and gap |

### Popover

Root class: `.popover`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--popover-bg-color` | `--bg-color` | `#fff` | Panel background |
| `--popover-bg` | `--bg` | `#333` | Arrow background (set via inline style) |
| `--popover-gap` | `--gap` | `0.25rem` | Gap between anchor and popover + arrow size |
| `--popover-text-color` | `--text-color` | `inherit` | Text color |
| `--popover-spacing` | `--spacing` | `0` | Internal padding |
| `--popover-border` | `--border` | `1px solid #8888` | Panel border |
| `--popover-radius` | `--radius` | `0.25rem` | Border radius |

### Progress

Root class: `.progress`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--progress-color` | `--color` | `var(--accent-color, #333)` | Fill color |
| `--progress-track-color` | `--track-color` | `#8884` | Track background |
| `--progress-size` | `--size` | `auto` / `5rem` | Width (bar) or diameter (ring) |
| `--progress-height` | `--height` | `0.5rem` | Bar height |
| `--progress-radius` | `--radius` | `var(--height)` | Border radius |
| `--progress-thickness` | `--thickness` | `0.5rem` | Ring stroke thickness |

### PullTo

Root class: `.pull-to`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--pull-to-timing` | `--timing` | `0.5s` | Animation duration |
| `--pull-to-text-color` | `--text-color` | `#8888` | Color while pulling |
| `--pull-to-text-color-ready` | `--text-color-ready` | `inherit` | Color when threshold reached |

### Rating

Root class: `.rating`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--rating-size` | `--size` | `1.25rem` | Star/icon size |
| `--rating-color` | `--color` | `#fdcf10` | Active star color |
| `--rating-inactive` | `--inactive` | `#8886` | Inactive indicator color |

### Selector

Root class: `.selector`

| Theme var | Controls |
|---|---|
| `--selector-gap` | Gap between toggler and dropdown (default: `0.125rem`) |

### Slider

Root class: `.slider`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--slider-width` | `--width` | `10rem` | Track width |
| `--slider-color` | `--color` | `var(--accent-color, currentcolor)` | Fill and focus ring color |
| `--slider-radius` | `--radius` | `var(--thumb-size)` | Border radius |
| `--slider-track-color` | `--track-color` | `#8884` | Unfilled track |
| `--slider-track-height` | `--track-height` | `0.25rem` | Track height |
| `--slider-thumb-size` | `--thumb-size` | `1rem` | Thumb size |
| `--slider-thumb-color` | `--thumb-color` | `#fff` | Thumb fill |
| `--slider-thumb-border` | `--thumb-border` | `1px solid #8888` | Thumb border |
| `--slider-disabled-track-color` | `--track-color` (disabled) | `var(--bg-color, #8882)` | Track color when disabled |

### Switch

Root class: `.switch`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--switch-size` | `--size` | `1.25rem` | Track height |
| `--switch-spacing` | `--spacing` | `0.125rem` | Thumb inset |
| `--switch-on-color` | `--on-color` | `#7c7` | Checked background |
| `--switch-off-color` | `--off-color` | `#8884` | Unchecked background |
| `--switch-thumb-color` | `--thumb-color` | `#fff` | Thumb color |

### Tabs

Root class: `.tabs`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--tabs-spacing` | `--spacing` | `0.75rem` | Tab button padding |
| `--tabs-border-color` | — | `var(--border-color, #8883)` | Header bottom border |
| `--tabs-timing` | — | `0.25s` | Content transition duration |

### ToggleButton

Root class: `.toggle-button`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--toggle-btn-active-color` | `--active-color` | `color-mix(...)` | Active/selected state background |

Inherits all Button (`--btn-*`) properties.

### Toggler

Root class: `.toggler`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--toggler-color` | `--color` | `#8888` | Unchecked fill color |
| `--toggler-size` | `--size` | `0.75em` | Checkbox/radio size |
| `--toggler-scale` | `--scale` | `0.5` | Unchecked scale |
| `--toggler-active-color` | — | `var(--accent-color, #333)` | Checked fill color |

### Tooltip

Thin wrapper over Popover.

| Theme var | Maps to | Default | Controls |
|---|---|---|---|
| `--tooltip-bg-color` | `--popover-bg-color` | `#333` | Background |
| `--tooltip-text-color` | `--popover-text-color` | `#fff` | Text color |
| `--tooltip-gap` | `--popover-gap` | `0.25rem` | Gap from anchor |
| `--tooltip-radius` | `--popover-radius` | `0.25rem` | Border radius |
| `--tooltip-spacing` | `--popover-spacing` | `0.5rem 0.75rem` | Internal padding |

Note: `--popover-border` is hardcoded to `none` for tooltips — there is no border override point.

### Transfer

Root class: `.transfer`

| Theme var | Maps to | Default | Controls |
|---|---|---|---|
| `--transfer-color` | `--btn-color`, `--listbox-color` | `var(--accent-color, #333)` | Button and selection color |

### TreeList

Root class: `.treelist`

| Theme var | Instance var | Default | Controls |
|---|---|---|---|
| `--treelist-indent` | `--indent` | `1.25rem` | Nesting left margin |
| `--treelist-spacing` | `--spacing` | `0.35rem` | Item padding |
| `--treelist-radius` | `--radius` | `0.25rem` | Focus border radius |
| `--treelist-timing` | `--timing` | `0.3s` | Expand/collapse transition |

## Common Props

- **block**: Full-width display
- **disabled**: Disables interaction, applies disabled styling
- **invalid**: Shows validation error (red border/text)
- **ghost** / **flat**: Boolean props for Button/ToggleButton style variants
- **sm** / **lg**: Boolean props for Button/ToggleButton size variants

## Layout Components

- **ButtonGroup**: Groups buttons with shared variant/size
- **InputGroup**: Groups inputs (alias for ButtonGroup)
- **AvatarGroup**: Stacks avatars with `stacked` prop
