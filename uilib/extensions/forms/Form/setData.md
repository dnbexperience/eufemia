---
title: 'Form.setData'
description: '`Form.setData` lets you set or modify your form data outside of the form context.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.963Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Form.setData

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.setData
```

## Description

With the `Form.setData` method, you can manage your form data outside of the form itself. This is beneficial when you need to utilize the form data in other places within your application:

Related helpers:

- [Form.getData](/uilib/extensions/forms/Form/getData/)
- [Form.useData](/uilib/extensions/forms/Form/useData/)

## Replace the whole data set

When a value is given to the `setData` function, the whole data set will be replaced.

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

Form.setData('unique', { foo: 'bar' })

function MyForm() {
  return (
    <Form.Handler id={myFormId}>
      <Field.String path="/foo" />
    </Form.Handler>
  )
}
```

## Update a single value

You can use the `update` function to update the data.

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference
const { update } = Form.setData(myFormId)

function MyForm() {
  return (
    <Form.Handler id={myFormId}>
      <Field.Number path="/foo" defaultValue={0} />
    </Form.Handler>
  )
}

// Call "update" with the path and the new value.
update('/foo', 1)

// Or with a function that gives you the current value, if any.
update('/foo', (value) => {
  if (typeof value === 'number') {
    return value + 1
  }
  return 1
})
```

## Demos

### Set data outside of the form

```tsx
Form.setData('default-id', {
  foo: 'bar',
})
const Component = () => {
  return (
    <Form.Handler id="default-id">
      <Field.String path="/foo" />
    </Form.Handler>
  )
}
render(<Component />)
```

### Set data after first render

```tsx
const Component = () => {
  return (
    <Form.Handler id="after-id">
      <Field.String path="/foo" />
    </Form.Handler>
  )
}
Form.setData('after-id', {
  foo: 'bar',
})
render(<Component />)
```

### Using the update function

```tsx
const myFormId = {}
const { update } = Form.setData(myFormId)
const Component = () => {
  return (
    <Form.Card>
      <Form.Handler id={myFormId}>
        <Field.Number path="/foo" defaultValue={1} />
      </Form.Handler>
      <Button
        onClick={() => {
          update('/foo', (count) => count + 1)
        }}
      >
        Update
      </Button>
    </Form.Card>
  )
}
render(<Component />)
```
