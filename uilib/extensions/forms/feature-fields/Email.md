---
title: 'Email'
description: '`Field.Email` is a wrapper component for the input of strings, with user experience tailored for email values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/feature-fields/Email/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Email />)
```

## Description

`Field.Email` is a wrapper component for [string input](/uilib/extensions/forms/base-fields/String), with user experience tailored for email values.

It supports the HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute and by default sets it to `email`.

There is a corresponding [Value.Email](/uilib/extensions/forms/Value/Email) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Email)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/Email)

## Characteristics

- If the user enters an email with a space, the space is removed.
- Only valid characters are allowed.
- `autocomplete` is set to `email`.
- `inputmode` is set to `email`.

## Demos

### Empty

```tsx
render(
  <Field.Email onChange={(value) => console.log('onChange', value)} />,
)
```

### Placeholder

```tsx
render(
  <Field.Email
    placeholder="Enter email address..."
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Label

```tsx
render(
  <Field.Email
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Label and value

```tsx
render(
  <Field.Email
    label="Label text"
    value="my-m@il.com"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### With help

```tsx
render(
  <Field.Email
    label="Label text"
    value="my-m@il.com"
    help={{
      title: 'Help is available',
      content:
        'Use your gifts to teach and help others. Acknowledge them as gifts (even if only in your mind). Take some time to list your strengths as well as the ways in which you could share them with the world around you and how that truly is a gift to others.',
    }}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Disabled

```tsx
render(
  <Field.Email
    value="my-m@il.com"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />,
)
```

### Invalid syntax

```tsx
render(
  <Field.Email
    value="Not a mail"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    validateInitially
  />,
)
```

### Error message

```tsx
render(
  <Field.Email
    value="foo@bar.com"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  />,
)
```

### Validation - Required

```tsx
render(
  <Field.Email
    value="my-m@il.com"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    required
  />,
)
```

### Asynchronous on blur validator

```tsx
async function mockAsyncValidator(value) {
  const request = createRequest()
  console.log('making API request to validate:', value)
  await request(3000) // Simulate a request
  console.log('API request finished')

  // Randomly validates or invalidates
  const validation = Math.random() < 0.5
  console.log('API request finished and validated to:', validation)
  if (validation) {
    return Error('This email is not valid!')
  }
}
render(
  <Form.Handler>
    <Form.Card>
      <Field.Email
        value="foo@bar.com"
        onBlurValidator={mockAsyncValidator}
      />
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>,
)
```
