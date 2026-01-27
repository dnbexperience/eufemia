---
title: 'Grid Item'
description: '`Grid.Item` is a building block for CSS Grid based layouts.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.342Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Grid Item

## Import

```tsx
import { Grid } from '@dnb/eufemia'
render(<Grid.Item />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/grid/Item.tsx)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/grid/item/)

## Description

`Grid.Item` is a building block for [CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) based layout of contents and components. Should be used in combination with [Grid.Container](/uilib/layout/grid/container/).

The columns do change based on what [breakpoint](/uilib/usage/layout/media-queries/) the browser is in:

- 4 columns when `small`
- 6 columns when `medium`
- 12 columns when `large`

### Span

You need to provide a `span` property with a number from 1 to 12 (can be changed in [Grid.Container](/uilib/layout/grid/container/) with the `columns` property).

The span will be used to specify where the item is placed in the grid columns.

A span needs always two numbers – from and to.

```tsx
render(
  <Grid.Container>
    <Grid.Item span={[1, 6]}>uses 50% in width</Grid.Item>
    <Grid.Item span={[7, 12]}>uses 50% in width</Grid.Item>
  </Grid.Container>
)
```

Example of spans:

- `span={[1, 'end']}`
- `span={{ small: [1, 4], medium: [1, 6], large: [1, 12]}}`

### Responsive spans

You can also make spans respond to media queries.

For doing so, provide a `span` property with an object containing [Media Query](/uilib/usage/layout/media-queries/) types. Each media size should contain a span, like mentioned above.

```tsx
render(
  <Grid.Container>
    <Grid.Item
      span={{
        small: [1, 12],
        large: [1, 6],
      }}
    >
      uses 50% or 100% based on the screen size
    </Grid.Item>
    <Grid.Item
      span={{
        small: [1, 12],
        large: [7, 12],
      }}
    >
      uses 50% or 100% based on the screen size
    </Grid.Item>
  </Grid.Container>
)
```

## Demos

### Responsive `span` usage

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

### Tab order horizontal

In this example, the order changes, so does the tab (key) order.

```tsx
render(
  <Grid.Container rowGap columnGap columns={12}>
    <Grid.Item span={[1, 6]}>
      <Item>Left top</Item>
    </Grid.Item>
    <Grid.Item span={[7, 12]}>
      <Item>Right top</Item>
    </Grid.Item>
    <Grid.Item span={[1, 6]}>
      <Item>Left bottom</Item>
    </Grid.Item>
    <Grid.Item span={[7, 12]}>
      <Item>Right bottom</Item>
    </Grid.Item>
  </Grid.Container>
)
```

### Tab order vertical

In this example, the order changes, so does the tab (key) order.

```tsx
render(
  <Grid.Container rowGap columnGap columns={12}>
    <Grid.Item span={[1, 6]}>
      <Item>Left top</Item>
    </Grid.Item>
    <Grid.Item span={[1, 6]}>
      <Item>Left bottom</Item>
    </Grid.Item>
    <Grid.Item span={[7, 12]}>
      <Item>Right top</Item>
    </Grid.Item>
    <Grid.Item span={[7, 12]}>
      <Item>Right bottom</Item>
    </Grid.Item>
  </Grid.Container>
)
```

## Properties

```json
{
  "props": {
    "span": {
      "doc": "To place the item on the grid with numbers from 1 to 12 (`columns`). Needs always two values, a so called span (from - to) `span={[1, 6]}`. Accepts also `end` like so `span={[1, \"end\"]}` or `full` like so `span={\"full\"}`. You can also provide [Media Query](/uilib/usage/layout/media-queries/) types in an object like so like so `span={{ small: [1, 4], medium: [1, 6], large: [1, 12]}}`.",
      "type": ["object", "array"],
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
