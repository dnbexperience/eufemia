---
title: 'useValueProps'
description: 'The `useValueProps` hook standardize handling of the value flow for a single consumer component representing one data point.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.282Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# useValueProps

## Import

```tsx
import { useValueProps } from '@dnb/eufemia/extensions/forms'
// Use useValueProps
```

## Description

The `useValueProps` hook standardize handling of the value flow for a single consumer component representing one data point.

It also provides a way to transform the value.

This hook works perfectly together with [ValueBlock](/uilib/extensions/forms/create-component/ValueBlock/).

## How to use

```tsx
import { useValueProps } from '@dnb/eufemia/extensions/forms'

const MyValueComponent = (props) => {
  const { value, ...rest } = useValueProps(props)
  return <ValueBlock {...rest}>{value}</ValueBlock>
}

render(<MyValueComponent path="/dataSelector" />)
```

### Internal Properties

All properties are optional and can be used as needed. These properties can be provided as part of your component properties.

- `value` the input value (string).
- `emptyValue` defines what value is considered to be empty. Defaults to `undefined`. But an empty string will also be validated when required is true.
- `path` the JSON pointer that defines the entry name/key in the data structure.
- `itemPath` similar to `path`, but is used when run inside the [Iterate](/uilib/extensions/forms/Iterate/) context.

### Return Parameters

It returns all of the given component properties, in addition to these:

- `value` the output value.

### Value transformers

The transformers are hooks to transform the value on different stages.

They should return a transformed value: `(value) => value`

- `toInput` transforms the value before it is returned. This applies whether the original source of the value is the value property or the data context.

- `fromExternal` transforms the provided `value` property before any other operations are performed.

In addition there are **value transformers** which should be used outside of the value component (by the value consumer):

- `transformIn` transforms the `value` before it's displayed in the value component.

## Demos

```tsx
const MyValueComponent = (props) => {
  const preparedProps = {
    label: 'Default Label',
    ...props,
    toInput: (value) => value + 10,
  }
  const { value, ...rest } = useValueProps(preparedProps)
  return (
    <ValueBlock {...rest}>
      {format(value, {
        currency: true,
      })}{' '}
      kroner
    </ValueBlock>
  )
}
render(
  <Form.Handler
    data={{
      myValue: 10,
    }}
  >
    <MyValueComponent
      label="Amount"
      path="/myValue"
      transformIn={(value) => value * 2}
    />
  </Form.Handler>
)
```
