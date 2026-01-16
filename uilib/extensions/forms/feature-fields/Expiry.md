---
title: 'Expiry'
description: '`Field.Expiry` is a wrapper component for the input of strings, with user experience tailored for expiry dates for payment cards.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/feature-fields/Expiry/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Expiry />)
```

## Description

`Field.Expiry` is a wrapper component for [string input](/uilib/extensions/forms/base-fields/String), with user experience tailored for expiry dates on payment cards.

It supports the HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute and by default sets it to `cc-exp-month` for the month field and to `cc-exp-year` for the year field.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Expiry)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/Expiry)

## Validators

### Internal validators exposed

`Field.Expiry` exposes the `expiryValidator` validator through its `onBlurValidator` property. Take a look at [this demo](/uilib/extensions/forms/feature-fields/Expiry/demos/#extend-validation-with-custom-validation-function).
The `expiryValidator` validator validates invalid months and/or years.

### Extending validators

Combine the exported validator with your own rules to keep the built-in checks and add custom guards. Import `ExpiryValidator` to type your validator and the shared `validators`.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
import type { ExpiryValidator } from '@dnb/eufemia/extensions/forms/Field/Expiry'

const myValidator: ExpiryValidator = (value, { validators }) => {
  const { expiryValidator } = validators ?? {}
  const monthNotZero = (value: string) => {
    if (value && value.slice(0, 2) === '00') {
      return new Error('Month cannot be 00')
    }
  }

  // Return both the built-in validator and the custom month check.
  return [expiryValidator, monthNotZero]
}

render(<Field.Expiry onBlurValidator={myValidator} />)
```

## Demos

The locale is what determines the components `placeholder` format .e.g. `mm/åå` in Norwegian, `mm/yy` in English.

<ChangeLocale
  bottom
  label="Locale used in the demos:"
  listUSLocale={true}
/>

English (US) is not included in Eufemia by default. You can include it like:

```jsx
import enUS from '@dnb/eufemia/shared/locales/en-US'
<EufemiaProvider locale={enUS} ...>
	App
</EufemiaProvider>
```

## Demos

### Empty

```tsx
render(
  <Field.Expiry onChange={(expiry) => console.log('onChange', expiry)} />,
)
```

### Label

```tsx
render(
  <Field.Expiry
    value="0835"
    label="Label text"
    onChange={(expiry) => console.log('onChange', expiry)}
  />,
)
```

### With a horizontal layout

```tsx
render(
  <Field.Expiry
    value="0835"
    layout="horizontal"
    layoutOptions={{
      width: 'medium', // can be a rem value
    }}
  />,
)
```

### With help

```tsx
render(
  <Field.Expiry
    label="Label text"
    help={{
      title: 'Help is available',
      content:
        'Kindness and helping others will return to you when you least expect it, and maybe when you need it.',
    }}
    onChange={(expiry) => console.log('onChange', expiry)}
  />,
)
```

### Disabled

```tsx
render(
  <Field.Expiry
    value="0826"
    label="Label text"
    onChange={(expiry) => console.log('onChange', expiry)}
    disabled
  />,
)
```

### Error

```tsx
render(
  <Field.Expiry
    value="0326"
    label="Label text"
    onChange={(expiry) => console.log('onChange', expiry)}
    error={new Error('This is what is wrong...')}
  />,
)
```

### Validation - Required

```tsx
render(
  <Field.Expiry
    value="0826"
    label="Label text"
    onChange={(expiry) => console.log('onChange', expiry)}
    required
  />,
)
```

### Transform in and out

This example demonstrates how to transform data when it enters and leaves the form field.

You can use the `transformIn` property to modify the incoming data before it is displayed in the field, and the `transformOut` property to adjust the data before it is submitted or processed.
When `transformIn` one can either return a simple value `"0835"` or an object `{ month:"08", year:"35" }`.

```tsx
const transformOut = (internal, additionalArgs) => {
  const { year, month } = additionalArgs
  return {
    year,
    month,
  }
}
const transformIn = (external) => {
  if (external) {
    const { year, month } = external
    return {
      year,
      month,
    }
  }
}
render(
  <Form.Handler
    defaultData={{
      myField: {
        year: '35',
        month: '08',
      },
    }}
  >
    <Form.Card>
      <Field.Expiry
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

### Extend validation with custom validation function

You can [extend the existing validation](/uilib/extensions/forms/create-component/useFieldProps/info/#validators) (`expiryValidator`) with your own validation function.

```tsx
const myExpiryValidator = (value: string) => {
  if (value?.startsWith('12')) {
    return new Error('Expiry month cannot be december')
  }
}

// Keep the built-in validator while banning December.
// Keep the built-in validator while banning December.
const myOnBlurValidator: ExpiryValidator = (
  value: string,
  { validators },
) => {
  const { expiryValidator } = validators
  return [myExpiryValidator, expiryValidator]
}
render(<Field.Expiry value="1225" onBlurValidator={myOnBlurValidator} />)
```
