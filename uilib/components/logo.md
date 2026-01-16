---
title: 'Logo'
description: 'A ready to use Logo component with the needed SVGs.'
metadata: https://eufemia.dnb.no/uilib/components/logo/metadata.json
---

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
  </span>,
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
  </span>,
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
  </span>,
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
  />,
)
```
