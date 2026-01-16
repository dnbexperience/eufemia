---
title: 'DateOfBirth'
description: '`Field.DateOfBirth` is a wrapper component for the input of strings, with user experience tailored for date of birth values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/feature-fields/DateOfBirth/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.DateOfBirth />)
```

## Description

`Field.DateOfBirth` is a wrapper component for the [input of strings](/uilib/extensions/forms/base-fields/String), with user experience tailored for date of birth values.

There is a corresponding [Value.DateOfBirth](/uilib/extensions/forms/Value/DateOfBirth) component.

It supports the HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute, and by default set it to `bday-day` for the day field, `bday-month` for the month field, and to `bday-year` for the year field.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/DateOfBirth)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/DateOfBirth)

## Validators

### Internal validators exposed

`Field.DateOfBirth` expose the `dateOfBirthValidator` validator through its `onChangeValidator` and `onBlurValidator` property, take a look at [this demo](/uilib/extensions/forms/feature-fields/DateOfBirth/demos/#extend-validation-with-custom-validation-function).
The `dateOfBirthValidator` validator, validates if the date provided is a valid date or not.

### Extending validators

When you return the built-in validator together with custom validation logic you can introduce additional rules without losing the default checks. Import `DateOfBirthValidator` to type your validator and the `validators` object.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
import type { DateOfBirthValidator } from '@dnb/eufemia/extensions/forms/Field/DateOfBirth'

const myValidator: DateOfBirthValidator = (value, { validators }) => {
  const { dateOfBirthValidator } = validators ?? {}
  const modernBirthYear = (value: string) => {
    if (value && value.slice(0, 4) < '1900') {
      return new Error('Birth year must be 1900 or later')
    }
  }

  // Keep the default validator and add a minimum year requirement.
  return [dateOfBirthValidator, modernBirthYear]
}

render(<Field.DateOfBirth onBlurValidator={myValidator} />)
```

## Demos

<ChangeLocale
  bottom
  label="Locale used in the demos:"
  listUSLocale={true}
/>

### Empty

```tsx
render(
  <Field.DateOfBirth
    onChange={(value, additionalArgs) => {
      {
        const { day, month, year } = additionalArgs || {}
        console.log('onChange', value, {
          day,
          month,
          year,
        })
      }
    }}
    onDayChange={(day) => console.log('onDayChange', day)}
    onMonthChange={(month) => console.log('onMonthChange', month)}
    onYearChange={(year) => console.log('onYearChange', year)}
  />,
)
```

### Label

```tsx
render(
  <Field.DateOfBirth
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Label and value

```tsx
render(
  <Field.DateOfBirth
    label="Label text"
    value="2000-05-17"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### With help

```tsx
render(
  <Field.DateOfBirth
    label="Label text"
    value="2000-05-17"
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
  <Field.DateOfBirth
    value="2000-05-17"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />,
)
```

### Error

```tsx
render(
  <Field.DateOfBirth
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  />,
)
```

### Validation - Required

```tsx
render(
  <Field.DateOfBirth
    value="2000-05-17"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    required
  />,
)
```

### Extend validation with custom validation function

You can [extend the existing validation](/uilib/extensions/forms/create-component/useFieldProps/info/#validators) (`dateOfBirthValidator`) with your own validation function.

```tsx
const firstDigitIs1Validator = (value: string) => {
  if (value.substring(0, 4) !== '1990') {
    return new Error('Has to be born in the year 1990!')
  }
}

// Keep the default validator and add a custom year rule.
// Keep the default validator and add a custom year rule.
const myValidator: DateOfBirthValidator = (value, { validators }) => {
  const { dateOfBirthValidator } = validators
  return [dateOfBirthValidator, firstDigitIs1Validator]
}
render(
  <Field.DateOfBirth
    required
    value="2000-05-17"
    onBlurValidator={myValidator}
    validateInitially
  />,
)
```

```tsx
render(
  <Form.Card>
    <Field.String width="stretch" />
    <Field.DateOfBirth label="default" />
    <Field.DateOfBirth width="large" label="large" />
    <Field.DateOfBirth width="stretch" label="stretch" />
  </Form.Card>,
)
```

### Path usage

```tsx
render(
  <Form.Handler
    onSubmit={console.log}
    data={{
      dob: '2000-05-17',
    }}
  >
    <Form.Card>
      <Field.DateOfBirth path="/dob" />

      <Value.DateOfBirth path="/dob" showEmpty />

      <Tools.Log />
    </Form.Card>
    <Form.SubmitButton />
  </Form.Handler>,
)
```

### Transform in and out

You can use `transformIn` and `transformOut` to transform data between external and internal formats.

```tsx
const transformOut = (internal, additionalArgs) => {
  if (additionalArgs) {
    const { year, month, day } = additionalArgs
    return {
      year,
      month,
      day,
    }
  }
}
const transformIn = (external) => {
  if (external) {
    const { year, month, day } = external
    return `${year}-${month}-${day}`
  }
}
render(
  <Form.Handler
    defaultData={{
      myField: {
        year: '1990',
        month: '05',
        day: '15',
      },
    }}
  >
    <Form.Card>
      <Field.DateOfBirth
        path="/myField"
        transformOut={transformOut}
        transformIn={transformIn}
        label="Transform in and out"
      />
      <Tools.Log />
    </Form.Card>
  </Form.Handler>,
)
```
