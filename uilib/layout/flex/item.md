---
title: 'Flex Item'
description: '`Flex.Item` is a building block for flexbox based layout of contents and components.'
metadata: https://eufemia.dnb.no/uilib/layout/flex/item/metadata.json
---

## Import

```tsx
import { Flex } from '@dnb/eufemia'
render(<Flex.Item />)
```

## Description

`Flex.Item` is a building block for [CSS flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout) based layout of contents and components. Should be used in combination with [Flex.Container](/uilib/layout/flex/container/).

```jsx
import { Flex } from '@dnb/eufemia'

render(
  <Flex.Container>
    <Flex.Item>content</Flex.Item>
  </Flex.Container>,
)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/flex/Item.tsx)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/flex/item/)

### Size adjustment

You can provide a `size` property with a number from 1 to 12 (can be changed in [Flex.Container](/uilib/layout/flex/container/) with the `sizeCount` property).

The number will be used to set the item size (a part of the container). It set a percentage unit and apply it on the item via CSS. When the container is tilled to 100%, the remaining items will wrap to a new row.

The number 6 results in 50%, while 12 results in 100%.

```tsx
render(
  <Flex.Container>
    <Flex.Item size={6}>uses 50% in width</Flex.Item>
    <Flex.Item size={6}>uses 50% in width</Flex.Item>
  </Flex.Container>,
)
```

### Responsive size

You can also make sizes respond to media queries.

For doing so, provide a `size` property with an object containing [Media Query](/uilib/usage/layout/media-queries/) types. Each media size should contain number, like mentioned above.

```tsx
render(
  <Flex.Container>
    <Flex.Item
      size={{
        small: 12,
        large: 6,
      }}
    >
      uses 50% or 100% based on the screen size
    </Flex.Item>
    <Flex.Item
      size={{
        small: 12,
        large: 6,
      }}
    >
      uses 50% or 100% based on the screen size
    </Flex.Item>
  </Flex.Container>,
)
```

You need to ensure that `flex-wrap: wrap` is set, so the remaining items wrap to a new row when needed. This is enabled by default in the [Flex.Container](/uilib/layout/flex/container/).

## Demos

```tsx
render(
  <Flex.Container>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
  </Flex.Container>,
)
```

### Basic `size` usage

With the default `sizeCount` of 12 parts.

<Examples.BasicSizeExample />

## Advanced `size` usage

The following example has a customized amount of 4 parts (`sizeCount`) as well as custom breakpoints and media queries.

<Examples.AdvancedSizeExample />
