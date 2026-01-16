---
title: 'SubmitButton'
description: '`Form.SubmitButton` connects to the `Form.Handler` to submit the active state of the internal DataContext, triggering `onSubmit`.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Form/SubmitButton/metadata.json
---

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.SubmitButton />)
```

## Description

`Form.SubmitButton` connects to the [Form.Handler](/uilib/extensions/forms/Form/Handler/) to submit the active state of the internal [DataContext](/uilib/extensions/forms/DataContext/), triggering `onSubmit`.

The default button type is `type="submit"`, ready to be used with the [Form.Handler](/uilib/extensions/forms/Form/Handler).

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(
  <Form.Handler>
    <Form.ButtonRow>
      <Form.SubmitButton />
    </Form.ButtonRow>
  </Form.Handler>,
)
```

## Demos

### Standard text

```tsx
render(
  <Form.Handler
    data={{
      foo: 'bar',
    }}
    onSubmit={(data) => console.log('onSubmit', data)}
  >
    <Form.SubmitButton />
  </Form.Handler>,
)
```

### Send variant

```tsx
render(
  <Form.Handler
    data={{
      foo: 'bar',
    }}
    onSubmit={(data) => console.log('onSubmit', data)}
  >
    <Form.SubmitButton variant="send" />
  </Form.Handler>,
)
```

### With SubmitIndicator

Example of showing the [Form.SubmitIndicator](/uilib/extensions/forms/Form/SubmitIndicator/) with the property `showSubmitIndicator` set to `true`.

When using the submit button inside [Form.Handler](/uilib/extensions/forms/Form/Handler/) you can use an async `onSubmit` event handler to show a loading indicator when the form is submitting.

```tsx
render(
  <Form.Handler>
    <Form.SubmitButton showIndicator />
  </Form.Handler>,
)
```
