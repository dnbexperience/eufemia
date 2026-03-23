---
title: 'Form.useSubmit'
description: '`Form.useSubmit` lets you trigger form submit from outside the form element, e.g. when the submit button is in a modal footer or toolbar.'
version: 10.101.1
generatedAt: 2026-03-23T05:53:40.653Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Form.useSubmit

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.useSubmit
```

## Description

The `Form.useSubmit` hook lets you trigger form submit from a component that is **outside** [Form.Handler](/uilib/extensions/forms/Form/Handler/). Give `Form.Handler` an `id` and pass the same `id` to `Form.useSubmit(id)`. This is useful when the submit button is placed in a modal footer, drawer, toolbar, or another part of the layout.

The hook returns an object with a `submit` function. Calling `submit()` runs validation and, if valid, calls the form's `onSubmit` handler – the same flow as when using [Form.SubmitButton](/uilib/extensions/forms/Form/SubmitButton/) inside the form.

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

const formId = 'my-form'

function ExternalSubmitButton() {
  const { submit } = Form.useSubmit(formId)
  return (
    <button type="button" onClick={() => submit()}>
      Submit
    </button>
  )
}

function MyForm() {
  return (
    <>
      <Form.Handler id={formId} onSubmit={handleSubmit}>
        <Field.Name.First path="/name" />
      </Form.Handler>
      <ExternalSubmitButton />
    </>
  )
}
```

**Note:** The hook must be used either inside a [Form.Handler](/uilib/extensions/forms/Form/Handler/) or called with an `id` that matches a Form.Handler on the page. It throws if no handler with that `id` is found.

## API

- `submit(): Promise<EventStateObject | undefined>` – Triggers form submit (validation + `onSubmit`). Returns a Promise that resolves with the `onSubmit` result, or `undefined` if validation fails or `onSubmit` returns nothing.

## Demos

### Submit button outside the form

The submit button is rendered outside `Form.Handler` and uses `Form.useSubmit()` to trigger submit. Validation and `onSubmit` run as when using [Form.SubmitButton](/uilib/extensions/forms/Form/SubmitButton/) inside the form.

```tsx
const formId = 'my-form'
const ExternalSubmitButton = () => {
  const { submit } = Form.useSubmit(formId)
  return (
    <Button onClick={() => submit()}>Submit (outside Form.Handler)</Button>
  )
}
render(
  <Flex.Stack>
    <Form.Handler
      id={formId}
      onSubmit={(data) => {
        console.log('Submitted:', data)
      }}
    >
      <Form.Card>
        <Field.Name.First path="/name" value="John" />
      </Form.Card>
    </Form.Handler>

    <ExternalSubmitButton />
  </Flex.Stack>
)
```

### Async submit

The `submit()` function returns a Promise. You can await it to show loading state or react to the result or errors:

```tsx
const formId = 'my-form-async'
const ExternalSubmitButton = () => {
  const { submit } = Form.useSubmit(formId)
  const [loading, setLoading] = React.useState(false)
  const handleClick = async () => {
    setLoading(true)
    try {
      const result = await submit()
      console.log('Submit result:', result)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading ? 'Submitting…' : 'Submit'}
    </Button>
  )
}
render(
  <Flex.Stack>
    <Form.Handler
      id={formId}
      onSubmit={async (data) => {
        await new Promise((r) => setTimeout(r, 1000))
        console.log('Submitted:', data)
      }}
    >
      <Form.Card>
        <Field.Name.First path="/name" value="John" />
      </Form.Card>
    </Form.Handler>
    <ExternalSubmitButton />
  </Flex.Stack>
)
```
