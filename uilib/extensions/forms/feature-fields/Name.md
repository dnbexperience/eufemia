---
title: 'Field.Name'
description: '`Field.Name` is a wrapper component for the input of strings, with user experience tailored for first name, last name and company names.'
version: 11.8.1
generatedAt: 2026-06-29T11:30:04.401Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.Name

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Name />)
render(<Field.Name.First />)
render(<Field.Name.Last />)
render(<Field.Name.Company />)
```

## Description

`Field.Name` is a wrapper component for the [input of strings](/uilib/extensions/forms/base-fields/String), with user experience tailored for first name, last name and company names.

There is a corresponding [Value.Name](/uilib/extensions/forms/Value/Name) component.

```jsx
import { Field, Form } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Form.Handler>
      <Field.Name />
      <Field.Name.First value="Nora" />
      <Field.Name.Last value="Mørk" />
      <Field.Name.Company value="DNB" />
    </Form.Handler>
  )
}
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Name)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/Name)

### Sources

- [Lov om personnavn (navneloven)](https://lovdata.no/dokument/NL/lov/2002-06-07-19)
- [Krav til foretaksnavn](https://lovdata.no/lov/1985-06-21-79/§2-1)

## Characteristics

### Allowed characters

- **`Field.Name.First` and `Field.Name.Last`**: Only letters, hyphens, and spaces are allowed.
- **`Field.Name.Company`**: Letters, numbers, punctuation marks, spaces, and dots are allowed.

### Behavior

- Trailing spaces are automatically removed.
- The HTML `autocomplete` attribute is automatically set:
  - `name` for `Field.Name`
  - `given-name` for `Field.Name.First`
  - `family-name` for `Field.Name.Last`
  - `organization` for `Field.Name.Company`

## Validation rules

All name fields have the following validation rules:

- **Minimum length**:
  - For `Field.Name.First` and `Field.Name.Last`: Names must be at least 1 character long.
  - For `Field.Name.Company`: Company names must be at least 3 characters long.
- **Pattern validation**:
  - For `Field.Name.First` and `Field.Name.Last`: Names must start and end with a letter, and cannot contain consecutive hyphens or spaces. Only letters, spaces, and hyphens are allowed.
  - For `Field.Name.Company`: Must start and end with a letter or number, and cannot contain consecutive hyphens, spaces, or dots. Letters, numbers, punctuation marks, spaces, and dots are allowed in between.

The validation happens on blur, internally using the `onBlurValidator` [property](/uilib/extensions/forms/feature-fields/Name/properties/#general-properties).

**Note**: The validation patterns are tailored to Norwegian name and company name requirements. If you need support for additional characters or different validation rules, you can extend the validation using the `onBlurValidator` property. See the [Validators](#validators) section below for more information.

## Validators

### Internal validators exposed

`Field.Name` and `Field.Name.Company` expose validators through their `onBlurValidator` property:

- **`nameValidator`**: Validates names for `Field.Name`, `Field.Name.First`, and `Field.Name.Last`. It checks that the name:
  - Is at least 1 character long.
  - Matches the name pattern (starts and ends with a letter, no consecutive hyphens or spaces).

- **`companyValidator`**: Validates company names for `Field.Name.Company`. It checks that the company name:
  - Is at least 3 characters long (default, can be customized via `minLength` property).
  - Matches the company pattern (starts and ends with a letter or number, no consecutive hyphens, spaces, or dots).

You can extend the validation by providing your own `onBlurValidator` function. Access the internal validator through the `validators` parameter and combine it with your custom validation. This allows you to add additional validation rules while keeping the default validation intact.

```tsx
import { Field, Validator } from '@dnb/eufemia/extensions/forms'
import type { CompanyNameValidator } from '@dnb/eufemia/extensions/forms/Field/Name'

// Extend validation to require company names to contain "Corp"
const myValidator: CompanyNameValidator = (value, { validators }) => {
  const { companyValidator } = validators

  const customValidator: Validator<string> = (value) => {
    if (value && !value.includes('Corp')) {
      return new Error('Company name must contain "Corp"')
    }
  }

  // Keep the built-in company validation along with the custom rule.
  return [companyValidator, customValidator]
}

render(<Field.Name.Company onBlurValidator={myValidator} />)
```


## Demos

### First name


```tsx
render(<Field.Name.First value="Nora" onChange={value => console.log('onChange', value)} />)
```


### Last name


```tsx
render(<Field.Name.Last value="Mørk" onChange={value => console.log('onChange', value)} />)
```


### Company name


```tsx
render(<Field.Name.Company value="DNB" onChange={value => console.log('onChange', value)} />)
```


### Placeholder


```tsx
render(<Field.Name.Last placeholder="Custom placeholder" onChange={value => console.log('onChange', value)} />)
```


### Field composition


```tsx
render(<Field.Composition width="large">
        <Field.Name.First value="Nora" onChange={value => console.log('onChange', value)} />
        <Field.Name.Last value="Mørk" onChange={value => console.log('onChange', value)} />
      </Field.Composition>)
```


### Data Context


```tsx
render(<Form.Handler defaultData={{
  firstName: 'Nora',
  lastName: 'Mørk'
}} onChange={value => console.log('onChange', value)}>
        <Flex.Stack>
          <Field.Name.First path="/firstName" />
          <Field.Name.Last path="/lastName" />
        </Flex.Stack>
      </Form.Handler>)
```


### With help


```tsx
render(<Field.Name.First value="Nora" help={{
  title: 'Help is available',
  content: 'Use your gifts to teach and help others. Acknowledge them as gifts (even if only in your mind). Take some time to list your strengths as well as the ways in which you could share them with the world around you and how that truly is a gift to others.'
}} onChange={value => console.log('onChange', value)} />)
```


### Invalid syntax


```tsx
render(<Field.Name.First value="Invalid @ syntax" onChange={value => console.log('onChange', value)} validateInitially />)
```


### Error message


```tsx
render(<Field.Name.First value="Nora" onChange={value => console.log('onChange', value)} error={new Error('This is what is wrong...')} />)
```


### Validation - Required


```tsx
render(<Field.Name.First onChange={value => console.log('onChange', value)} required validateInitially />)
```

## Properties

### Field-specific properties


```json
{
  "props": {
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
      "doc": "When set to `true`, it will capitalize the first letter of every word, transforming the rest to lower case.",
      "type": "boolean",
      "status": "optional"
    },
    "trim": {
      "doc": "When `true`, it will trim leading and trailing whitespaces on blur, triggering `onChange` if the value changes.",
      "type": "boolean",
      "status": "optional"
    },
    "inputMode": {
      "doc": "Define an [inputmode](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode).",
      "type": [
        "\"none\"",
        "\"text\"",
        "\"tel\"",
        "\"url\"",
        "\"email\"",
        "\"numeric\"",
        "\"decimal\"",
        "\"search\""
      ],
      "status": "optional"
    },
    "autoComplete": {
      "doc": "For HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attributes.",
      "type": [
        "\"on\"",
        "string"
      ],
      "status": "optional"
    },
    "minLength": {
      "doc": "Validation for minimum length of the text (number of characters). Defaults to `1`.",
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
      "type": [
        "string",
        "false"
      ],
      "status": "optional"
    },
    "size": {
      "doc": "The sizes you can choose are `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem). Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).",
      "type": [
        "string",
        "number"
      ],
      "status": "optional"
    },
    "align": {
      "doc": "Defines the text alignment of the input. Can be `left`, `right` or `center`. Defaults to `left`.",
      "type": [
        "\"left\"",
        "\"center\"",
        "\"right\""
      ],
      "status": "optional"
    },
    "selectAll": {
      "doc": "If set to `true`, then the whole input value gets selected on the entry focus. A second click will place the cursor on the wanted position.",
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
    "autoResizeMaxRows": {
      "doc": "To be used together with `multiline`. Set how many rows of text can be shown at max. Defaults to `6`.",
      "type": "number",
      "status": "optional"
    },
    "characterCounter": {
      "doc": "To be used together with `multiline`. Use a number to define the displayed max length e.g. `40` or `{ max: 40, variant: 'down' }`.",
      "type": [
        "number",
        "object"
      ],
      "status": "optional"
    },
    "autoResize": {
      "doc": "To be used together with `multiline`. Set true to expand when writing longer texts. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "inputClassName": {
      "doc": "Class name set on the `<input>` DOM element.",
      "type": "string",
      "status": "optional"
    },
    "ref": {
      "doc": "By providing a `React.Ref` we can get the internally used input element (DOM).",
      "type": "React.RefObject",
      "status": "optional"
    },
    "submitElement": {
      "doc": "Accepts a React element which will show up where the \"submit button\" would do.",
      "type": "React.Element",
      "status": "optional"
    }
  }
}
```


### General properties


```json
{
  "props": {
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
      "doc": "Info message shown below / after the field by default. Use `statusPosition=\"above\"` to show status messages above the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`.",
      "type": [
        "React.ReactNode",
        "Array<React.ReactNode>",
        "function"
      ],
      "status": "optional"
    },
    "warning": {
      "doc": "Warning message shown below / after the field by default. Use `statusPosition=\"above\"` to show status messages above the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`.",
      "type": [
        "React.ReactNode",
        "Array<React.ReactNode>",
        "function"
      ],
      "status": "optional"
    },
    "error": {
      "doc": "Error message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`.",
      "type": [
        "Error",
        "FormError",
        "Array<Error | FormError>",
        "function"
      ],
      "status": "optional"
    },
    "disabled": {
      "doc": "Set `true` to show the field but without the possibility of changing the value.",
      "type": "boolean",
      "status": "optional"
    },
    "emptyValue": {
      "doc": "The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",
      "type": [
        "{valueType}",
        "undefined"
      ],
      "status": "optional"
    },
    "required": {
      "doc": "When set to `true`, the field will give an error if the value fails the required validation. When set to `false`, the field will not be required, but will add a \"(optional)\" suffix to the label.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSuffix": {
      "doc": "Will append an additional text to the label, like \"(optional)\". When using `inheritLabel`, the suffix will not be inherited. **NB:** The visual appearance of the `labelSuffix` may change in the future.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "schema": {
      "doc": "Custom JSON Schema for validating the value.",
      "type": "object",
      "status": "optional"
    },
    "validateInitially": {
      "doc": "Set to `true` to show validation based errors initially (from given value-property or source data) before the user interacts with the field.",
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
      "doc": "Custom error messages for each type of error, overriding default messages. The messages can be a `React.ReactNode` or a string.",
      "type": "object",
      "status": "optional"
    },
    "onChangeValidator": {
      "doc": "Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered on every change done by the user, and runs during form submit by default. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Use `withValidatorOptions(validator, { runOnSubmit: 'never' })` to keep it from running during form submit, or `'when-changed'` to run it only when the value has changed since the validator last ran. Object and array values are compared by reference.",
      "type": "function",
      "status": "optional"
    },
    "onBlurValidator": {
      "doc": "Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown), and runs during form submit by default. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Use `withValidatorOptions(validator, { runOnSubmit: 'never' })` to keep it from running during form submit, or `'when-changed'` to run it only when the value has changed since the validator last ran. Object and array values are compared by reference.",
      "type": "function",
      "status": "optional"
    },
    "transformIn": {
      "doc": "Transforms the `value` before it's displayed in the field (e.g. input).",
      "type": "function",
      "status": "optional"
    },
    "transformOut": {
      "doc": "Transforms the value before it gets forwarded to the form data object (context) or returned as the `onChange` value parameter. The first parameter is the internal value. Some fields do support a second parameter, like the SelectCountry, where the country object is given.",
      "type": "function",
      "status": "optional"
    },
    "label": {
      "doc": "Label text displayed above the field. Most fields already have a default label, so check the field translations for an existing label entry. Only set `label` when you need to override the default.",
      "type": "string",
      "status": "optional"
    },
    "labelDescription": {
      "doc": "A more discreet text displayed beside the label (e.g. \"(optional)\").",
      "type": "string",
      "status": "optional"
    },
    "labelDescriptionInline": {
      "doc": "If `true`, the `labelDescription` will be displayed on the same line as the label.",
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
      "type": [
        "\"medium\"",
        "\"large\""
      ],
      "status": "optional"
    },
    "help": {
      "doc": "Provide help content for the field using `title` and `content` as a string or `React.ReactNode`. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
      "type": "object",
      "status": "optional"
    },
    "hideHelpButton": {
      "doc": "Set `true` when you render the inline help button outside the label (e.g. inside a checkbox suffix) so FieldBlock skips drawing the default label help button.",
      "type": "boolean",
      "status": "optional"
    },
    "statusPosition": {
      "doc": "Controls where status messages (`error`, `warning`, `information`) are visually shown. Use `below` (default) or `above`.",
      "type": [
        "\"below\"",
        "\"above\""
      ],
      "status": "optional"
    },
    "layout": {
      "doc": "Layout for the label and input. Can be `horizontal` or `vertical`.",
      "type": [
        "\"horizontal\"",
        "\"vertical\""
      ],
      "status": "optional"
    },
    "layoutOptions": {
      "doc": "Use this to set additional options for the `horizontal` layout, e.g. `{ width: \"medium\" }`. You can also use a custom width `{number}rem`. Instead of a width, you can use a min/max width, e.g. `{ minWidth: \"6rem\", maxWidth: \"12rem\" }`.",
      "type": "object",
      "status": "optional"
    },
    "width": {
      "doc": "Will set the width for the whole block. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
      "type": [
        "string",
        "false"
      ],
      "status": "optional"
    },
    "contentWidth": {
      "doc": "Will set the width for its contents. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
      "type": [
        "string",
        "false"
      ],
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  },
  "omit": [
    "onBlurValidator"
  ]
}
```


## Translations


```json
{
  "locales": [
    "da-DK",
    "en-GB",
    "nb-NO",
    "sv-SE"
  ],
  "entries": {
    "CompanyName.errorRequired": {
      "nb-NO": "Du må fylle inn firmanavn.",
      "en-GB": "You must enter a company name.",
      "sv-SE": "Du måste fylla i företagsnamn.",
      "da-DK": "Du skal udfylde firmanavn."
    },
    "CompanyName.label": {
      "nb-NO": "Firmanavn",
      "en-GB": "Company name",
      "sv-SE": "Företagsnamn",
      "da-DK": "Firmanavn"
    },
    "Field.errorPattern": {
      "nb-NO": "Du må skrive inn en gyldig verdi.",
      "en-GB": "You must enter a valid value.",
      "sv-SE": "Du måste ange ett giltigt värde.",
      "da-DK": "Du skal indtaste en gyldig værdi."
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
    "FirstName.errorPattern": {
      "nb-NO": "Du må skrive inn et gyldig fornavn. Kun bokstaver, bindestrek og mellomrom er tillatt.",
      "en-GB": "You must enter a valid first name. Only letters, hyphens and spaces are allowed.",
      "sv-SE": "Du måste ange ett giltigt förnamn. Endast bokstäver, bindestreck och mellanslag är tillåtna.",
      "da-DK": "Du skal indtaste et gyldigt fornavn. Kun bogstaver, bindestreger og mellemrum er tilladt."
    },
    "FirstName.errorRequired": {
      "nb-NO": "Du må fylle inn fornavn.",
      "en-GB": "You must enter a given name (first name).",
      "sv-SE": "Du måste fylla i förnamn.",
      "da-DK": "Du skal udfylde fornavn."
    },
    "FirstName.label": {
      "nb-NO": "Fornavn",
      "en-GB": "Given name",
      "sv-SE": "Förnamn",
      "da-DK": "Fornavn"
    },
    "LastName.errorPattern": {
      "nb-NO": "Du må skrive inn et gyldig etternavn. Kun bokstaver, bindestrek og mellomrom er tillatt.",
      "en-GB": "You must enter a valid surname. Only letters, hyphens and spaces are allowed.",
      "sv-SE": "Du måste ange ett giltigt efternamn. Endast bokstäver, bindestreck och mellanslag är tillåtna.",
      "da-DK": "Du skal indtaste et gyldigt efternavn. Kun bogstaver, bindestreger og mellemrum er tilladt."
    },
    "LastName.errorRequired": {
      "nb-NO": "Du må fylle inn etternavn.",
      "en-GB": "You must enter a surname (last name).",
      "sv-SE": "Du måste fylla i efternamn.",
      "da-DK": "Du skal udfylde efternavn."
    },
    "LastName.label": {
      "nb-NO": "Etternavn",
      "en-GB": "Surname",
      "sv-SE": "Efternamn",
      "da-DK": "Efternavn"
    },
    "StringField.errorMinLength": {
      "nb-NO": "Kan ikke være kortere enn {minLength} tegn.",
      "en-GB": "Cannot be shorter than {minLength} characters.",
      "sv-SE": "Kan inte vara kortare än {minLength} tecken.",
      "da-DK": "Må ikke være kortere end {minLength} tegn."
    }
  }
}
```

## Events

### Field-specific events


```json
{
  "props": {
    "onBlurValidator": {
      "doc": "Custom validator function that is triggered when the user leaves a field (e.g., blurring a text input). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Defaults to name validation, using `nameValidator`. For `Field.Name.Company` it uses `companyValidator`. Can be disabled using `false`.",
      "type": "function",
      "status": "optional"
    }
  }
}
```


### General events


```json
{
  "props": {
    "onChange": {
      "doc": "Will be called on value changes made by the user, with the new value as argument. When an `async` function is used, the corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label. You can return `{ success: 'saved' } as const` to show a success symbol, or an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const`. The second parameter is an object that e.g. contains `properties` (all given `Field.*` properties).",
      "type": "(value) => void",
      "status": "optional"
    },
    "onFocus": {
      "doc": "Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `properties` (all given `Field.*` properties).",
      "type": "(value) => void",
      "status": "optional"
    },
    "onBlur": {
      "doc": "Will be called when the component stops being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `properties` (all given `Field.*` properties).",
      "type": "(value) => void",
      "status": "optional"
    },
    "onStatusChange": {
      "doc": "Called whenever the status messages (info, warning or error) gets visible or changes. Receives the current `{ info, warning, error }` object.",
      "type": "({ info?, warning?, error? }: FieldStatus) => void",
      "status": "optional"
    }
  }
}
```
