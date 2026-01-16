---
title: 'Number'
description: '`Value.Number` is a base component for displaying values of the type `number`.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/Number/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Number />)
```

## Description

`Value.Number` is a base component for displaying values of the type `number`.

There is a corresponding [Field.Number](/uilib/extensions/forms/base-fields/Number) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Number />)
```

It inherits all the properties from the [NumberFormat](/uilib/components/number-format/) component. All snake_case properties are converted to camelCase.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/Number)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/Number)

## Demos

### Label and value

```tsx
render(<Value.Number label="Label text" value={12345678} />)
```

### Value from path

```tsx
render(
  <Form.Handler
    data={{
      myNumber: 12345678,
    }}
  >
    <Value.Number
      label="Label text"
      currency
      currencyDisplay="code"
      currencyPosition="before"
      path="/myNumber"
    />
  </Form.Handler>,
)
```

### Label only

```tsx
render(<Value.Number label="Label text" showEmpty />)
```

### Placeholder

```tsx
render(<Value.Number placeholder="The number was not filled in" />)
```

### Inline

```tsx
render(
  <P>
    This is before the component <Value.Number value={123} inline /> This
    is after the component
  </P>,
)
```
