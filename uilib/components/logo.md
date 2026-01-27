---
title: 'Logo'
description: 'A ready to use Logo component with the needed SVGs.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.832Z
checksum: fe25a5898eabf812128ff8ca3e67a7c0258c549542d8de06bdb3577af6a64a10
---

# Logo

## Import

```tsx
import { Logo } from '@dnb/eufemia'
```

## Description

A ready-to-use Logo component with the needed SVGs.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/logo)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/logo)

## Demos

### Logo that changes based on theme

You can import the SVGs for each brand like this:

```jsx
import {
  DnbDefault,
  SbankenDefault,
  CarnegieDefault,
  EiendomDefault,
} from '@dnb/eufemia/components/Logo'
```

```tsx
function getLogoSvg(themeName) {
  switch (themeName) {
    case 'sbanken':
      return SbankenDefault
    case 'carnegie':
      return CarnegieDefault
    case 'eiendom':
      return EiendomDefault
    default:
      return DnbDefault
  }
}
function MyApp() {
  const { name } = useTheme()
  return (
    <Provider>
      <Card stack>
        <ChangeStyleTheme />
        <Logo height="32" svg={getLogoSvg(name)} />
      </Card>
    </Provider>
  )
}
render(<MyApp />)
```

### Logo with dynamic height

The height will be set based on the inherited `font-size`.

```tsx
render(
  <span
    style={{
      fontSize: '6rem',
    }}
  >
    <Logo />
  </span>
)
```

### Logo with dynamic height

The height will be set based on the parent, inherited `height`.

```tsx
render(
  <span
    style={{
      height: '6rem',
    }}
  >
    <Logo inheritSize />
  </span>
)
```

### Logo with fixed height

```tsx
render(<Logo height="96" />)
```

### Logo and inherit color

The color will be set based on the parent, inherited `color` by using `currentColor`.

```tsx
render(
  <span
    style={{
      color: 'tomato',
    }}
  >
    <Logo height="96" inheritColor />
  </span>
)
```

### Logo with compact variant

You can import the SVG like this:

```jsx
import { SbankenCompact } from '@dnb/eufemia/components/Logo'
```

```tsx
render(<Logo height="96" svg={SbankenCompact} />)
```

```tsx
render(
  <Logo
    height="96"
    svg={CarnegieDefault}
    color="var(--ca-color-burgundy-red)"
  />
)
```

## Properties

```json
{
  "props": {
    "svg": {
      "doc": "Provide a custom SVG to render instead of the built-in logos. Accepts a React SVG component or element. Width, height and color props still apply.",
      "type": ["React.Component", "React.Element"],
      "status": "optional"
    },
    "brand": {
      "doc": "Define which brands logo to show. Defaults to `dnb`.",
      "type": ["dnb", "sbanken"],
      "status": "optional"
    },
    "variant": {
      "doc": "Define the logo variant, if there is more than one variant of a brands logo. Currently the only option other than default is `compact` and `compactHorizontal` variant of the Sbanken logo. Defaults to `default`.",
      "type": ["\"default\"", "\"compact\"", "\"compactHorizontal\""],
      "status": "deprecated"
    },
    "color": {
      "doc": "Define the color of the logo.",
      "type": "string",
      "status": "optional"
    },
    "inheritColor": {
      "doc": "Set to `true` if you do not want to inherit the color by `currentColor`. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "inheritSize": {
      "doc": "Set to `true` if you want to inherit the size of the parent. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "width": {
      "doc": "Define the width of the logo.",
      "type": "string",
      "status": "optional"
    },
    "height": {
      "doc": "Define the height of the logo.",
      "type": "string",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```
