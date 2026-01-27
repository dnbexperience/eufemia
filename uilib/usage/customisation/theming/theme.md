---
title: 'Theme'
description: 'The Theme component is a helper component that lets you create nested theming solutions.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.366Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Theme

## Description

The Theme component is a helper component that lets you create nested theming solutions.

`<Theme>` will by default create a `div` wrapper, when no custom element is defined (e.g. `element="span"`).

```tsx
import { Theme, useTheme } from '@dnb/eufemia/shared'

const Component = () => {
  const themeName = useTheme()?.name
  return 'My Component'
}

render(
  <Theme name="sbanken">
    <App>
      <MyComponent />
    </App>
  </Theme>
)
```

**NB:** If no context is given, the hook will return `null`.

From CSS you can use it as so:

- `.eufemia-theme__sbanken`
- `.eufemia-theme[data-name="sbanken"]` (alternative)

**CSS**

```css
.eufemia-theme__sbanken .additional-selector {
  --color-sea-green: var(--sb-color-purple-alternative);
}
```

**SCSS**

```scss
:global(.eufemia-theme__sbanken) {
  .additional-selector {
    --color-sea-green: var(--sb-color-purple-alternative);
  }
}
```

### Mapping of properties with `propMapping`

In order to change or map CSS properties, you can make use of the `propMapping` solution.

```tsx
import { Theme, useTheme } from '@dnb/eufemia/shared'

const Component = () => {
  const theme = useTheme()
  const { name, propMapping } = theme || {}
  return 'My Component'
}

render(
  <Theme name="sbanken">
    <App>
      <Theme propMapping="my-class">
        <MyComponent />
      </Theme>
    </App>
  </Theme>
)
```

The main motivation of this feature is to provide a set of maps you can use in your app (if possible). But it lets you create your own sets as well. To do so:

1. Define an area in your app – it could be your component – and give it a declarative name:

```tsx
import { Theme } from '@dnb/eufemia/shared'

render(
  <Theme propMapping="my-maps">
    <MyComponent />
  </Theme>
)
```

2. Define the needed properties:

**CSS**

```css
.eufemia-theme__theme-name.eufemia-theme__prop-mapping--my-maps {
  --color-sea-green: var(--sb-color-purple-alternative);
}
```

**SCSS**

```scss
.eufemia-theme__theme-name.eufemia-theme__prop-mapping--my-maps {
  --color-sea-green: var(--sb-color-purple-alternative);
}
```

### Use your component as the wrapper element

You can provide your component as the wrapper. This way no additional HTML Element will be created.

```tsx
import { Theme } from '@dnb/eufemia/shared'

const Component = ({ className ...props }) => {
  return <div className={className+' more-classes'} {...props} />
}

render(
  <Theme name="theme-name">
    <App>
      <Theme propMapping="my-maps" element={Component}>
        ...
      </Theme>
    </App>
  </Theme>
)
```

### React Hook useTheme

For accessing the theme context, you can use the `useTheme` Hook. It returns the theme context, with an addition of boolean constants like `isSbanken`.

```tsx
import { Theme, useTheme } from '@dnb/eufemia/shared'

const Component = () => {
  // Result: { name: 'sbanken', isUi: false, isSbanken: true, isEiendom: false }
  const theme = useTheme()
  const { name, isUi, isSbanken, isEiendom } = theme || {}
  return null
}

render(
  <Theme name="sbanken">
    <App>
      <MyComponent />
    </App>
  </Theme>
)
```

### Integrations

By using the [gatsby-plugin-eufemia-theme-handler](https://github.com/dnbexperience/gatsby-plugin-eufemia-theme-handler) plugin, your app will get wrapped with this theme component.

### Hide or show parts of your component (filter)

With this helper function you show or hide content based on inherited theme properties.

```tsx
import { Theme, VisibilityByTheme } from '@dnb/eufemia/shared'

render(
  <Theme name="...">
    Only shown in Sbanken theme Only hidden in Eiendom theme Only shown in
    Sbanken or Eiendom theme Only shown in Sbanken or Eiendom theme Only
    shown in Sbanken then or Eiendom theme – that also includes the fictive
    variant="blue".
  </Theme>
)
```

## Demos

<ChangeStyleTheme label="Change the brand:" />

### Basis example

```tsx
render(
  <Theme name="sbanken">
    <Logo size={40} />
  </Theme>
)
```

### Basis example `propMapping`

```tsx
const MyMapping = styled.div`
  .eufemia-theme__sbanken.eufemia-theme__prop-mapping--my-mapping {
    --color-sea-green: var(--sb-color-purple-alternative);
  }
`
const CustomComponent = styled(P)`
  color: var(--color-sea-green);
`
render(
  <MyMapping>
    <Theme name="sbanken">
      <Theme propMapping="my-mapping">
        <CustomComponent>Text with custom color</CustomComponent>
      </Theme>
    </Theme>
  </MyMapping>
)
```

## Properties

```json
{
  "props": {
    "name": {
      "doc": "The name of a branding theme. Can be `ui` (universal identity), `eiendom`, `sbanken` or `carnegie`.",
      "type": ["ui", "eiendom", "sbanken", "carnegie"],
      "status": "optional"
    },
    "size": {
      "doc": "Will define what sizes of components are used (WIP).",
      "type": "basis",
      "status": "optional"
    },
    "variant": {
      "doc": "(WIP).",
      "type": "string",
      "status": "optional"
    },
    "propMapping": {
      "doc": "Defines a specific CSS class so you get a declarative way of mapping CSS properties. A set of predefined maps will be available (WIP).",
      "type": "string",
      "status": "optional"
    },
    "contrastMode": {
      "doc": "When a component supports a contrast style, it will be used instead for the dedicated area.",
      "type": "boolean",
      "status": "optional"
    },
    "darkMode": {
      "doc": "When a component supports a dark mode style, it will be used instead for the dedicated area.",
      "type": "boolean",
      "status": "optional"
    }
  }
}
```
