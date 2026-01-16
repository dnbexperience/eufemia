---
title: 'Grid'
description: 'To make it easier to build responsive application layouts in line with defined design sketches, there are a number of components for layout.'
metadata: https://eufemia.dnb.no/uilib/layout/grid/metadata.json
---

## Import

```tsx
import { Grid } from '@dnb/eufemia'
```

## Description

To make it easier to build responsive application layouts in line with defined design sketches, there are a number of components for layout.

- **[Grid.Container](/uilib/layout/grid/container)** is a layout system for CSS grid based layout of contents.

- **[Grid.Item](/uilib/layout/grid/item)** is a layout system for CSS grid based layout of contents.

```jsx
import { Grid } from '@dnb/eufemia'

render(
  <Grid.Container>
    <Grid.Item span={[1, 6]}>Item A</Grid.Item>
    <Grid.Item span={[7, 12]}>Item B</Grid.Item>
  </Grid.Container>,
)
```

You can find more related information in the [Layout](/uilib/layout) pages.

## Columns

UX designers are using a 12 column system, along with a 4 and 6 column system, during their design processes.

Here is an [example](/uilib/layout/grid/visual-tests/page-layout/) of how to use this Grid component for a page layout.

## Demos

### Responsive Grid.Container

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
  </Grid.Container>,
)
```
