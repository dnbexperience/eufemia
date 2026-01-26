---
title: 'Field.NationalIdentityNumber'
description: '`Field.NationalIdentityNumber` is a wrapper component for the input of strings, with user experience tailored for national identity number values.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.290Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.NationalIdentityNumber

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
  { validators }
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
  <Field.NationalIdentityNumber onBlurValidator={above18YearsValidator} />
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
  />
)
```

### Omit mask

```tsx
render(
  <Field.NationalIdentityNumber
    onChange={(value) => console.log('onChange', value)}
    omitMask
  />
)
```

### Placeholder

```tsx
render(
  <Field.NationalIdentityNumber
    placeholder="Enter 11 digits..."
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Label

```tsx
render(
  <Field.NationalIdentityNumber
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Label and value

```tsx
render(
  <Field.NationalIdentityNumber
    label="Label text"
    value="01017501234"
    onChange={(value) => console.log('onChange', value)}
  />
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
  />
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
  />
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
  />
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
  />
)
```

### Validation - Norwegian national identity numbers

It validates [Norwegian national identity numbers(fnr)](https://www.skatteetaten.no/en/person/national-registry/identitetsnummer/fodselsnummer/) using the [fnrvalidator](https://github.com/navikt/fnrvalidator).

Below is an example of the error message displayed when there's an invalid Norwegian national identity number(fnr):

```tsx
render(
  <Field.NationalIdentityNumber value="29020112345" validateInitially />
)
```

### Validation - D numbers

It validates [D numbers](https://www.skatteetaten.no/en/person/national-registry/identitetsnummer/d-nummer/) using the [fnrvalidator](https://github.com/navikt/fnrvalidator).

Below is an example of the error message displayed when there's an invalid D number(a D number has its first number in the identification number increased by 4):

```tsx
render(
  <Field.NationalIdentityNumber value="69020112345" validateInitially />
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
  />
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
  { validators }
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
  />
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
  { validators }
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
  />
)
```

### Validate only national identity numbers(fnr) above 18 years old

```tsx
const adultValidator = createMinimumAgeValidator(18)
// Keep the default validator while ensuring an FNR-based age check.
// Keep the default validator while ensuring an FNR-based age check.
const myFnrAdultValidator: NationalIdentityNumberValidator = (
  value,
  { validators }
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
  />
)
```

## Properties

### Field-specific properties

```json
{
  "multiline": {
    "doc": "True to be able to write in multiple lines (switching from input-element to textarea-element).",
    "type": "boolean",
    "status": "optional"
  },
  "leftIcon": {
    "doc": "For icon at the left side of the text input. Only one of `leftIcon` or `rightIcon` can be used at the same time.",
    "type": "string",
    "status": "optional"
  },
  "rightIcon": {
    "doc": "For icon at the right side of the text input. Only one of `leftIcon` or `rightIcon` can be used at the same time.",
    "type": "string",
    "status": "optional"
  },
  "capitalize": {
    "doc": "When set to true, it will capitalize the first letter of every word, transforming the rest to lower case.",
    "type": "boolean",
    "status": "optional"
  },
  "trim": {
    "doc": "When true, it will trim leading and trailing whitespaces on blur, triggering `onChange` if the value changes.",
    "type": "boolean",
    "status": "optional"
  },
  "inputMode": {
    "doc": "Define an [inputmode](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode).",
    "type": "string",
    "status": "optional"
  },
  "autoComplete": {
    "doc": "For HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attributes.",
    "type": ["on", "string"],
    "status": "optional"
  },
  "minLength": {
    "doc": "Validation for minimum length of the text (number of characters).",
    "type": "number",
    "status": "optional"
  },
  "maxLength": {
    "doc": "Validation for maximum length of the text (number of characters).",
    "type": "number",
    "status": "optional"
  },
  "pattern": {
    "doc": "Validation based on regex pattern.",
    "type": "string",
    "status": "optional"
  },
  "width": {
    "doc": "`false` for no width (use browser default), `small`, `medium` or `large` for predefined standard widths, `stretch` to fill available width.",
    "type": ["string", "false"],
    "status": "optional"
  },
  "size": {
    "doc": "The sizes you can choose is `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).",
    "type": ["string", "number"],
    "status": "optional"
  },
  "align": {
    "doc": "Defines the text alignment of the input. Can be `left`, `right` or `center`. Defaults to `left`.",
    "type": "string",
    "status": "optional"
  },
  "selectall": {
    "doc": "If set to `true`, then the whole input value gets selected on the entry focus. A second click will place the cursor on the wanted position.",
    "type": "boolean",
    "status": "optional"
  },
  "clear": {
    "doc": "If set to `true`, then a clear button will be shown which lets the user clear any given input value.",
    "type": "boolean",
    "status": "optional"
  },
  "keepPlaceholder": {
    "doc": "Set to `true` in case the `placeholder` has to be kept during focus. By default, the placeholder disappears on focus.",
    "type": "boolean",
    "status": "optional"
  },
  "rows": {
    "doc": "To be used together with `multiline`. Set how many rows of text can be shown by default. Defaults to `2`.",
    "type": "number",
    "status": "optional"
  },
  "autoresizeMaxRows": {
    "doc": "To be used together with `multiline`. Set how many rows of text can be shown at max. Defaults to `6`.",
    "type": "number",
    "status": "optional"
  },
  "characterCounter": {
    "doc": "To be used together with `multiline`. Use a number to define the displayed max length e.g. `40` or `{ max: 40, variant: 'down' }`.",
    "type": ["number", "object"],
    "status": "optional"
  },
  "autoresize": {
    "doc": "To be used together with `multiline`. Set true to expand when writing longer texts. Defaults to `true`.",
    "type": "boolean",
    "status": "optional"
  },
  "inputClassName": {
    "doc": "Class name set on the <input> DOM element.",
    "type": "string",
    "status": "optional"
  },
  "innerRef": {
    "doc": "By providing a React.Ref we can get the internally used input element (DOM).",
    "type": "React.RefObject",
    "status": "optional"
  },
  "submitElement": {
    "doc": "Accepts a React element which will show up like the \"submit button\" would do on type=\"search\".",
    "type": "React.Element",
    "status": "optional"
  },
  "validate": {
    "doc": "Using this prop you can disable the default validation.",
    "type": "boolean",
    "status": "optional"
  },
  "onBlurValidator": {
    "doc": "Custom validator function that is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Defaults to validation of the identification number(national identity numbers and D numbers), using `dnrAndFnrValidator`. Can be disabled using `false`.",
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
    "NationalIdentityNumber.errorDnr": {
      "nb-NO": "Ugyldig d-nummer.",
      "en-GB": "Invalid D number.",
      "sv-SE": "Ogiltigt d-nummer.",
      "da-DK": "Ugyldigt d-nummer."
    },
    "NationalIdentityNumber.errorDnrLength": {
      "nb-NO": "Ugyldig d-nummer. Skriv inn et gyldig d-nummer med 11 siffer.",
      "en-GB": "Invalid D number. Enter a valid d-number with 11 digits.",
      "sv-SE": "Ogiltigt d-nummer. Ange ett giltigt d-nummer med 11 siffror.",
      "da-DK": "Ugyldigt d-nummer. Indtast et gyldigt d-nummer med 11 cifre."
    },
    "NationalIdentityNumber.errorFnr": {
      "nb-NO": "Ugyldig fødselsnummer.",
      "en-GB": "Invalid national identity number.",
      "sv-SE": "Ogiltigt födselsnummer.",
      "da-DK": "Ugyldigt fødselsnummer."
    },
    "NationalIdentityNumber.errorFnrLength": {
      "nb-NO": "Ugyldig fødselsnummer. Skriv inn et gyldig fødselsnummer med 11 siffer.",
      "en-GB": "Invalid national identity number. Enter a valid national identity number with 11 digits.",
      "sv-SE": "Ogiltigt födselsnummer. Ange ett giltigt födselsnummer med 11 siffror.",
      "da-DK": "Ugyldigt fødselsnummer. Indtast et gyldigt fødselsnummer med 11 cifre."
    },
    "NationalIdentityNumber.errorMinimumAgeValidator": {
      "nb-NO": "Må være minst {age} år.",
      "en-GB": "Must be at least {age} years of age.",
      "sv-SE": "Måste vara minst {age} år.",
      "da-DK": "Skal være mindst {age} år."
    },
    "NationalIdentityNumber.errorMinimumAgeValidatorLength": {
      "nb-NO": "Ugyldig fødselsdato. Skriv inn en gyldig fødselsdato (inkl. århundresiffer) med 7 siffer.",
      "en-GB": "Invalid birth of date. Enter a valid birth of date (incl. century digit) with 7 digits.",
      "sv-SE": "Ogiltigt födelsedatum. Ange ett giltigt födelsedatum (inkl. århundradessiffra) med 7 siffror.",
      "da-DK": "Ugyldig fødselsdato. Indtast en gyldig fødselsdato (inkl. århundredetal) med 7 cifre."
    },
    "NationalIdentityNumber.errorRequired": {
      "nb-NO": "Du må fylle inn et fødselsnummer.",
      "en-GB": "You must enter a national identity number.",
      "sv-SE": "Du måste fylla i ett födselsnummer.",
      "da-DK": "Du skal udfylde et fødselsnummer."
    },
    "NationalIdentityNumber.label": {
      "nb-NO": "Fødselsnummer (11 siffer)",
      "en-GB": "National identity number (11 digits)",
      "sv-SE": "Norsk \"fødselsnummer\" (11 siffror)",
      "da-DK": "Norsk fødselsnummer (11 cifre)"
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
