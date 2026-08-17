---
title: 'Flex.Container'
description: '`Flex.Container` is a building block for CSS Grid based layouts.'
version: 11.10.1
generatedAt: 2026-08-17T08:59:39.604Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Flex.Container

## Import

```tsx
import { Flex } from '@dnb/eufemia'
render(<Flex.Container />)
```

## Description

`Flex.Container` is a building block for [CSS flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout) based layout of contents and components.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/flex/Container.tsx)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/flex/container)

**NB:** For form layouts, use [Flex.Stack](/uilib/layout/flex/stack/) instead.

You can also use [Flex.Item](/uilib/layout/flex/item) or [Card](/uilib/components/card) for you inner wrappers:

```jsx
import { Flex, Card } from '@dnb/eufemia'

render(
  <Flex.Container>
    <Flex.Item>content</Flex.Item>
    <Card>content</Card>
  </Flex.Container>
)
```

But you can use it with what ever element too. It will wrap it in an `Flex.Item` to ensure the spacing is applied:

```jsx
import { Flex } from '@dnb/eufemia'

render(
  <Flex.Container>
    <div>content</div>
    <div>content</div>
  </Flex.Container>
)
```

During render, the items within the "Wrapper" container are wrapped with the same properties. This ensures that all the items have the same appearance.

### Align vs Justify

`Flex.Container` has two props for positioning its children: `justify` and `align`. These map directly to CSS flexbox properties and their effect depends on the `direction` of the container:

- **`justify`** controls placement along the **main axis** (CSS `justify-content`).
- **`align`** controls alignment along the **cross axis** (CSS `align-items`).

In practice, this means:

|                         | `Flex.Horizontal`  | `Flex.Vertical`    |
| ----------------------- | ------------------ | ------------------ |
| **Center horizontally** | `justify="center"` | `align="center"`   |
| **Center vertically**   | `align="center"`   | `justify="center"` |

The main axis follows the direction: horizontal for `Flex.Horizontal`, vertical for `Flex.Vertical`. The cross axis is always perpendicular.

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

## How spacing is applied

`Flex.Container` keeps the existing spacing behavior by default. This preserves layouts that depend on spacing props, generated `Space` wrappers, or `_supportsSpacingProps`.

Set `layoutEngine="css"` to use native CSS flex gaps. In CSS mode, React children are rendered unchanged, so intrinsic elements and custom components participate automatically through their rendered DOM roots.

```tsx
const MyItem = () => (
  <>
    <Card>content</Card>
    <Card>content</Card>
  </>
)

render(
  <Flex.Container direction="vertical" layoutEngine="css">
    <MyItem />
  </Flex.Container>
)
```

Fragments and providers that render no DOM are transparent. In the example above, both Cards become flex items and receive the container gap.

Components that support [spacing properties](/uilib/layout/space/) expose their requested spacing on the rendered root. An explicit start spacing overrides the previous item's end spacing for that pair. The first item's start and last item's end remain outer margins.

Ordinary custom components do not need a marker or wrapper to receive the container gap. Use `Flex.Item` when you need an explicit layout item, span sizing, or spacing props around a component that does not expose spacing on its own root.

### Divider accessibility

In CSS mode, `divider="line"` and `divider="line-framed"` are painted visual lines. Unlike the legacy engine, they do not render `<hr>` elements and therefore do not add separator roles to the accessibility tree. If the separation is meaningful rather than decorative, render explicit `Hr` elements instead of relying on the `divider` property.

## Backwards compatibility

The existing React child-inspection engine remains the default, so applications do not need to annotate every established layout:

```tsx
<Flex.Container>...</Flex.Container>
```

Use `layoutEngine="css"` when migrating a layout to native gaps. The explicit `layoutEngine="legacy"` value is still supported when an integration needs to document that dependency.


## Demos

### No properties


```tsx
render(<Flex.Container>
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
      </Flex.Container>)
```


### Horizontal Flex.Item


```tsx
render(<Flex.Container>
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
      </Flex.Container>)
```


### Horizontal Flex.Item, `justify="center"`


```tsx
render(<Flex.Container justify="center">
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
      </Flex.Container>)
```


### Horizontal Flex.Item, `justify="flex-end"`


```tsx
render(<Flex.Container justify="flex-end">
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
      </Flex.Container>)
```


### Horizontal Flex.Item, `align="center"`

Centers items vertically inside a horizontal container.


```tsx
render(<Flex.Container align="center">
        <Flex.Item>
          <TestElement style={{
      height: '4rem'
    }}>Tall</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>Short</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement style={{
      height: '6rem'
    }}>Taller</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>Short</TestElement>
        </Flex.Item>
      </Flex.Container>)
```


### Vertical Flex.Item, `align="center"`

Centers items horizontally inside a vertical container.


```tsx
render(<Flex.Container direction="vertical" align="center">
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>Wider FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
      </Flex.Container>)
```


### Horizontal with `size` and `grow`


```tsx
render(<Flex.Horizontal>
        <Flex.Item span={3}>
          <Card>Card contents</Card>
        </Flex.Item>
        <Flex.Item span={4}>
          <Card>Card contents</Card>
        </Flex.Item>
        <Flex.Item span={5}>
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
      </Flex.Horizontal>)
```


### Horizontal Field.String

Will wrap on small screens.


```tsx
render(<Flex.Container>
        <Field.String label="Label" value="Foo" width="medium" />
        <Field.String label="Label" value="Foo" width="small" />
      </Flex.Container>)
```


### Vertical Flex.Item


```tsx
render(<Flex.Container direction="vertical">
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
      </Flex.Container>)
```


