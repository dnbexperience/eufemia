---
title: 'Flex Container'
description: '`Flex.Container` is a building block for CSS Grid based layouts.'
metadata: https://eufemia.dnb.no/uilib/layout/flex/container/metadata.json
---

## Import

```tsx
import { Flex } from '@dnb/eufemia'
render(<Flex.Container />)
```

## Description

`Flex.Container` is a building block for [CSS flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout) based layout of contents and components.

**NB:** For form layouts, use [Flex.Stack](/uilib/layout/flex/stack/) instead.

You can also use [Flex.Item](/uilib/layout/flex/item) or [Card](/uilib/components/card) for you inner wrappers:

```jsx
import { Flex, Card } from '@dnb/eufemia'

render(
  <Flex.Container>
    <Flex.Item>content</Flex.Item>
    <Card>content</Card>
  </Flex.Container>,
)
```

But you can use it with what ever element too. It will wrap it in an `Flex.Item` to ensure the spacing is applied:

```jsx
import { Flex } from '@dnb/eufemia'

render(
  <Flex.Container>
    <div>content</div>
    <div>content</div>
  </Flex.Container>,
)
```

During render, the items within the "Wrapper" container are wrapped with the same properties. This ensures that all the items have the same appearance.

### Horizontal and Vertical aliases

For shortening the usage of `direction="..."`, you can use:

- `<Flex.Vertical>` instead of `<Flex.Container direction="vertical">`

```jsx
<Flex.Vertical>
  <Flex.Item>part of vertical alignment</Flex.Item>
  <Flex.Item>part of vertical alignment</Flex.Item>
</Flex.Vertical>
```

- `<Flex.Horizontal>` instead of `<Flex.Container direction="horizontal">`

```jsx
<Flex.Horizontal>
  <Flex.Item>part of horizontal alignment</Flex.Item>
  <Flex.Item>part of horizontal alignment</Flex.Item>
</Flex.Horizontal>
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/flex/Container.tsx)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/flex/container/)

## Limitations

The `Flex.Container` will iterate over its childrenToReact, but not the children of the children

**NB:** This examples showcases the limitation:

```tsx
import { Flex, Card } from '@dnb/eufemia'

// The Cards will not get the spacing applied
const MyItem = () => (
  <>
    <Card>content</Card>
    <Card>content</Card>
  </>
)

const MyContainer = () => (
  <Flex.Container>
    <MyItem />
  </Flex.Container>
)
```

## How spacing is applied

Nested components should preferably support [spacing properties](/uilib/layout/space/).

When a element or component was given, that does not support spacing, it will still work out of the box as it gets wrapped in a spacing block.

You may else wrap your custom component in a `Flex.Item` – this way, you still can change the spacing per component basis.

Technically, `Flex.Container` checks if a nested component has a property called `_supportsSpacingProps`. So if you have a component that supports the [spacing properties](/uilib/layout/space/), you can add this property `ComponentName._supportsSpacingProps = true`. If you provide `false`, it will not support spacing.

If the component is a wrapper component, and you want its children to support spacing, you can add this property `ComponentName._supportsSpacingProps = 'children'`.

But for simplicity, you can use the HOC `Flex.withChildren`:

```tsx
const Wrapper = Flex.withChildren(({ children }) => {
  return <div>{children}</div>
})

render(
  <Flex.Container direction="vertical">
    <Item />
    <Wrapper>
      <Item />
      <Item />
    </Wrapper>
    <Item />
  </Flex.Container>,
)
```

## Demos

### No properties

```tsx
render(
  <Flex.Container>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
  </Flex.Container>,
)
```

### Horizontal Flex.Item

```tsx
render(
  <Flex.Container>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
  </Flex.Container>,
)
```

### Horizontal Flex.Item, `justify="center"`

```tsx
render(
  <Flex.Container justify="center">
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
  </Flex.Container>,
)
```

### Horizontal Flex.Item, `justify="flex-end"`

```tsx
render(
  <Flex.Container justify="flex-end">
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
  </Flex.Container>,
)
```

### Horizontal with `size` and `grow`

```tsx
render(
  <Flex.Horizontal>
    <Flex.Item size={3}>
      <Card>Card contents</Card>
    </Flex.Item>
    <Flex.Item size={4}>
      <Card>Card contents</Card>
    </Flex.Item>
    <Flex.Item size={5}>
      <Card>Card contents</Card>
    </Flex.Item>
    <Flex.Item grow>
      <Card>Card contents</Card>
    </Flex.Item>
    <Flex.Item grow>
      <Card>Card contents</Card>
    </Flex.Item>
    <Flex.Item grow>
      <Card>Card contents</Card>
    </Flex.Item>
  </Flex.Horizontal>,
)
```

### Horizontal Field.String

Will wrap on small screens.

```tsx
render(
  <Flex.Container>
    <Field.String label="Label" value="Foo" width="medium" />
    <Field.String label="Label" value="Foo" width="small" />
  </Flex.Container>,
)
```

### Vertical Flex.Item

```tsx
render(
  <Flex.Container direction="vertical">
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
    <Flex.Item>
      <TestElement>FlexItem</TestElement>
    </Flex.Item>
  </Flex.Container>,
)
```

### Vertical aligned Card

```tsx
render(
  <Flex.Container direction="vertical">
    <Card>Card contents</Card>
    <Card>Card contents</Card>
    <Card>Card contents</Card>
  </Flex.Container>,
)
```

### Vertical line divider

```tsx
render(
  <Flex.Container direction="vertical" divider="line" alignSelf="stretch">
    <TestElement>FlexItem</TestElement>
    <TestElement>FlexItem</TestElement>
    <TestElement>FlexItem</TestElement>
  </Flex.Container>,
)
```

### Framed line dividers

This example shows how to use the `Flex.Container` component to create a framed line divider (`line-framed`), which includes a line before the first item and above the last item.

```tsx
const Item = () => (
  <Flex.Stack divider="line-framed" gap="x-small">
    <TestElement>FlexItem</TestElement>
    <TestElement>FlexItem</TestElement>
  </Flex.Stack>
)
render(
  <Flex.Horizontal rowGap={false}>
    <Item />
    <Item />
    <Item />
  </Flex.Horizontal>,
)
```

### Flex.withChildren

```tsx
const Wrapper = Flex.withChildren(({ children }) => {
  return <div>{children}</div>
})
render(
  <Flex.Container direction="vertical">
    <TestElement>FlexItem 1</TestElement>
    <Wrapper>
      <TestElement>FlexItem 2</TestElement>
      <TestElement>FlexItem 3</TestElement>
    </Wrapper>
    <TestElement>FlexItem 4</TestElement>
  </Flex.Container>,
)
```
