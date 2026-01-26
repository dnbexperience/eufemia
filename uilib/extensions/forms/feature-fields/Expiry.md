---
title: 'Field.Expiry'
description: '`Field.Expiry` is a wrapper component for the input of strings, with user experience tailored for expiry dates for payment cards.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.288Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.Expiry

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
  <Field.Expiry onChange={(expiry) => console.log('onChange', expiry)} />
)
```

### Label

```tsx
render(
  <Field.Expiry
    value="0835"
    label="Label text"
    onChange={(expiry) => console.log('onChange', expiry)}
  />
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
  />
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
  />
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
  />
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
  />
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
  />
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
  </Form.Handler>
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
  { validators }
) => {
  const { expiryValidator } = validators
  return [myExpiryValidator, expiryValidator]
}
render(<Field.Expiry value="1225" onBlurValidator={myOnBlurValidator} />)
```

## Properties

### Field-specific properties

```json
{
  "size": {
    "doc": "The sizes you can choose is `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).",
    "type": ["string", "number"],
    "status": "optional"
  },
  "onBlurValidator": {
    "doc": "Custom validator function that is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Defaults to validating invalid month and year, using `expiryValidator`.",
    "type": "function",
    "status": "optional"
  }
}
```

### General properties

```json
{
  "value": {
    "doc": "Source data value for the field. Will take precedence over the path value given in the data context.",
    "type": "{valueType}",
    "status": "optional"
  },
  "defaultValue": {
    "doc": "Default source data value for the field. Will not take precedence over the path value given in the data context.",
    "type": "{valueType}",
    "status": "optional"
  },
  "path": {
    "doc": "JSON Pointer for where the data for the field is located in the source dataset (when using Form.Handler or DataContext). The `path` will also be set as the `name` attribute for the [string](/uilib/extensions/forms/base-fields/String/)-field.",
    "type": "string",
    "status": "optional"
  },
  "info": {
    "doc": "Info message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
    "type": ["React.Node", "Array<React.Node>", "function"],
    "status": "optional"
  },
  "warning": {
    "doc": "Warning message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
    "type": ["React.Node", "Array<React.Node>", "function"],
    "status": "optional"
  },
  "error": {
    "doc": "Error message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
    "type": ["Error", "FormError", "Array<Error | FormError>", "function"],
    "status": "optional"
  },
  "disabled": {
    "doc": "Set `true` to show the field but without the possibility of changing the value.",
    "type": "boolean",
    "status": "optional"
  },
  "emptyValue": {
    "doc": "The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",
    "type": ["{valueType}", "undefined"],
    "status": "optional"
  },
  "required": {
    "doc": "When set to `true`, the field will give an error if the value fails the required validation. When set to `false`, the field will not be required, but will add a \"(optional)\" suffix to the label.",
    "type": "boolean",
    "status": "optional"
  },
  "labelSuffix": {
    "doc": "Will append an additional text to the label, like \"(optional)\". When using `inheritLabel`, the suffix will not be inherited. NB: The visual appearance of the `labelSuffix` may change in the future.",
    "type": "React.Node",
    "status": "optional"
  },
  "schema": {
    "doc": "Custom JSON Schema for validating the value.",
    "type": "object",
    "status": "optional"
  },
  "validateInitially": {
    "doc": "Set to `true` to show validation based errors initially (from given value-prop or source data) before the user interacts with the field.",
    "type": "boolean",
    "status": "optional"
  },
  "validateUnchanged": {
    "doc": "Set to `true` to show validation based errors when the field is touched (like focusing a field and blurring) without having changed the value. Since the user did not introduce a new error, this will apply when the value was initially invalid based on validation.",
    "type": "boolean",
    "status": "optional"
  },
  "validateContinuously": {
    "doc": "Set to `true` to show validation based errors continuously while writing, not just when blurring the field.",
    "type": "boolean",
    "status": "optional"
  },
  "errorMessages": {
    "doc": "Custom error messages for each type of error, overriding default messages. The messages can be a React.ReactNode or a string.",
    "type": "object",
    "status": "optional"
  },
  "onChangeValidator": {
    "doc": "Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered on every change done by the user. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",
    "type": "function",
    "status": "optional"
  },
  "onBlurValidator": {
    "doc": "Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",
    "type": "function",
    "status": "optional"
  },
  "transformIn": {
    "doc": "Transforms the `value` before its displayed in the field (e.g. input).",
    "type": "function",
    "status": "optional"
  },
  "transformOut": {
    "doc": "Transforms the value before it gets forwarded to the form data object (context) or returned as the `onChange` value parameter. The first parameter is the internal value. Some fields do support a second parameter, like the SelectCountry, where the country object is given.",
    "type": "function",
    "status": "optional"
  },
  "label": {
    "doc": "Field label to show above / before the input feature.",
    "type": "string",
    "status": "optional"
  },
  "labelDescription": {
    "doc": "A more discreet text displayed beside the label (i.e for \"(optional)\").",
    "type": "string",
    "status": "optional"
  },
  "labelDescriptionInline": {
    "doc": "If true, the `labelDescription` will be displayed on the same line as the label.",
    "type": "boolean",
    "status": "optional"
  },
  "labelSrOnly": {
    "doc": "Use `true` to make the label only readable by screen readers.",
    "type": "boolean",
    "status": "optional"
  },
  "labelSize": {
    "doc": "Define the font-size of the label based on the [font-size](/uilib/typography/font-size/) table.",
    "type": ["medium", "large"],
    "status": "optional"
  },
  "help": {
    "doc": "Provide help content for the field using `title` and `content` as a string or React.Node. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
    "type": "object",
    "status": "optional"
  },
  "hideHelpButton": {
    "doc": "Set `true` when you render the inline help button outside the label (e.g. inside a checkbox suffix) so FieldBlock skips drawing the default label help button.",
    "type": "boolean",
    "status": "optional"
  },
  "layout": {
    "doc": "Layout for the label and input. Can be `horizontal` or `vertical`.",
    "type": "string",
    "status": "optional"
  },
  "layoutOptions": {
    "doc": "Use this to set additional options for the `horizontal` layout. E.g. `{ width: \"medium\" }`. You can also use a custom width `{number}rem`. Instead of a width, you can use a min/max width. E.g. `{ minWidth: \"6rem\", maxWidth: \"12rem\" }`.",
    "type": "object",
    "status": "optional"
  },
  "width": {
    "doc": "Will set the width for the whole block. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
    "type": ["string", "false"],
    "status": "optional"
  },
  "contentWidth": {
    "doc": "Will set the width for its contents. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
    "type": ["string", "false"],
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "Expiry.errorMonth": {
      "nb-NO": "{month} er ikke en gyldig måned.",
      "en-GB": "{month} is not a valid month.",
      "sv-SE": "{month} är inte en giltig månad.",
      "da-DK": "{month} er ikke en gyldig måned."
    },
    "Expiry.errorRequired": {
      "nb-NO": "Du må fylle inn en utløpsdato.",
      "en-GB": "You must enter an expiry date.",
      "sv-SE": "Du måste fylla i ett utgångsdatum.",
      "da-DK": "Du skal udfylde en udløbsdato."
    },
    "Expiry.errorYear": {
      "nb-NO": "{year} er ikke et gyldig år.",
      "en-GB": "{year} is not a valid year.",
      "sv-SE": "{year} är inte ett giltigt år.",
      "da-DK": "{year} er ikke et gyldigt år."
    },
    "Expiry.label": {
      "nb-NO": "Utløpsdato",
      "en-GB": "Expiry date",
      "sv-SE": "Utgångsdatum",
      "da-DK": "Udløbsdato"
    },
    "Field.errorPattern": {
      "nb-NO": "Verdien er ugyldig.",
      "en-GB": "The value is invalid.",
      "sv-SE": "Värdet är ogiltigt.",
      "da-DK": "Ugyldig værdi."
    },
    "Field.errorRequired": {
      "nb-NO": "Dette feltet må fylles ut.",
      "en-GB": "This field is required.",
      "sv-SE": "Detta fält måste fyllas i.",
      "da-DK": "Dette felt skal udfyldes."
    },
    "Field.errorSummary": {
      "nb-NO": "Feil som må rettes:",
      "en-GB": "Please correct the following errors:",
      "sv-SE": "Fel som måste åtgärdas:",
      "da-DK": "Felter der skal rettes:"
    },
    "Field.errorSummaryTitle": {
      "nb-NO": "Feil som må rettes",
      "en-GB": "Please correct the following errors",
      "sv-SE": "Fel som måste åtgärdas",
      "da-DK": "Felter der skal rettes"
    },
    "Field.optionalLabelSuffix": {
      "nb-NO": "(valgfritt)",
      "en-GB": "(optional)",
      "sv-SE": "(valfritt)",
      "da-DK": "(valgfrit)"
    },
    "Field.stateSummary": {
      "nb-NO": "Oppsummering:",
      "en-GB": "Summary:",
      "sv-SE": "Sammanfattning:",
      "da-DK": "Oversigt:"
    }
  }
}
```

## Events

```json
{
  "onChange": {
    "doc": "Will be called on value changes made by the user, with the new value as argument. When an `async` function is used, the corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label. You can return `{ success: 'saved' } as const` to show a success symbol, or an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const`. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",
    "type": "(value) => void",
    "status": "optional"
  },
  "onFocus": {
    "doc": "Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",
    "type": "(value) => void",
    "status": "optional"
  },
  "onBlur": {
    "doc": "Will be called when the component stop being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",
    "type": "(value) => void",
    "status": "optional"
  },
  "onStatusChange": {
    "doc": "Called whenever the status messages (info, warning or error) gets visible or changes. Receives the current `{ info, warning, error }` object.",
    "type": "({ info?, warning?, error? }: FieldStatus) => void",
    "status": "optional"
  }
}
```
