---
title: 'Theming'
version: 11.0.3
generatedAt: 2026-04-28T21:06:12.846Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Theming

Eufemia supports theming through design tokens and theme packages. Together, these let you adapt the look and feel of your application to match different brands or visual modes.

## Theme component and `useTheme` hook

Eufemia has [theming helpers](/uilib/usage/customisation/theming/theme), that lets you create nested theming solutions.

It provides a React context for theme information, and a helper component to set the active theme and surface.

## Run your application with a different theme

Themes are independent style packages that should not be imported in parallel, but rather one or the other.

You can easily switch the static import of styles to a different theme:

```diff
import '@dnb/eufemia/style/core' // or /basis when "dnb-core-style" is used
- import '@dnb/eufemia/style/themes/ui'
+ import '@dnb/eufemia/style/themes/eiendom'
```

Read more about [how to import styles](/uilib/usage/customisation/styling/consume-styles/#select-a-theme).

However, giving the user the ability to switch a theme during runtime is a different challenge.

The Eufemia Portal (documentation) uses [gatsby-plugin-eufemia-theme-handler](https://github.com/dnbexperience/gatsby-plugin-eufemia-theme-handler) to handle it both in development and production mode.

In future we may provide a built-in solution for runtime theme switching.

## Design tokens

Design tokens are CSS custom properties that store colors and other values used by Eufemia components.

Unlike plain CSS variables such as `--color-sea-green` that map directly to a fixed color, tokens like `--token-color-text-warning` describe a **role**. The actual color behind the token depends on the active theme and surface, making your styles portable across visual contexts.

## Basic usage

Use the `var()` function to reference a token in your CSS:

```css
.my-component {
  background-color: var(--token-color-background-neutral-subtle);
  color: var(--token-color-text-neutral);
  border: 1px solid var(--token-color-stroke-neutral);
}

.my-component__title {
  color: var(--token-color-text-neutral);
}

.my-component__action {
  background-color: var(--token-color-background-action);
  color: var(--token-color-text-action-inverse);
}
```

### Using tokens in your own styles

When writing custom component styles, you can use design tokens with the `var(--token-*)` syntax. For example:

```scss
.my-component__title--warning {
  color: var(--token-color-text-warning);
}
```

### Dark surfaces

Use `surface="dark"` on the [Theme](/src/docs/uilib/usage/customisation/theming/theme/) component to tell Eufemia that an area has a dark background. Components inside that area will automatically pick the right colors. The `ondark` tokens are the color values they switch to.

For example, a button that normally uses `--token-color-background-action-hover` will switch to `--token-color-background-action-hover-ondark` when `surface="dark"` is active.

Read more about `ondark` tokens and how to use them in custom components in the [Design Tokens](/uilib/usage/customisation/theming/design-tokens/info/#ondark-tokens) section.

Read more about the [surface](/uilib/usage/customisation/theming/theme/) property.

## Dark mode / Color scheme

Use the `colorScheme` prop on the [Theme](/src/docs/uilib/usage/customisation/theming/theme/) component to control dark and light mode.

When set to `"auto"`, it follows the user's system color preference unless overridden by a parent theme or application setting. It uses the [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme) media query to detect the system preference.

Dark mode tokens are not included in the default theme import. You need to import them separately:

```tsx
import { Theme } from '@dnb/eufemia/shared'

// Required: import dark mode tokens
import '@dnb/eufemia/style/themes/ui/ui-theme-dark-mode--isolated.min.css' // If style isolation is used

render(
  <Theme colorScheme="auto">
    <App />
  </Theme>
)
```

When the `eufemia-theme__color-scheme--dark` class is active, the dark tokens override the same CSS custom property names with dark-appropriate values. For example, `--token-color-background-page-background` switches from `--dnb-greyscale-0` (white) to `--dnb-greyscale-1000` (dark).

Read more about the [colorScheme](/uilib/usage/customisation/theming/theme/) property, including [preventing dark mode flash (FOUC)](/uilib/usage/customisation/theming/theme/#preventing-dark-mode-flash-fouc) for SSR considerations.
