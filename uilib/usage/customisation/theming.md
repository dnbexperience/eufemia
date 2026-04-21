---
title: 'Theming'
version: 11.0.0
generatedAt: 2026-04-21T13:54:10.461Z
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
.my-component {
  color: var(--token-color-text-warning);
}
```

### Dark surfaces

Use `surface="dark"` to tell Eufemia that an area has a dark background. Components inside that area will automatically pick the right colors. The `ondark` tokens are the color values they switch to.

For example, a button that normally uses `--token-color-background-action-hover` will switch to `--token-color-background-action-hover-ondark` when `surface="dark"` is active.

Read more about `ondark` tokens and how to use them in custom components in the [Design Tokens](/uilib/usage/customisation/theming/design-tokens/info/#ondark-tokens) section.

#### How `surface` works

The `surface` prop is passed through **React context**, not through a global CSS class. When you set `surface="dark"` on a `<Theme>`, `<Theme.Context>`, or on a supporting component like [Section](/uilib/components/section/), the value is stored in the Eufemia theme context. Individual components that support dark surfaces — such as [Button](/uilib/components/button/) or [Anchor](/uilib/components/anchor/) — read the surface value from context and apply their own component-level CSS class (e.g. `dnb-button--surface-dark`, `dnb-anchor--surface-dark`).

Wrap an area with `<Theme.Context>` or `<Section>` to propagate the surface context to all supporting components inside:

```jsx
<Theme.Context surface="dark">
  <Button>I adapt automatically</Button>
  <Anchor href="/path">So do I</Anchor>
</Theme.Context>
```

Use `surface="initial"` to reset components back to their default behavior inside a dark surface context:

```jsx
<Section surface="dark">
  <Button>Dark surface button</Button>
  <Theme.Context surface="initial">
    <Button>Default surface button</Button>
  </Theme.Context>
</Section>
```
