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

Common theme vars:

- **Button**: `--btn-color`, `--btn-text-color`, `--btn-spacing`, `--btn-radius`, `--btn-border-width`
- **Switch**: `--switch-size`, `--switch-on-color`, `--switch-off-color`, `--switch-thumb-color`
- **Avatar**: `--avatar-size`, `--avatar-radius`, `--avatar-color`, `--avatar-text-color`
- **Icon**: `--icon-size`, `--icon-color`
- **Input / Search / LongText / Stepper / Password**: respond to global tokens (see below)

Refer to the [Theming reference](https://bocins.netlify.app/?path=/docs/configuration-theming--docs) for the full variable list.

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
