---
title: 'Value.ArraySelection'
description: '`Value.ArraySelection` is a wrapper component for displaying string values, with user experience tailored for an array of selected values.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.074Z
checksum: f12df0403993f342663e615901d7bfd301426d2474518338f5240f45e61f8d41
---

# Value.ArraySelection

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.ArraySelection />)
```

## Description

`Value.ArraySelection` is a wrapper component for displaying string values, with user experience tailored for an array of selected values.

Before using this component, ensure there is not a more specific [value component](/uilib/extensions/forms/Value/components/) available that better suits your needs.

There is a corresponding [Field.ArraySelection](/uilib/extensions/forms/base-fields/ArraySelection) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.ArraySelection />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/ArraySelection)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/ArraySelection)

## Demos

### Placeholder

```tsx
render(<Value.ArraySelection placeholder="No value given" />)
```

### Value

```tsx
render(<Value.ArraySelection value={['Foo', 'Bar', 'Baz']} />)
```

### Custom format

```tsx
render(
  <Form.Handler
    locale="en-GB"
    data={{
      myPath: [123, 456, 789],
    }}
  >
    <Value.ArraySelection
      path="/myPath"
      format={{
        type: 'disjunction',
      }}
    />
  </Form.Handler>
)
```

### Label

```tsx
render(<Value.ArraySelection label="Label text" showEmpty />)
```

### Label and value

```tsx
render(
  <Value.ArraySelection label="Label text" value={['Foo', 'Bar', 'Baz']} />
)
```

### Inline

```tsx
render(
  <P>
    This is before the component{' '}
    <Value.ArraySelection value={['Foo', 'Bar', 'Baz']} inline /> This is
    after the component
  </P>
)
```

### List variants

```tsx
render(
  <Value.SummaryList>
    <Value.ArraySelection
      value={['Foo', 'Bar', 'Baz']}
      label="Ordered List"
      variant="ol"
    />
    <Value.ArraySelection
      value={['Foo', 'Bar', 'Baz']}
      label="Unordered List"
      variant="ul"
    />
  </Value.SummaryList>
)
```

### List types

```tsx
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Ordered List a"
  variant="ol"
  listType="a"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Ordered List A"
  variant="ol"
  listType="A"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Ordered List i"
  variant="ol"
  listType="i"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Ordered List I"
  variant="ol"
  listType="I"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Unordered List square"
  variant="ul"
  listType="square"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Unordered List circle"
  variant="ul"
  listType="circle"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Unordered List unstyled"
  variant="ul"
  listType="unstyled"
/>
```

### Field.Option and Field.ArraySelection

When using the same `path` as on a `Field.ArraySelection`, the `Field.Option` title will be used as the displayed value.

```tsx
render(
  <Form.Handler>
    <Flex.Stack>
      <Field.ArraySelection
        label="My selections"
        path="/myPath"
        value={['bar', 'baz']}
      >
        <Field.Option value="foo" title="Foo" />
        <Field.Option value="bar" title="Bar" />
        <Field.Option value="baz" title="Baz" />
      </Field.ArraySelection>

      <Value.ArraySelection inheritLabel path="/myPath" />
    </Flex.Stack>
  </Form.Handler>
)
```

## Properties

### Value-specific properties

```json
{
  "value": {
    "doc": "The value to format. Can be given as `children` instead.",
    "type": ["Array<React.ReactNode>"],
    "status": "optional"
  },
  "children": {
    "doc": "The children to format.",
    "type": "React.ReactNode",
    "status": "optional"
  },
  "format": {
    "doc": "Formatting options for the value when variant is `text`. See the [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat) documentation.",
    "type": "Intl.ListFormatOptions",
    "status": "optional"
  },
  "variant": {
    "doc": "Defines if the value should be displayed in list format (`ol`, `ul`) or regular text format in one line. Defaults to `text`.",
    "type": ["ol", "ul", "text"],
    "status": "optional"
  },
  "listType": {
    "doc": "Defines the type of list styling used for list variants. Used together with variant `ol` and `ul`. Variant `ol`: `a`, `A`, `i`, `I` and `1`. Variant `ul`: `circle`, `disc` and `square`. Defaults to `undefined`.",
    "type": [
      "a",
      "A",
      "i",
      "I",
      "1",
      "circle",
      "disc",
      "square",
      "unstyled",
      "undefined"
    ],
    "status": "optional"
  },
  "inside": {
    "doc": "Defines the position of the marker.",
    "type": "boolean",
    "status": "optional"
  },
  "outside": {
    "doc": "Defines the position of the marker (default).",
    "type": "boolean",
    "status": "optional"
  },
  "nested": {
    "doc": "Will ensure a nested structure of several lists.",
    "type": "boolean",
    "status": "optional"
  },
  "innerRef": {
    "doc": "Send along a custom React Ref.",
    "type": "React.RefObject",
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```

### General properties

<PropertiesTable
  props={ValueProperties}
  valueType="Array<string | number>"
/>
