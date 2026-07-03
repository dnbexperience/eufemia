---
title: 'Naming convention'
version: 11.8.2
generatedAt: 2026-07-03T14:37:30.002Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Naming convention

The DNB Design System Eufemia uses the following naming conventions.

**Formatting styles**

- **pascal case** also known as _upper camel case_. Every word upper case. Example: `PascalCase`
- **camel case** also known as _lower camel case_. First word lower case. Example: `camelCase`
- **kebab case** also known as _hyphen case_. Only lower case letters. Example: `kebab-case`
- **snake case**. Only lower case letters. Example: `snake_case`

## React components

- React Components, both as files and as components use **pascal case**.
- The folder containing the component uses **kebab case**.
- Co-located files that belong to a component (such as Context, Provider, Docs, and utility files) use **pascal case** prefixed with the component name. Like: `SliderProvider.tsx`, `InputDocs.ts`, `DatePickerContext.ts`

### Namespace components

Components exported as part of a namespace (e.g. `Field.String`, `Form.Handler`, `Iterate.Array`) use **pascal case** for both folders and files to mirror the public API structure.

## Component prop types

Prop types follow a consistent naming convention using the component name in **pascal case**:

- `XxxProps` – the component's own, individually documented props. This is the type consumers import.
- `XxxAllProps` – the complete set of props the component accepts. It combines `XxxProps` with the shared props the component composes on top, such as `SpacingProps` and forwarded element/HTML attributes. Export it whenever a component adds props beyond its own, and use it as the type of the component function and the `xxxDefaultProps` object.
- `xxxDefaultProps` – the object holding the component's default prop values, named in **camel case**.

```tsx
export type BadgeProps = {
  /* ...individually documented props... */
}

export type BadgeAllProps = BadgeProps &
  SpacingProps &
  Omit<HTMLProps<HTMLElement>, 'content' | 'label'>

export const badgeDefaultProps: BadgeAllProps = {
  variant: 'information',
  // ...
}

function Badge(localProps: BadgeAllProps) {
  /* ... */
}
```

## CSS / SCSS

- CSS classes and the files containing the styles use **kebab case**.
- CSS classes are prefixed with: `dnb-`
- CSS `Custom Properties` (CSS Variables) use **kebab case**.
- SCSS Mixins use **camel case**.

## JavaScript

- `Functions` and `Variables` use **camel case**.
- `Classes` use **pascal case**.
- Other JavaScript files use **kebab case**.

## Events and Properties

- Event names use **camel case**.
- They have to describe what they are aiming to do. Like: `onClick`

## Icons

- Icon names use **snake case**.
- They have to describe what they are meant for. Like: `chevron_right`
- Sizes are added as a postfix. Like: `chevron_right_medium`
- Only alphabetic characters (a to z) and numeric characters (0 to 9) without special chars, due to import statements.
- Figma icon naming has to match the same (icon archive) as they will define the import names.
- Figma page and frame names (icon archive) have to be the same, due to the automated import mechanism.

## Documentation

- `Pages` and directories use **kebab-case**.
- Documentation example files use **pascal case**. Like: `Examples.tsx`
