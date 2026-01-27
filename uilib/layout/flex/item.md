---
title: 'Flex Item'
description: '`Flex.Item` is a building block for flexbox based layout of contents and components.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.334Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Flex Item

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
  </Flex.Container>
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
  </Flex.Container>
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
  </Flex.Container>
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
  </Flex.Container>
)
```

### Basic `size` usage

With the default `sizeCount` of 12 parts.

<Examples.BasicSizeExample />

## Advanced `size` usage

The following example has a customized amount of 4 parts (`sizeCount`) as well as custom breakpoints and media queries.

<Examples.AdvancedSizeExample />

## Properties

```json
{
  "props": {
    "grow": {
      "doc": "True to expand in width/height when there is more space available. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "shrink": {
      "doc": "True to shrink in width/height when there is not enough space available for all components within the container. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "size": {
      "doc": "To set the size (parts) in percentage with numbers from 1 to 12 (`sizeCount`). You can also provide [Media Query](/uilib/usage/layout/media-queries/) types in an object. You can also use the value `auto` to disable it on a specific screen size. Wrap your Flex.Items inside a [Flex.Container](/uilib/layout/flex/container).",
      "type": ["number", "object"],
      "status": "optional"
    },
    "element": {
      "doc": "Define the type of element. Defaults to `div`.",
      "type": ["string", "React.Element"],
      "status": "optional"
    },
    "innerRef": {
      "doc": "Provide a React.Ref to accessing the inner HTML element.",
      "type": "React.Ref",
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
