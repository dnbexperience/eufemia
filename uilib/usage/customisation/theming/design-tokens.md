---
title: 'Design Tokens (beta)'
description: 'How to use Eufemia semantic design tokens in your application.'
version: 11.2.0
generatedAt: 2026-05-08T07:25:37.876Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Design Tokens (beta)

---

**Beta:** The `--token-*` CSS custom properties are in beta. We encourage you to start using them and welcome your feedback. The token API may still change, but we will communicate any breaking changes.

**Deprecated legacy colors:** The old `--color-*` CSS custom properties are deprecated. Prefer semantic design tokens such as `--token-color-text-neutral` instead. If you want automated help finding legacy color usage, Eufemia ships integrated ESLint and Stylelint plugins via `@dnb/eufemia/plugins/eslint.js` and `@dnb/eufemia/plugins/stylelint.js`. If you use the [style isolation](/uilib/usage/customisation/styling/style-isolation/) PostCSS plugin, `warnOnDeprecatedColorVariables` is enabled by default to give you build-time warnings. You can disable it by setting `warnOnDeprecatedColorVariables: false`.

---

## What are design tokens?

Design tokens are semantic CSS custom properties that represent design decisions — such as "background for an action element" or "text color for an error state" — rather than raw color values.

They follow the naming pattern `--token-color-{section}-{role}` and are the recommended way to reference Eufemia colors in your own CSS.

## Why use design tokens?

- **Theme-aware** — Token values automatically adapt when the active theme changes (e.g. DNB, Sbanken, Carnegie).
- **Semantic** — A name like `--token-color-background-action` communicates _intent_, not just a hex value. This makes code easier to review and maintain.
- **Scalable theming** — Design tokens make it straightforward to introduce new brands, sub-brands, and color modes (e.g. light/dark) without changing component code.

## Getting started

Design tokens are included when you import a Eufemia theme. No separate import is needed, except if you need dark mode support. In that case, import the extra dark mode stylesheet described in the [Dark mode guide](/uilib/usage/customisation/theming/design-tokens/dark-mode).

Read more about how to use design tokens in your own styles, and how Eufemia components use them internally, in the [Theming](/uilib/usage/customisation/theming#design-tokens) section.

For practical guidance on choosing the right tokens for your application components, see the [Guide](/uilib/usage/customisation/theming/design-tokens/guide).

## Common patterns

These examples show how to apply design tokens in typical UI scenarios. Each pattern uses semantic token names so the styles adapt automatically to themes and surfaces.

### Action elements

```css
.my-button {
  background-color: var(--token-color-background-action);
  color: var(--token-color-text-action-inverse);
  border: 1px solid var(--token-color-stroke-action);
}

.my-button:hover {
  background-color: var(--token-color-background-action-hover);
}
```

### Error and status states

```css
.my-field--error {
  border-color: var(--token-color-stroke-error);
  color: var(--token-color-text-destructive);
}

.my-field--success {
  border-color: var(--token-color-stroke-positive);
}
```

### Subtle backgrounds

```css
.my-notice {
  background-color: var(--token-color-background-warning-subtle);
  color: var(--token-color-text-warning);
}
```

## Internal usage in Eufemia components

Eufemia components are progressively adopting design tokens internally. Internally a component might look like:

```scss
// Inside dnb-badge.scss
.dnb-badge {
  --badge-information-bg: var(--token-color-background-error);
  --badge-information-color: var(--token-color-text-neutral-inverse);
}
```

This internal adoption should have **no functional downsides** when you use a component - the rendered result and public API remain the same. However, be aware of one potential side-effect:

### CSS specificity changes

When a component switches from a hard-coded color value to a `var(--token-*)` reference, the _selector structure_ of the underlying stylesheet may change. If your application overrides component styles with raw selectors, you may need to verify that your overrides still win the specificity contest.

For example, if you previously overrode a component background with:

```css
/* Your override */
.dnb-badge {
  background-color: hotpink;
}
```

And the component internally moves that value to a token-based custom property, the specificity of the internal selector might change. In practice this is rare, but if you notice a visual regression after upgrading it is worth checking.

**Recommendation:** Prefer using the component's own CSS custom properties (e.g. `--badge-information-bg`) for overrides rather than targeting raw CSS properties. This avoids specificity conflicts entirely.

## `ondark` tokens

The `ondark` suffix identifies token variants designed for use on dark backgrounds. Eufemia components use these tokens automatically when `surface="dark"` is active — you do not need to select them yourself.

For practical guidance on using `ondark`, `inverse`, and base tokens in your own components, see the [Dark mode guide](/uilib/usage/customisation/theming/design-tokens/dark-mode).

## Tailwind CSS integration

Design tokens are also available in Tailwind-compatible format. See the [CSS Styles](/uilib/usage/customisation/styling#semantic-design-tokens) page for details on using tokens with Tailwind utility classes.

## Token sections

Tokens are organized into sections. Each section covers a specific surface:

| Section    | Prefix                       | Purpose                                  |
| ---------- | ---------------------------- | ---------------------------------------- |
| Background | `--token-color-background-*` | Surfaces, fills, interactive fill states |
| Text       | `--token-color-text-*`       | Readable content, labels, text states    |
| Icon       | `--token-color-icon-*`       | Icon colors                              |
| Stroke     | `--token-color-stroke-*`     | Borders, dividers, outlines, focus rings |
| Decorative | `--token-color-decorative-*` | Advanced decorative use cases            |

See the [Color Tokens](/uilib/usage/customisation/theming/design-tokens/colors/) tab for the full catalog.

## Naming contract


```tsx
render(<Table>
      <thead>
        <Tr>
          <Th>Rule</Th>
          <Th>Current contract</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>Prefix</Td>
          <Td>
            <MDXCode>{tokenNamingPolicy.prefix}</MDXCode>
          </Td>
        </Tr>
        <Tr>
          <Td>Top-level categories</Td>
          <Td>{renderInlineCodeList(tokenNamingPolicy.categories)}</Td>
        </Tr>
        <Tr>
          <Td>Component sections (optional)</Td>
          <Td>
            {renderInlineCodeList(tokenNamingPolicy.componentSections)}
          </Td>
        </Tr>
        <Tr>
          <Td>Semantic Color sections</Td>
          <Td>{renderInlineCodeList(tokenNamingPolicy.colorSections)}</Td>
        </Tr>
        <Tr>
          <Td>Typical Color labels</Td>
          <Td>{renderInlineCodeList(tokenNamingPolicy.givenLabels)}</Td>
        </Tr>
        <Tr>
          <Td>Brand parity</Td>
          <Td>
            Every brand tokens file is expected to declare the same token
            names.
          </Td>
        </Tr>
      </tbody>
    </Table>)
```



Typical examples:

- semantic token: `--token-color-text-neutral`
- semantic state token: `--token-color-background-action-hover-subtle`
- component token: `--token-color-component-button-background-action`

## Source of truth

- The token inventory is generated from the same exported theme token files that produce the CSS output.
- The consumer API is the generated CSS tokens files.
- The color values behind these tokens come from Eufemia Foundation colors and are mapped into semantic and component token layers per theme.
- **Eiendom** currently reuses the UI token source, so the three explicit brand references are **DNB**, **Sbanken** and **Carnegie**.
