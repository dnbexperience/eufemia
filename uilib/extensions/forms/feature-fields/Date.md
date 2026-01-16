---
title: 'Date'
description: '`Field.Date` is a wrapper component for the input of strings, with user experience tailored for date values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/feature-fields/Date/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Date />)
```

## Description

`Field.Date` is a wrapper component for the [DatePicker](/uilib/components/date-picker/), with user experience tailored for date values.

There is a corresponding [Value.Date](/uilib/extensions/forms/Value/Date) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Date)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/Date)

## Validators

### Internal validators exposed

`Field.Date` exposes the `dateValidator` validator through its `onBlurValidator` property. Take a look at [this demo](/uilib/extensions/forms/feature-fields/Date/demos/#extend-validation-with-custom-validation-function).
The `dateValidator` validator validates invalid dates and dates against the `minDate` and `maxDate` properties.

### Extending validators

You can compose the shared validator with your own checks by returning it along with custom logic. Import `DateValidator` to type your validator and have `validators` typed too.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
import type { DateValidator } from '@dnb/eufemia/extensions/forms/Field/Date'

const myValidator: DateValidator = (value, { validators }) => {
  const { dateValidator } = validators ?? {}
  const notToday = (value: string) => {
    if (value === new Date().toISOString().slice(0, 10)) {
      return new Error('Please enter another date than today')
    }
  }

  // Keep the default validation and ban today's date.
  return [dateValidator, notToday]
}

render(<Field.Date onBlurValidator={myValidator} />)
```

## Demos

<ChangeLocale
  bottom
  label="Locale used in the demos:"
  listUSLocale={true}
/>

### Label and value

```tsx
render(
  <Field.Date
    label="Label text"
    value="2023-01-16"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### With a horizontal layout

```tsx
render(
  <Field.Date
    label="Label with a long text that will wrap"
    layout="horizontal"
    layoutOptions={{
      width: 'medium', // can be a rem value
    }}
  />,
)
```

### Date range

```tsx
render(
  <Field.Date label="Label text" value="2023-01-16|2023-04-01" range />,
)
```

### Automatically close picker

The calendar will be prevented from automatically closing when the submit or cancel buttons are visible, to ensure that the user is actually able to interact with them after date selection.

To enable the picker to close automatically, you have to set `showCancelButton` to `false`, to override the default behavior.

```tsx
render(<Field.Date label="Automatically Close" showCancelButton={false} />)
```

### With help

```tsx
render(
  <Field.Date
    label="Label text"
    value="2023-01-16"
    help={{
      title: 'Help is available',
      content:
        'Kindness and helping others will return to you when you least expect it, and maybe when you need it.',
    }}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Disabled

```tsx
render(
  <Field.Date
    label="Label text"
    value="2023-01-16"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />,
)
```

### Error

```tsx
render(
  <Field.Date
    value="2023-01-16"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  />,
)
```

### Date limit validation

The Date field will automatically display an error message if the selected date is before `minDate` or after `maxDate`.

```tsx
render(
  <Field.Date
    value="2024-12-31|2025-02-01"
    minDate="2025-01-01"
    maxDate="2025-01-31"
    range
  />,
)
```

### Validation - Required

```tsx
render(
  <Field.Date
    label="Label text"
    value="2023-01-16"
    onChange={(value) => console.log('onChange', value)}
    required
  />,
)
```

### Extend validation with custom validation function

You can [extend the existing validation](/uilib/extensions/forms/create-component/useFieldProps/info/#validators) (`dateValidator`) with your own validation function.

```tsx
const myDateValidator = (value: string) => {
  if (value === '2025-01-01') {
    return new Error('My custom message')
  }
  if (value === '2025-01-03') {
    return [
      new Error('My custom message 1'),
      new Error('My custom message 2'),
    ]
  }
}

// Combine the shared validator with the custom date rules.
// Combine the shared validator with the custom date rules.
const myOnBlurValidator: DateValidator = (
  value: string,
  { validators },
) => {
  const { dateValidator } = validators ?? {}
  return [myDateValidator, dateValidator]
}
render(
  <Field.Date
    value="2025-01-01"
    minDate="2024-12-31"
    maxDate="2025-01-31"
    onBlurValidator={myOnBlurValidator}
  />,
)
```

```tsx
render(
  <Form.Card>
    <Field.String width="stretch" />
    <Field.Date label="default" />
    <Field.Date width="small" label="small" />
    <Field.Date width="medium" label="medium" />
    <Field.Date width="large" label="large" />
    <Field.Date width="stretch" label="stretch" />
  </Form.Card>,
)
```
