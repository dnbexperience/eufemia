---
title: 'ArraySelection'
description: '`Value.ArraySelection` is a wrapper component for displaying string values, with user experience tailored for an array of selected values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/ArraySelection/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.ArraySelection />)
```

## Description

`Value.ArraySelection` is a wrapper component for displaying string values, with user experience tailored for an array of selected values.

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
  </Form.Handler>,
)
```

### Label

```tsx
render(<Value.ArraySelection label="Label text" showEmpty />)
```

### Label and value

```tsx
render(
  <Value.ArraySelection
    label="Label text"
    value={['Foo', 'Bar', 'Baz']}
  />,
)
```

### Inline

```tsx
render(
  <P>
    This is before the component{' '}
    <Value.ArraySelection value={['Foo', 'Bar', 'Baz']} inline /> This is
    after the component
  </P>,
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
  </Value.SummaryList>,
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
  </Form.Handler>,
)
```