### Vertical aligned Card


```tsx
render(<Flex.Container direction="vertical">
        <Card>Card contents</Card>
        <Card>Card contents</Card>
        <Card>Card contents</Card>
      </Flex.Container>)
```


### Vertical line divider


```tsx
render(<Flex.Container direction="vertical" divider="line" alignSelf="stretch">
        <TestElement>FlexItem</TestElement>
        <TestElement>FlexItem</TestElement>
        <TestElement>FlexItem</TestElement>
      </Flex.Container>)
```



```tsx
render(<div className="dnb-no-focus">
      <CssAdditiveSpacingGeometry />
      <CssPairwiseSpacingContract />
      <CssDividerParity />
      <CssHorizontalDividerAlignment />
      <CssSpanGeometry />
      <CssHiddenGapGeometry />
      <CssWrapperGeometry />
      <CssItemGapOverrideGeometry />
    </div>)
```


### Framed line dividers

This example shows how to use the `Flex.Container` component to create a framed line divider (`line-framed`), which includes a line before the first item and above the last item.


```tsx
const Item = () => <Flex.Stack divider="line-framed" gap="x-small">
            <TestElement>FlexItem</TestElement>
            <TestElement>FlexItem</TestElement>
          </Flex.Stack>;
render(<Flex.Horizontal rowGap={false}>
            <Item />
            <Item />
            <Item />
          </Flex.Horizontal>);
```


### Deprecated Flex.withChildren compatibility example

`Flex.withChildren` is a temporary compatibility adapter for wrapper components that relied on the legacy child-inspection engine. Do not use it for new integrations.


```tsx
const Wrapper = Flex.withChildren(({
  children
}) => {
  return <div>{children}</div>;
});
render(<Flex.Container direction="vertical">
            <TestElement>FlexItem 1</TestElement>
            <Wrapper>
              <TestElement>FlexItem 2</TestElement>
              <TestElement>FlexItem 3</TestElement>
            </Wrapper>
            <TestElement>FlexItem 4</TestElement>
          </Flex.Container>);
```

## Properties


```json
{
  "props": {
    "direction": {
      "doc": "Direction of sub components. Can be: `horizontal` or `vertical`.",
      "type": [
        "'horizontal'",
        "'vertical'"
      ],
      "defaultValue": "'horizontal'",
      "status": "optional"
    },
    "layoutEngine": {
      "doc": "Select the Flex layout engine. The legacy engine remains the default for backwards compatibility. Use `css` to opt in to native CSS gaps without changing existing layouts.",
      "type": [
        "'css'",
        "'legacy'"
      ],
      "defaultValue": "'legacy'",
      "status": "optional"
    },
    "wrap": {
      "doc": "Define if we should wrap contents if there is not enough space.",
      "type": "boolean",
      "defaultValue": "true",
      "status": "optional"
    },
    "justify": {
      "doc": "Distribute sub components along the main axis (CSS `justify-content`). In horizontal direction, this controls left-to-right placement. In vertical direction, this controls top-to-bottom placement.",
      "type": [
        "'flex-start'",
        "'flex-end'",
        "'center'",
        "'space-between'",
        "'space-around'",
        "'space-evenly'"
      ],
      "defaultValue": "'flex-start'",
      "status": "optional"
    },
    "align": {
      "doc": "Align sub components along the cross axis (CSS `align-items`). In horizontal direction, this controls vertical alignment. In vertical direction, this controls horizontal alignment.",
      "type": [
        "'flex-start'",
        "'flex-end'",
        "'center'",
        "'stretch'",
        "'baseline'"
      ],
      "defaultValue": "'flex-start'",
      "status": "optional"
    },
    "divider": {
      "doc": "How to separate sub components.",
      "type": [
        "'space'",
        "'line'",
        "'line-framed'"
      ],
      "defaultValue": "'space'",
      "status": "optional"
    },
    "sizeCount": {
      "doc": "Define how many parts your layout should be divided in. Should be used in combination with a [Flex.Item](/uilib/layout/flex/item).",
      "type": "number",
      "defaultValue": "12",
      "status": "optional"
    },
    "gap": {
      "doc": "How much space between child items. Use `false` for no spacing. If in vertical layout: if both `rowGap` and `gap` is set, `rowGap` will be used.",
      "type": [
        "'xx-small'",
        "'x-small'",
        "'small'",
        "'medium'",
        "'large'",
        "'x-large'",
        "'xx-large'",
        "false"
      ],
      "defaultValue": "'small'",
      "status": "optional"
    },
    "rowGap": {
      "doc": "How much space between rows. Use `false` for no row gap. If in vertical layout: if both `rowGap` and `gap` is set, `rowGap` will be used.",
      "type": [
        "'xx-small'",
        "'x-small'",
        "'small'",
        "'medium'",
        "'large'",
        "'x-large'",
        "'xx-large'",
        "false"
      ],
      "defaultValue": "'small'",
      "status": "optional"
    },
    "element": {
      "doc": "Define the type of element.",
      "type": [
        "string",
        "React.Element"
      ],
      "defaultValue": "'div'",
      "status": "optional"
    },
    "ref": {
      "doc": "Provide a React.Ref to access the inner HTML element.",
      "type": "React.RefObject",
      "defaultValue": "undefined",
      "status": "optional"
    },
    "wrapChildrenInSpace": {
      "doc": "Deprecated. Controls intrinsic-element wrapping only when `layoutEngine=\"legacy\"` is used.",
      "type": "boolean",
      "defaultValue": "true",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": "Various",
      "status": "optional"
    }
  },
  "showDefaultValue": true
}
```
