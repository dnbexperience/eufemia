---
title: 'Field.Currency'
description: '`Field.Currency` is a wrapper component for the input of numbers, with user experience tailored for currency values.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.285Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.Currency

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Currency />)
```

## Description

`Field.Currency` is a wrapper component for [number input](/uilib/extensions/forms/base-fields/Number), with user experience tailored for currency values.

It supports the HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute. Consider setting `autoComplete="transaction-amount"` if used to set the amount of a transaction, in a payment form.

There is a corresponding [Value.Currency](/uilib/extensions/forms/Value/Currency) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Currency)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/Currency)

## Demos

### Empty

```tsx
render(
  <Field.Currency onChange={(value) => console.log('onChange', value)} />
)
```

### Placeholder

```tsx
render(
  <Field.Currency
    placeholder="Enter a number"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Label

```tsx
render(
  <Field.Currency
    label="Amount"
    currencyDisplay="name"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Label and value

```tsx
render(
  <Field.Currency
    value={150000}
    currency="NOK"
    label="Amount"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Exclusive minimum and exclusive maximum

```tsx
render(
  <Field.Currency
    value={1000}
    label="Label text"
    allowNegative={false}
    required
    exclusiveMinimum={900}
    exclusiveMaximum={1000}
    validateInitially
  />
)
```

### With step controls

```tsx
render(
  <Field.Currency
    showStepControls
    label="Amount"
    minimum={500}
    maximum={2000}
    value={1000}
    step={100}
  />
)
```

## Locale

This field is using `NOK` when `locale` is `en-GB`.

```tsx
render(
  <Provider locale="en-GB">
    <Field.Currency value={-150000} align="right" />
  </Provider>
)
```

### With help

```tsx
render(
  <Field.Currency
    value={150000}
    currency="NOK"
    label="Amount"
    help={{
      title: 'Help is available',
      content:
        'Helping others, without expecting anything in return is what true self-worth is all about.',
    }}
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Disabled

```tsx
render(
  <Field.Currency
    value={25000000}
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />
)
```

### Error

```tsx
render(
  <Field.Currency
    value={12345678}
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  />
)
```

### Validation - Required

```tsx
render(
  <Field.Currency
    value={42}
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    required
  />
)
```

### With `Field.SelectCurrency`

This example demonstrates how to use `Field.Currency` together with `Field.SelectCurrency`.
It imitates a transaction, and therefore sets the HTML [autofill](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute for both fields, `transaction-currency` in `Field.SelectCurrency` and `transaction-amount` in `Field.Currency`.

```tsx
render(
  <Form.Handler onSubmit={console.log}>
    <Form.Card>
      <Flex.Horizontal>
        <Field.SelectCurrency
          label="Select a currency"
          path="/currency"
          value="EUR"
          autoComplete="transaction-currency"
        />
        <Field.Currency
          label="Amount"
          currency="/currency"
          autoComplete="transaction-amount"
        />
      </Flex.Horizontal>
    </Form.Card>
    <Form.SubmitButton text="Pay" />
  </Form.Handler>
)
```

## Properties

### Field-specific properties

```json
{
  "currency": {
    "doc": "Defines what format to show the currency value in I.e `NOK` or `USD`. You can also set a path as the value, e.g. `/myCurrencyPath`.",
    "type": "string",
    "status": "optional"
  },
  "currencyDisplay": {
    "doc": "Defines the currency display style. When set to `code`, the currency code is rendered before the amount. Defaults to `narrowSymbol`.",
    "type": ["code", "symbol", "narrowSymbol", "name", "false"],
    "status": "optional"
  },
  "decimalLimit": {
    "doc": "Max number of decimals. Values with more decimals will be rounded. Defaults to `12`.",
    "type": "number",
    "status": "optional"
  },
  "percent": {
    "doc": "Format a number as percentage.",
    "type": "boolean",
    "status": "optional"
  },
  "allowNegative": {
    "doc": "Whether or not to allow negative numbers. Defaults to `true`.",
    "type": "boolean",
    "status": "optional"
  },
  "disallowLeadingZeroes": {
    "doc": "Whether or not to allow leading zeroes during typing. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "minimum": {
    "doc": "Validation for inclusive minimum number value (greater than or equal). Defaults to `Number.MIN_SAFE_INTEGER`.",
    "type": "number",
    "status": "optional"
  },
  "maximum": {
    "doc": "Validation for inclusive maximum number value (less than or equal). Defaults to `Number.MAX_SAFE_INTEGER`.",
    "type": "number",
    "status": "optional"
  },
  "exclusiveMinimum": {
    "doc": "Validation for exclusive minimum number value (greater than).",
    "type": "number",
    "status": "optional"
  },
  "exclusiveMaximum": {
    "doc": "Validation for exclusive maximum number value (less than).",
    "type": "number",
    "status": "optional"
  },
  "multipleOf": {
    "doc": "Validation that requires the number to be a multiple of given value.",
    "type": "number",
    "status": "optional"
  },
  "width": {
    "doc": "`false` for no width (use browser default), `small`, `medium` or `large` for predefined standard widths, `stretch` for fill available width.",
    "type": ["string", "false"],
    "status": "optional"
  },
  "size": {
    "doc": "The sizes you can choose is `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).",
    "type": ["string", "number"],
    "status": "optional"
  },
  "align": {
    "doc": "Lateral alignment of contents of input field, one of `left` (default), `center`, or `right`.",
    "type": "string",
    "status": "optional"
  },
  "autoComplete": {
    "doc": "For HTML `autocomplete` attributes.",
    "type": ["on", "string"],
    "status": "optional"
  },
  "prefix": {
    "doc": "Text added before the value input.",
    "type": "string",
    "status": "optional"
  },
  "suffix": {
    "doc": "Text added after the value input.",
    "type": "string",
    "status": "optional"
  },
  "step": {
    "doc": "Determines step granularity when in/decreasing value input through step controls buttons or arrow keys. Defaults to `1`.",
    "type": "number",
    "status": "optional"
  },
  "startWith": {
    "doc": "When no `value` or `defaultValue` is given, start with a given value when in/decreasing value input through step controls buttons or arrow keys. Defaults to `null`.",
    "type": "number",
    "status": "optional"
  },
  "showStepControls": {
    "doc": "Show buttons that in/decreases value input by the step value.",
    "type": "boolean",
    "status": "optional"
  },
  "mask": {
    "doc": "An array or a function returning an array of regexes to use as a mask for the input. If not given, the input will not be masked.",
    "type": ["array", "function"],
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
    },
    "NumberField.errorExclusiveMaximum": {
      "nb-NO": "Verdien må være mindre enn {exclusiveMaximum}.",
      "en-GB": "The value must be less than {exclusiveMaximum}.",
      "sv-SE": "Värdet måste vara mindre än {exclusiveMaximum}.",
      "da-DK": "Værdien skal være mindre end {exclusiveMaximum}."
    },
    "NumberField.errorExclusiveMinimum": {
      "nb-NO": "Verdien må være større enn {exclusiveMinimum}.",
      "en-GB": "The value must be greater than {exclusiveMinimum}.",
      "sv-SE": "Värdet måste vara större än {exclusiveMinimum}.",
      "da-DK": "Værdien skal være større end {exclusiveMinimum}."
    },
    "NumberField.errorInteger": {
      "nb-NO": "Verdien må være et heltall (uten desimaler).",
      "en-GB": "The value must be an integer (no decimals).",
      "sv-SE": "Värdet måste vara ett heltal (utan decimaler).",
      "da-DK": "Værdien skal være et helt tal (uden decimaler)."
    },
    "NumberField.errorMaximum": {
      "nb-NO": "Verdien må maksimalt være {maximum}.",
      "en-GB": "The value must be a maximum of {maximum}.",
      "sv-SE": "Värdet får vara högst {maximum}.",
      "da-DK": "Værdien må højst være {maximum}."
    },
    "NumberField.errorMinimum": {
      "nb-NO": "Verdien må minst være {minimum}.",
      "en-GB": "The value must be at least {minimum}.",
      "sv-SE": "Värdet måste vara minst {minimum}.",
      "da-DK": "Værdien skal være mindst {minimum}."
    },
    "NumberField.errorMultipleOf": {
      "nb-NO": "Verdien må være et multiplum av {multipleOf}.",
      "en-GB": "The value must be a multiple of {multipleOf}.",
      "sv-SE": "Värdet måste vara en multipel av {multipleOf}.",
      "da-DK": "Indtast en værdi, der går op i {multipleOf}."
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
