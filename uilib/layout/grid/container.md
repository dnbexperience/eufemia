---
title: 'Grid Container'
description: '`Grid.Container` is a building block for CSS Grid based layout of contents and components.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.341Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Grid Container

## Import

```tsx
import { Grid } from '@dnb/eufemia'
render(<Grid.Container />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/grid/Container.tsx)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/grid/container/)

## Description

`Grid.Container` is a building block for [CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) based layouts.

Use [Grid.Item](/uilib/layout/grid/item) for you inner wrappers so you can apply a `span` to them.

```jsx
import { Grid } from '@dnb/eufemia'

render(
  <Grid.Container>
    <Grid.Item span={[1, 6]}>Item A</Grid.Item>
    <Grid.Item span={[7, 12]}>Item B</Grid.Item>
  </Grid.Container>
)
```

The columns do change based on what [breakpoint](/uilib/usage/layout/media-queries/) the browser is in:

- 4 columns when `small`
- 6 columns when `medium`
- 12 columns when `large`

```tsx
render(
  <Grid.Container>
    <Grid.Item span={[1, 6]}>uses 50% in width</Grid.Item>
    <Grid.Item span={[7, 12]}>uses 50% in width</Grid.Item>
  </Grid.Container>
)
```

### Gap

By default is no gap given.

## Demos

### Responsive grid usage

```tsx
render(
  <Grid.Container rowGap columnGap>
    <Grid.Item
      span={{
        small: [1, 2],
        medium: [1, 3],
        large: [1, 12],
      }}
      style={colors[0]}
      element={TestElement}
    >
      Item A
    </Grid.Item>

    <Grid.Item
      span={{
        small: [3, 4],
        medium: [4, 6],
        large: [1, 4],
      }}
      style={colors[1]}
      element={TestElement}
    >
      Item B
    </Grid.Item>

    <Grid.Item
      span={{
        small: [2, 3],
        medium: [4, 6],
        large: [5, 8],
      }}
      style={colors[2]}
      element={TestElement}
    >
      Item C
    </Grid.Item>

    <Grid.Item
      span={{
        small: [1, 4],
        medium: [4, 6],
        large: [9, 12],
      }}
      style={colors[3]}
      element={TestElement}
    >
      Item D
    </Grid.Item>
  </Grid.Container>
)
```

### Custom columns

When `medium` CSS Grid is disabled by using `false`.

```tsx
render(
  <Grid.Container
    columns={{
      small: 4,
      medium: false,
    }}
    // columns={12} // only 12
    rowGap
    columnGap
  >
    <Grid.Item
      span={{
        small: 'full',
        large: [1, 12],
      }}
      style={colors[0]}
      element={TestElement}
    >
      Item A
    </Grid.Item>

    <Grid.Item
      span={{
        small: [1, 'end'],
        large: [1, 6],
      }}
      style={colors[1]}
      element={TestElement}
    >
      Item B
    </Grid.Item>

    <Grid.Item
      span={{
        small: [1, 2],
        large: [7, 'end'],
      }}
      style={colors[2]}
      element={TestElement}
    >
      Item C
    </Grid.Item>

    <Grid.Item
      span={{
        small: [3, 4],
        large: 'full',
      }}
      style={colors[3]}
      element={TestElement}
    >
      Item D
    </Grid.Item>
  </Grid.Container>
)
```

## Properties

```json
{
  "props": {
    "columns": {
      "doc": "Define how many columns your layout should be divided in. Can be just a number `columns={12}` or an object with media query sizes like `columns={{ small: 4, medium: 6, large: 12 }}` (default values). You can also disabled CSS Grid by providing `false` for one size, like so `columns={{ small: 4, medium: false, large: 12 }}`.",
      "type": ["number", "object"],
      "status": "optional"
    },
    "rowGap": {
      "doc": "Defines how much the gap between rows should be. Can be `large`, `medium`, `small`, `x-small` or `false` for no gap. Defaults to `false`.",
      "type": ["string", "false"],
      "status": "optional"
    },
    "columnGap": {
      "doc": "Defines how much the gap between columns should be. Can be `large`, `medium`, `small`, `x-small` or `false` for no gap. Defaults to `false`.",
      "type": ["string", "false"],
      "status": "optional"
    },
    "element": {
      "doc": "Define the type of element. Defaults to `div`.",
      "type": ["string", "React.Element"],
      "status": "optional"
    }
  }
}
```
