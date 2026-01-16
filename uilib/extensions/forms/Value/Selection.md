---
title: 'Selection'
description: '`Value.Selection` is a component for displaying a string value based on a user selection.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/Selection/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Selection />)
```

## Description

`Value.Selection` is a component for displaying a string value based on a user selection.

There is a corresponding [Field.Selection](/uilib/extensions/forms/base-fields/Selection) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Selection />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/Selection)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/Selection)

## Demos

### Placeholder

```tsx
render(<Value.Selection placeholder="No value selected" />)
```

### Value

```tsx
render(<Value.Selection value="Bar" />)
```

### Label

```tsx
render(<Value.Selection label="Label text" showEmpty />)
```

### Label and value

```tsx
render(<Value.Selection label="Label text" value="Foo" />)
```

### Inline

```tsx
render(
  <P>
    This is before the component <Value.Selection value="Baz" inline />{' '}
    This is after the component
  </P>,
)
```

### Field.Selection with path

When using the same `path` as on a `Field.Selection`, the title will be used as the displayed value.

```tsx
render(
  <Form.Handler
    data={{
      selection: 'bar',
      myList: [
        {
          value: 'foo',
          title: 'Foo',
        },
        {
          value: 'bar',
          title: 'Bar',
        },
        {
          value: 'baz',
          title: 'Baz',
        },
      ],
    }}
  >
    <Flex.Stack>
      <Field.Selection
        path="/selection"
        dataPath="/myList"
        variant="radio"
        label="My selection"
      />
      <Value.Selection path="/selection" dataPath="/myList" inheritLabel />
    </Flex.Stack>
  </Form.Handler>,
)
```

### Field.Option and Field.Selection

When using the same `path` as on a `Field.Selection`, the `Field.Option` title will be used as the displayed value.

```tsx
render(
  <Form.Handler>
    <Flex.Stack>
      <Field.Selection
        label="My selection"
        path="/myPath"
        variant="radio"
        value="bar"
      >
        <Field.Option value="foo" title="Foo" />
        <Field.Option value="bar" title="Bar" />
        <Field.Option value="baz" title="Baz" />
      </Field.Selection>

      <Value.Selection label="My selection" path="/myPath" />
    </Flex.Stack>
  </Form.Handler>,
)
```
