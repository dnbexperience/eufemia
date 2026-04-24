---
title: 'Logo'
description: 'A ready to use Logo component with the needed SVGs.'
version: 12.0.0
generatedAt: 2026-04-24T07:15:47.256Z
checksum: 6b4cf82375feee3f504831b20288d4cf545f554e46820eb16d84d22bcbeddfba
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

### Importing a logo

To use a logo, the svg must be imported and handed to the `Logo` components through the `svg` property.

```jsx
import {
  DnbDefault,
  CarnegieDefault,
  EiendomDefault,
  SbankenDefault,
  SbankenHorizontal,
  SbankenCompact,
} from '@dnb/eufemia/components/Logo'
```

```tsx
render(
  <Flex.Vertical>
    <Logo height="48" svg={DnbDefault} />
    <Logo height="48" svg={EiendomDefault} />
    <Logo height="48" svg={CarnegieDefault} />
    <Logo height="48" svg={SbankenDefault} />
    <Logo height="48" svg={SbankenHorizontal} />
    <Logo height="48" svg={SbankenCompact} />
  </Flex.Vertical>
)
```

If no svg is provided, the `DnbDefault` logo is used by default:

```tsx
render(<Logo height="96" />)
```

### Change logo based on theme

The `svg` property can also accept a function that returns a logo svg based on the current [theme](/uilib/usage/customisation/theming/theme/) props.

```tsx
import type { ThemeProps } from '@dnb/eufemia/shared/Theme'
```

```tsx
function myLogoSelector(theme: ThemeProps) {
  switch (theme?.name) {
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
  return (
    <Card stack>
      <MyThemeSelector />
      <Logo height="96" svg={myLogoSelector} />
    </Card>
  )
}
render(<MyApp />)
```

### Customization

#### Default inherited height

By default the logo will use the inherited `font-size` to set its height.

```tsx
render(
  <span
    style={{
      fontSize: '6rem',
    }}
  >
    <Logo svg={myLogoSelector} />
  </span>
)
```

#### Alternative inherited height

You can chose to let the height be set by the inherited `height` instead by setting the `inheritSize` property.

```tsx
render(
  <span
    style={{
      height: '6rem',
    }}
  >
    <Logo inheritSize svg={myLogoSelector} />
  </span>
)
```

#### Fixed height and/or width

The logo's `height` and `width` can be fixed depending on your needs.

```tsx
render(
  <Flex.Vertical>
    <Logo height="96" svg={myLogoSelector} />
    <Logo width="96" svg={myLogoSelector} />
  </Flex.Vertical>
)
```

#### Color

You can choose to override the default colors by either inheriting the `currentcolor`, or set it directly.

```tsx
render(
  <Flex.Vertical>
    <span
      style={{
        color: 'tomato',
      }}
    >
      <Logo height="96" inheritColor svg={myLogoSelector} />
    </span>

    <Logo height="96" color="hotpink" svg={myLogoSelector} />
  </Flex.Vertical>
)
```

```tsx
render(
  <P>
    This logo is in the middle <Logo svg={myLogoSelector} /> of some text.
  </P>
)
```

## Properties

```json
{
  "props": {
    "svg": {
      "doc": "Provide a custom SVG to render instead of the built-in logos. Accepts a React SVG component, element, or a function that receives the theme and returns a SVG component. Width, height and color properties still apply. If not provided, defaults to DNB logo. Import SVGs from `@dnb/eufemia/components/Logo` (e.g., `DnbDefault`, `SbankenDefault`, `SbankenCompact`, `SbankenHorizontal`, `CarnegieDefault`, `EiendomDefault`). When using a function, it receives the theme context (useTheme return value) allowing theme-aware logo selection.",
      "type": ["React.Component", "React.Element", "function"],
      "status": "optional"
    },
    "color": {
      "doc": "Define the color of the logo.",
      "type": "string",
      "status": "optional"
    },
    "inheritColor": {
      "doc": "Set to `true` to inherit the color with `currentColor`. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "inheritSize": {
      "doc": "Set to `true` if you want to inherit the `height` of the parent. Defaults to `false`.",
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
