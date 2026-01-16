---
title: 'NationalIdentityNumber'
description: '`Field.NationalIdentityNumber` is a wrapper component for the input of strings, with user experience tailored for national identity number values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/feature-fields/NationalIdentityNumber/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.NationalIdentityNumber />)
```

## Description

`Field.NationalIdentityNumber` is a wrapper component for [string input](/uilib/extensions/forms/base-fields/String), with user experience tailored for national identity number values.

This field is meant for [Norwegian national identity numbers (fnr)](https://www.skatteetaten.no/en/person/national-registry/identitetsnummer/fodselsnummer/) and [D numbers](https://www.skatteetaten.no/en/person/national-registry/identitetsnummer/d-nummer/), and therefore takes an 11-digit string as a value. A Norwegian national identity number can have a leading zero, which is why it's a string and not a number.
More info can be found at [Skatteetaten](https://www.skatteetaten.no/en/person/national-registry/identitetsnummer/fodselsnummer/#:~:text=A%20national%20identity%20number%20consists,national%20identity%20number%20are%20220676).

It validates input for [Norwegian national identity numbers (fnr)](https://www.skatteetaten.no/en/person/national-registry/identitetsnummer/fodselsnummer/) and [D numbers](https://www.skatteetaten.no/en/person/national-registry/identitetsnummer/d-nummer/) using the [fnrvalidator](https://github.com/navikt/fnrvalidator).
The validation happens on blur, internally using the `onBlurValidator` [property](/uilib/extensions/forms/feature-fields/NationalIdentityNumber/properties/#field-specific-properties).

There is a corresponding [Value.NationalIdentityNumber](/uilib/extensions/forms/Value/NationalIdentityNumber) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/NationalIdentityNumber)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/NationalIdentityNumber)

### Support for different countries

When it comes to supporting different countries, Eufemia Forms may prefer to introduce a new component for each country, simply because the nature of such a component can differ significantly from the original component which was made for Norway in mind.

## Validators

### Internal validators exposed

`Field.NationalIdentityNumber` exposes the following validators through its `onChangeValidator` and `onBlurValidator` properties:

- `dnrValidator`: validates a D number.
- `fnrValidator`: validates a national identity number (fødselsnummer).
- `dnrAndFnrValidator`:
  - validates the identification number as a D number when first digit is 4 or greater (because a D number has its first number increased by 4).
  - validates the identification number as a national identity number (fødselsnummer) when first digit is 3 or less.

### Extending validators

Keep the built-in validators while adding custom rules by returning them together with your own logic. Import `NationalIdentityNumberValidator` so TypeScript tracks each exported validator.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
import type { NationalIdentityNumberValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'

const myValidator: NationalIdentityNumberValidator = (
  value,
  { validators },
) => {
  const { dnrAndFnrValidator } = validators ?? {}
  const mustIncludeSeven = (value: string) => {
    if (value && !value.includes('7')) {
      return new Error('Identifier must contain the digit 7')
    }
  }

  // Compose the default validator with a custom digit check.
  return [dnrAndFnrValidator, mustIncludeSeven]
}

render(<Field.NationalIdentityNumber onBlurValidator={myValidator} />)
```

### createMinimumAgeValidator

You can create your own age validator by using the `createMinimumAgeValidator` function. It takes an age as a parameter and returns a validator function. The validator function takes a value and returns an error message if the value is not above the given age.
It validates whether the identification number has a date of birth that is 18 years or older. It uses only the first 7 digits of the identification number to validate. The first 6 digits represent the date of birth, and the next digit represents the century.
Since it only uses the first 7 digits, it does not validate the identification number itself. Therefore, it's common to use this validator together with one of the validators above (`dnrValidator`, `fnrValidator`, or `dnrAndFnrValidator`) to validate the identification number as well.

You need to import the `createMinimumAgeValidator` function from the `Field.NationalIdentityNumber` component:

```tsx
import { createMinimumAgeValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'

// Create a validator that validates if the identification number is above 18 years old
const above18YearsValidator = createMinimumAgeValidator(18)

render(
  <Field.NationalIdentityNumber onBlurValidator={above18YearsValidator} />,
)
```

