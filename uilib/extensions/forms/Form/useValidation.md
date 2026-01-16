---
title: 'useValidation'
description: '`Form.useValidation` lets you monitor and modify field status or your form errors outside of the context.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Form/useValidation/metadata.json
---

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.useValidation
```

## Description

The `Form.useValidation` lets you monitor and modify field status or your form errors outside of the context.

## APIs

- `hasErrors(): boolean` - True if any error is present.
- `hasFieldError(path: Path): boolean` - True if the field has an error.
- `setFormError(error: Error | FormError | undefined)` - Report a form error.
- `setFieldStatus(path: Path, status: EventStateObject)` - Show a field error.

The `EventStateObject` is an object that can hold any of the following properties:

```ts
type EventStateObject = {
  error?: Error | FormError | undefined
  warning?: React.ReactNode | undefined
  info?: React.ReactNode | undefined
}
```

## Usage

You can use it in several ways. Like within the context of `Form.Handler`:

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Form.Handler>
      ...
      <Component />
      ...
    </Form.Handler>
  )
}

function Component() {
  const { hasErrors, hasFieldError, setFormError, setFieldStatus } =
    Form.useValidation()

  // True if any error is present
  hasErrors()

  // True if the field has an error
  hasFieldError('/path/to/field')

  // Report a form error
  setFormError(new Error('This is a global form error'))

  // Clear the form error with a undefined value
  setFormError(undefined)

  // Show a field error
  setFieldStatus('/path/to/field', {
    error: new Error('This is a field error'),
    warning: 'This is a field warning',
    info: 'This is a field info',
  })
}
```

Or by linking the hook together with the form by using the `id` (string, function, object or React Context as the reference) property:

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

function MyForm() {
  return (
    <>
      <Form.Handler id={myFormId}>...</Form.Handler>
      <Component />
    </>
  )
}

function Component() {
  const { hasErrors, hasFieldError } = Form.useValidation(myFormId)
}
```

Or by using it in the form component itself:

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

function MyForm() {
  const { hasErrors } = Form.useValidation(myFormId)

  return <Form.Handler id={myFormId}>...</Form.Handler>
}
```

## Report a form error

You can also report a form error that gets displayed on the bottom of the form by using the `Form.useValidation` hook:

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

function MyForm() {
  const { setFormError } = Form.useValidation(myFormId)

  useEffect(() => {
    setFormError('This is a global form error')
  }, [])

  return <Form.Handler id={myFormId}>...</Form.Handler>
}
```

## Field status

You can also use the `setFieldStatus` method to report field status. This will update the field with the status and show it in the form.

```jsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

function Component() {
  const { setFieldStatus } = Form.useValidation(myFormId)

  return (
    <Form.Handler
      id={myFormId}
      onSubmit={async () => {
        // Report a field status
        setFieldStatus('/path/to/field', {
          error: new Error('This is a field error'),
          warning: 'This is a field warning',
          info: 'This is a field info',
        })
      }}
    >
      <Field.String path="/path/to/field" />
    </Form.Handler>
  )
}
```

To remove the field status, you can use `setFieldStatus('/path/to/field', { error: undefined })`.

## Accessibility

The form error is connected with the [Form.Handler](/uilib/extensions/forms/Form/Handler/) itself via `aria-labelledby` for screen reader support.

## Demos

### Set field status

```tsx
const MyForm = () => {
  const { setFieldStatus } = Form.useValidation('form-status')
  return (
    <Form.Handler
      id="form-status"
      onSubmit={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setFieldStatus('/myField', {
          error: new Error('This is a field error'),
          warning: 'This is a field warning',
          info: 'This is a field info',
        })
        await new Promise((resolve) => setTimeout(resolve, 5000))
        setFieldStatus('/myField', {
          error: null,
          warning: null,
          info: null,
        })
      }}
    >
      <Flex.Stack>
        <Field.String label="My field" path="/myField" />

        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<MyForm />)
```

### Check for errors with hasErrors

```tsx
const Component = () => {
  const { data } = Form.useData('default-id', {
    showError: true,
    isVisible: true,
  })
  const { hasErrors, hasFieldError } = Form.useValidation('default-id')
  return (
    <Form.Handler id="default-id">
      <Flex.Stack>
        <Tools.Log
          data={hasErrors()}
          label="hasErrors:"
          breakout={false}
        />
        <Tools.Log
          data={hasFieldError('/foo')}
          label="hasFieldError:"
          breakout={false}
        />

        <Field.Boolean label="Error" variant="button" path="/showError" />

        <Field.Boolean
          label="Visible"
          variant="button"
          path="/isVisible"
        />

        <Form.Visibility pathTrue="/isVisible" animate>
          <Field.String
            path="/foo"
            label="Label"
            value={data.showError ? 'error' : 'valid'}
            pattern="^valid$"
            validateInitially
          />
        </Form.Visibility>
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<Component />)
```
