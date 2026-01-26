---
title: 'Field.Address'
description: '`Field.Address` is a wrapper component for the input of strings, with user experience tailored for postal and street addresses.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.283Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.Address

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Address.Postal />)
render(<Field.Address.Street />)
```

## Description

`Field.Address` is a wrapper component for the [input of strings](/uilib/extensions/forms/base-fields/String), with user experience tailored for postal and street addresses.

There is a corresponding [Value.Address](/uilib/extensions/forms/Value/Address) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Address)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/Address)

## Characteristics

- If the user enters an address with a space, the space is removed.
- `autocomplete` is by default set to `street-address`, but can be customized to using a grouping identifier like so `billing street-address`, see [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#grouping_identifier).
- `inputmode` is by default set to `text`.

## Postal address

Is for locations for receiving mail, for people or businesses. This can also be used as a postbox address.

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Address.Postal />)
```

## Street address

Is for physical locations of people or businesses.

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Address.Street />)
```

## Demos

### Postal address

```tsx
render(
  <Field.Address.Postal
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Street address

```tsx
render(
  <Field.Address.Street
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Placeholder

```tsx
render(
  <Field.Address.Postal
    placeholder="Enter address..."
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Label

```tsx
render(
  <Field.Address.Postal
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Label and value

```tsx
render(
  <Field.Address.Postal
    label="Label text"
    value="Dronning Eufemias gate 30"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### With help

```tsx
render(
  <Field.Address.Postal
    label="Label text"
    value="Dronning Eufemias gate 30"
    help={{
      title: 'Help is available',
      content:
        'Use your gifts to teach and help others. Acknowledge them as gifts (even if only in your mind). Take some time to list your strengths as well as the ways in which you could share them with the world around you and how that truly is a gift to others.',
    }}
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Disabled

```tsx
render(
  <Field.Address.Postal
    value="Dronning Eufemias gate 30"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />
)
```

### Error message

```tsx
render(
  <Field.Address.Postal
    value="Dronning Eufemias gate X"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  />
)
```

### Validation - Required

```tsx
render(
  <Field.Address.Postal
    value="Dronning Eufemias gate 30"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    required
  />
)
```

## Properties

### Field-specific properties

```json
{
  "element": {
    "doc": "Define the type of element. Defaults to `Field.String`.",
    "type": "React.Element",
    "status": "optional"
  },
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
    "PostalAddress.errorPattern": {
      "nb-NO": "Ugyldig postadresse. Skriv inn en postadresse.",
      "en-GB": "Invalid postal address. Enter a valid postal address.",
      "sv-SE": "Ogiltig postadress. Ange en postadress.",
      "da-DK": "Ugyldig postadresse. Indtast en postadresse."
    },
    "PostalAddress.errorRequired": {
      "nb-NO": "Du må fylle inn en postadresse.",
      "en-GB": "You must enter a postal address.",
      "sv-SE": "Du måste fylla i en postadress.",
      "da-DK": "Du skal udfylde en postadresse."
    },
    "PostalAddress.label": {
      "nb-NO": "Postadresse",
      "en-GB": "Postal address",
      "sv-SE": "Postadress",
      "da-DK": "Postadresse"
    },
    "StreetAddress.errorPattern": {
      "nb-NO": "Ugyldig gateaddresse. Skriv inn en gateaddresse.",
      "en-GB": "Invalid street address. Enter a valid street address.",
      "sv-SE": "Ogiltig gatuadress. Ange en gatuadress.",
      "da-DK": "Ugyldig gadeadresse. Indtast en gadeadresse."
    },
    "StreetAddress.errorRequired": {
      "nb-NO": "Du må fylle inn en gateaddresse.",
      "en-GB": "You must enter a street address.",
      "sv-SE": "Du måste fylla i en gatuadress.",
      "da-DK": "Du skal udfylde en gadeadresse."
    },
    "StreetAddress.label": {
      "nb-NO": "Gateadresse",
      "en-GB": "Street address",
      "sv-SE": "Gatuadress",
      "da-DK": "Gadeadresse"
    },
    "StreetAddress.suggestionPlaceholder": {
      "nb-NO": "Skriv inn adressen",
      "en-GB": "Enter an address",
      "sv-SE": "Ange en adress",
      "da-DK": "Indtast en adresse"
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
