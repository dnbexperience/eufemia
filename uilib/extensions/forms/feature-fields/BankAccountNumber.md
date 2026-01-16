---
title: 'BankAccountNumber'
description: '`Field.BankAccountNumber` is a wrapper component for the input of strings, with user experience tailored for bank account number values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/feature-fields/BankAccountNumber/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.BankAccountNumber />)
```

## Description

`Field.BankAccountNumber` is a wrapper component for [string input](/uilib/extensions/forms/base-fields/String), with user experience tailored for bank account values.

This field is meant for Norwegian bank account numbers and therefore takes an 11-digit string as a value. A Norwegian bank account number can have a leading zero, which is why this value is a string and not a number. In addition, we validate `0000 00 00000` as invalid.
More information can be found at [Wikipedia](https://no.wikipedia.org/wiki/Kontonummer).

There is a corresponding [Value.BankAccountNumber](/uilib/extensions/forms/Value/BankAccountNumber) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/BankAccountNumber)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/BankAccountNumber)

## Validators

### Internal validators exposed

`Field.BankAccountNumber` exposes the `bankAccountNumberValidator` validator through its `onChangeValidator` and `onBlurValidator` properties. Take a look at [this demo](/uilib/extensions/forms/feature-fields/BankAccountNumber/demos/#extend-validation-with-custom-validation-function).
The `bankAccountNumberValidator` validator validates whether the bank account number provided is a [Norwegian bank account number](https://no.wikipedia.org/wiki/Kontonummer) or not.

### Extending validators

Use the `validators` parameter to keep the default checks and add your own custom rule. Import `BankAccountNumberValidator` to type your `onBlurValidator` and get the typed `validators` object.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
import type { BankAccountNumberValidator } from '@dnb/eufemia/extensions/forms/Field/BankAccountNumber'

const myValidator: BankAccountNumberValidator = (
  value,
  { validators },
) => {
  const { bankAccountNumberValidator } = validators ?? {}
  const prefixChecker = (value: string) => {
    if (value && value[0] !== '1') {
      return new Error('Account number must start with 1')
    }
  }

  // Keep the built-in validator and add a custom prefix rule.
  return [bankAccountNumberValidator, prefixChecker]
}

render(<Field.BankAccountNumber onBlurValidator={myValidator} />)
```

## Demos

### Empty

```tsx
render(
  <Field.BankAccountNumber
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Omit mask

```tsx
render(
  <Field.BankAccountNumber
    onChange={(value) => console.log('onChange', value)}
    omitMask
  />,
)
```

### Placeholder

```tsx
render(
  <Field.BankAccountNumber
    placeholder="Enter 11 digits..."
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Label

```tsx
render(
  <Field.BankAccountNumber
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Label and value

```tsx
render(
  <Field.BankAccountNumber
    label="Label text"
    value="20001234567"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### With help

```tsx
render(
  <Field.BankAccountNumber
    label="Label text"
    value="20001234567"
    help={{
      title: 'Help is available',
      content:
        'The real point is that we all need help somewhere along life’s path whether we think we will or not. And, if you are the one giving and helping, just remember this: no matter what happens later, you will always be secure in the fact knowing that you have remained strong and true to assist those that need your help.',
    }}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Disabled

```tsx
render(
  <Field.BankAccountNumber
    value="20001234567"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />,
)
```

### Error

```tsx
render(
  <Field.BankAccountNumber
    value="007"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  />,
)
```

### Validation - Required

```tsx
render(
  <Field.BankAccountNumber
    value="20001234567"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    required
  />,
)
```

### Extend validation with custom validation function

You can [extend the existing validation](/uilib/extensions/forms/create-component/useFieldProps/info/#validators) (`bankAccountNumberValidator`) with your own validation function.

```tsx
const firstDigitIs1Validator = (value: string) => {
  if (value.substring(0, 1) !== '1') {
    return new Error('First digit is not 1')
  }
}

// Keep the built-in validator and add your own checks.
// Keep the built-in validator and add your own checks.
const myValidator: BankAccountNumberValidator = (
  value,
  { validators },
) => {
  const { bankAccountNumberValidator } = validators ?? {}
  return [bankAccountNumberValidator, firstDigitIs1Validator]
}
render(
  <Field.BankAccountNumber
    required
    value="65845125621"
    onBlurValidator={myValidator}
    validateInitially
  />,
)
```
