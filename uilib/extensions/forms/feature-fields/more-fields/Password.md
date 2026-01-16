---
title: 'Password'
description: '`Field.Password` is a wrapper component for the input of strings, with user experience tailored for passwords.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/feature-fields/more-fields/Password/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Password />)
```

## Description

`Field.Password` is a wrapper component for the [input of strings](/uilib/extensions/forms/base-fields/String), with user experience tailored for passwords. The input also comes with a button to toggle the password visibility.

It supports the HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute, and by default set it to `current-password`. Consider setting autocomplete to `new-password` when it's expected that the user should enter a new password.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Password)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/more-fields/Password)

## Validation

By default it has no validation. But you can enable it by giving a `required`, `pattern`, `schema`, `onChangeValidator` or `onBlurValidator` property with the needed validation. More about validation in the [Getting Started](/uilib/extensions/forms/getting-started/#validation-and-error-handling) section.

## Demos

### Placeholder

```tsx
render(
  <Field.Password
    placeholder="Please enter your password"
    onChange={(value) => console.log('onChange', value)}
    onHidePassword={(event) => console.log('onHidePassword', event)}
    onShowPassword={(event) => console.log('onShowPassword', event)}
  />,
)
```

### Label

```tsx
render(
  <Field.Password
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    onHidePassword={(event) => console.log('onHidePassword', event)}
    onShowPassword={(event) => console.log('onShowPassword', event)}
  />,
)
```

### Label and value

```tsx
render(
  <Field.Password
    label="Label text"
    value="password123"
    onChange={(value) => console.log('onChange', value)}
    onHidePassword={(event) => console.log('onHidePassword', event)}
    onShowPassword={(event) => console.log('onShowPassword', event)}
  />,
)
```

### With help

```tsx
render(
  <Field.Password
    onChange={(value) => console.log('onChange', value)}
    onHidePassword={(event) => console.log('onHidePassword', event)}
    onShowPassword={(event) => console.log('onShowPassword', event)}
    help={{
      title: 'Help is available',
      content:
        'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
    }}
  />,
)
```

### Disabled

```tsx
render(
  <Field.Password
    value="password123"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    onHidePassword={(event) => console.log('onHidePassword', event)}
    onShowPassword={(event) => console.log('onShowPassword', event)}
    disabled
  />,
)
```

### Error

```tsx
render(
  <Field.Password
    value="your-birthday"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    onHidePassword={(event) => console.log('onHidePassword', event)}
    onShowPassword={(event) => console.log('onShowPassword', event)}
    error={new Error('This is what is wrong...')}
  />,
)
```

### Validation - Required

```tsx
render(
  <Field.Password
    value="pass"
    onChange={(value) => console.log('onChange', value)}
    onHidePassword={(event) => console.log('onHidePassword', event)}
    onShowPassword={(event) => console.log('onShowPassword', event)}
    required
  />,
)
```

### Validation - Pattern

```tsx
render(
  <Field.Password
    value="password123"
    pattern="\\w{8}[0-9]{2}"
    onChange={(value) => console.log('onChange', value)}
    onHidePassword={(event) => console.log('onHidePassword', event)}
    onShowPassword={(event) => console.log('onShowPassword', event)}
    required
  />,
)
```