See the following [example](/uilib/extensions/forms/feature-fields/NationalIdentityNumber/#extend-validation-with-custom-validation-function) on how to extend validation using the exposed validators.

### createMinimumAgeVerifier

To use the `createMinimumAgeValidator` functionality without a field, you can use `createMinimumAgeVerifier`, which returns a boolean.

```tsx
import { createMinimumAgeVerifier } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'

const isAdult = createMinimumAgeVerifier(18)

isAdult('123') // false
isAdult('10072476609') // false
isAdult('09100654021') // true
```

## Demos

### Empty

```tsx
render(
  <Field.NationalIdentityNumber
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Omit mask

```tsx
render(
  <Field.NationalIdentityNumber
    onChange={(value) => console.log('onChange', value)}
    omitMask
  />,
)
```

### Placeholder

```tsx
render(
  <Field.NationalIdentityNumber
    placeholder="Enter 11 digits..."
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Label

```tsx
render(
  <Field.NationalIdentityNumber
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Label and value

```tsx
render(
  <Field.NationalIdentityNumber
    label="Label text"
    value="01017501234"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### With help

```tsx
render(
  <Field.NationalIdentityNumber
    label="Label text"
    value="01017501234"
    help={{
      title: 'Help is available',
      content: 'The more I help others to succeed, the more I succeed.',
    }}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Disabled

```tsx
render(
  <Field.NationalIdentityNumber
    value="01010101010"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />,
)
```

### Error

```tsx
render(
  <Field.NationalIdentityNumber
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
  <Field.NationalIdentityNumber
    value="12345678901"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    required
  />,
)
```

### Validation - Norwegian national identity numbers

It validates [Norwegian national identity numbers(fnr)](https://www.skatteetaten.no/en/person/national-registry/identitetsnummer/fodselsnummer/) using the [fnrvalidator](https://github.com/navikt/fnrvalidator).

Below is an example of the error message displayed when there's an invalid Norwegian national identity number(fnr):

```tsx
render(
  <Field.NationalIdentityNumber value="29020112345" validateInitially />,
)
```

### Validation - D numbers

It validates [D numbers](https://www.skatteetaten.no/en/person/national-registry/identitetsnummer/d-nummer/) using the [fnrvalidator](https://github.com/navikt/fnrvalidator).

Below is an example of the error message displayed when there's an invalid D number(a D number has its first number in the identification number increased by 4):

```tsx
render(
  <Field.NationalIdentityNumber value="69020112345" validateInitially />,
)
```

### Validation function

You can provide your own validation function, either to `onChangeValidator` or `onBlurValidator`.

```tsx
const fnr = (value: string) =>
  value.length >= 11
    ? {
        status: 'valid',
      }
    : {
        status: 'invalid',
      }
render(
  <Field.NationalIdentityNumber
    required
    value="123"
    onBlurValidator={(value) => {
      const result = fnr(value)
      return result.status === 'invalid'
        ? new FormError('Field.errorPattern')
        : undefined
    }}
    validateInitially
  />,
)
```

### Extend validation with custom validation function

You can [extend the existing validations](/uilib/extensions/forms/create-component/useFieldProps/info/#validators)(`dnrValidator`, `fnrValidator`, `dnrAndFnrValidator`, and make your own age validator by using the `createMinimumAgeValidator` function) with your own validation function.

```tsx
const bornInAprilValidator = (value: string) => {
  if (value.substring(2, 4) !== '04') {
    return new Error('Not born in April')
  }
}
// Keep the default validator while ensuring birth month is April.
// Keep the default validator while ensuring birth month is April.
const myValidator: NationalIdentityNumberValidator = (
  value,
  { validators },
) => {
  const { dnrAndFnrValidator } = validators ?? {}
  return [dnrAndFnrValidator, bornInAprilValidator]
}
render(
  <Field.NationalIdentityNumber
    required
    value="53050129159"
    onBlurValidator={myValidator}
    validateInitially
  />,
)
```

### Extend validation with adult validator

You can [extend the existing validations](/uilib/extensions/forms/create-component/useFieldProps/info/#validators)(`dnrValidator`, `fnrValidator`, and `dnrAndFnrValidator`) with your own age validator, by using the `createMinimumAgeValidator` function.

```tsx
const adultValidator = createMinimumAgeValidator(18)
// Keep the default validator while adding an age check.
// Keep the default validator while adding an age check.
const myAdultValidator: NationalIdentityNumberValidator = (
  value,
  { validators },
) => {
  const { dnrAndFnrValidator } = validators ?? {}
  return [dnrAndFnrValidator, adultValidator]
}
render(
  <Field.NationalIdentityNumber
    required
    value="56052459244"
    onBlurValidator={myAdultValidator}
    validateInitially
  />,
)
```

### Validate only national identity numbers(fnr) above 18 years old

```tsx
const adultValidator = createMinimumAgeValidator(18)
// Keep the default validator while ensuring an FNR-based age check.
// Keep the default validator while ensuring an FNR-based age check.
const myFnrAdultValidator: NationalIdentityNumberValidator = (
  value,
  { validators },
) => {
  const { fnrValidator } = validators ?? {}
  return [fnrValidator, adultValidator]
}
render(
  <Field.NationalIdentityNumber
    required
    value="49100651997"
    onBlurValidator={myFnrAdultValidator}
    validateInitially
  />,
)
```
