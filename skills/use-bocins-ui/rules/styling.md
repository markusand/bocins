# Styling & Customization

## Best Practices Summary

1. **Scoped & Property-Based:** Always use `<style scoped>` and CSS custom properties `var(--btn-color)`. Avoid direct overrides or `!important`.
2. **Standard Units:** Use `em` for component-relative and `rem` for root-relative sizing.
3. **Logic-Driven UI:** Favor built-in props (`block`, `disabled`, `invalid`) and semantic variants (`ghost`, `flat`) over custom utility classes.
4. **Theme SSOT:** Define global variables in `:root`, then map them to component variables, e.g., `--btn-color: var(--color-accent)`.

## Theming

Set CSS variables in `:root`. Always use internal component variables (like `--btn-color`) instead of direct CSS properties (like `background`).

```css
@import "bocins/dist/index.css";

:root {
  --color-accent: #39f;
  --color-error: #d33;

  --btn-color: var(--color-accent);
}

.btn[primary] { --color: var(--color-accent); }
```

## Variants & Icons

Use built-in variants: `variant="ghost"`, `size="small"`

Icons use Lucide by default. Change path with `config.iconPath = '/my-icons'` before using components. Style icons with `--icon-size` and `--icon-color`.

## Component CSS Variables

Each component exposes variables for customization:

- **Button**: `--btn-spacing`, `--btn-radius`, `--btn-color`, `--btn-color-text`
- **Input**: `--spacing`, `--border-width`, `--color-bg`, `--color-border`, `--radius`
- **Switch**: `--switch-size`, `--color-on`, `--color-off`, `--color-thumb`
- **Avatar**: `--size`
- **Icon**: `--size`, `--color`

Refer to [bocins.netlify.app](https://bocins.netlify.app) for complete variable lists.

## Common Props

- **block**: Full-width display
- **disabled**: Disables interaction, applies disabled styling
- **invalid**: Shows validation error (red border/text)
- **variant**: Style variation (`ghost`, `flat`)
- **size**: Size variation (`small`, `large`)

## Layout Components

- **ButtonGroup**: Groups buttons with shared variant/size
- **InputGroup**: Groups inputs (alias for ButtonGroup)
- **AvatarGroup**: Stacks avatars with `stacked` prop
