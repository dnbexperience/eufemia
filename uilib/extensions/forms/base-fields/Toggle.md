---
title: 'Field.Toggle'
description: '`Field.Toggle` is a base component for allowing the user to toggle between two different values in the target data point.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.267Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.Toggle

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Toggle />)
```

## Description

`Field.Toggle` is a base component for allowing the user to toggle between two different values in the target data point.

Before using this component, ensure there is not a more specific [field component](/uilib/extensions/forms/feature-fields/) available that better suits your needs.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Toggle path="/myState" />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Toggle)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Toggle)

### Indeterminate checkbox

Here is a indeterminate state (partially checked) [working example](/uilib/extensions/forms/base-fields/Indeterminate/).

## Demos

### Value On

```tsx
render(
  <Field.Toggle
    valueOn="checked"
    valueOff="unchecked"
    variant="checkbox"
    label="Label text"
    value="checked"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Value Off

```tsx
render(
  <Field.Toggle
    valueOn="checked"
    valueOff="unchecked"
    variant="checkbox"
    label="Label text"
    value="unchecked"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Text On

```tsx
render(
  <Field.Toggle
    valueOn="checked"
    valueOff="unchecked"
    textOn="Text on"
    textOff="Text off"
    variant="checkbox"
    value="checked"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Text Off

```tsx
render(
  <Field.Toggle
    valueOn="checked"
    valueOff="unchecked"
    textOn="Text on"
    textOff="Text off"
    variant="checkbox"
    value="unchecked"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Disabled

```tsx
render(
  <Field.Toggle
    valueOn="checked"
    valueOff="unchecked"
    variant="checkbox"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />
)
```

### Info

```tsx
render(
  <Field.Toggle
    valueOn="checked"
    valueOff="unchecked"
    variant="checkbox"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    info="Useful information (?)"
  />
)
```

### Warning

```tsx
render(
  <Field.Toggle
    valueOn="checked"
    valueOff="unchecked"
    variant="checkbox"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    warning="I'm warning you..."
  />
)
```

### Error

```tsx
render(
  <Field.Toggle
    valueOn="checked"
    valueOff="unchecked"
    variant="checkbox"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  />
)
```

### Value types

#### Boolean value - On state

```tsx
render(
  <Field.Toggle
    valueOn={true}
    valueOff={false}
    variant="checkbox"
    label="Boolean value"
    value={true}
    onChange={(value) => console.log('onChange', value)}
  />
)
```

#### Boolean value - Off state

```tsx
render(
  <Field.Toggle
    valueOn={true}
    valueOff={false}
    variant="checkbox"
    label="Boolean value"
    value={false}
    onChange={(value) => console.log('onChange', value)}
  />
)
```

#### Number value - On state

```tsx
render(
  <Field.Toggle
    valueOn={100}
    valueOff={0}
    variant="checkbox"
    label="Number value"
    value={100}
    onChange={(value) => console.log('onChange', value)}
  />
)
```

#### Number value - Off state

```tsx
render(
  <Field.Toggle
    valueOn={100}
    valueOff={0}
    variant="checkbox"
    label="Number value"
    value={0}
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Variants

#### Switch

```tsx
render(
  <Field.Toggle
    valueOn="on"
    valueOff="off"
    variant="switch"
    label="Switch variant"
    value="on"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

#### Button

```tsx
render(
  <Field.Toggle
    valueOn="on"
    valueOff="off"
    variant="button"
    label="Toggle button variant"
    value="on"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

#### Buttons

```tsx
render(
  <Field.Toggle
    valueOn="on"
    valueOff="off"
    variant="buttons"
    label="Buttons variant"
    value="on"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

#### Buttons with help

```tsx
render(
  <Field.Toggle
    valueOn="on"
    valueOff="off"
    variant="buttons"
    label="Buttons variant"
    help={{
      title: 'Help title',
      content: 'Help content',
    }}
    value="on"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

#### Radio

```tsx
render(
  <Field.Toggle
    valueOn="on"
    valueOff="off"
    variant="radio"
    label="Radio variant"
    value="on"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

#### Radio with help

```tsx
render(
  <Field.Toggle
    valueOn="on"
    valueOff="off"
    variant="radio"
    label="Radio variant"
    help={{
      title: 'Help title',
      content: 'Help content',
    }}
    value="on"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

```tsx
Text above the toggle:
<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="buttons"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>
```

```tsx
Text above the toggle:
<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="radio"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>
```

#### Checkbox button

```tsx
render(
  <Field.Toggle
    valueOn="on"
    valueOff="off"
    variant="checkbox-button"
    label="Toggle checkbox variant"
    value="on"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

## Properties

### Field-specific properties

```json
{
  "valueOn": {
    "doc": "Source data value when the toggle is in the \"on-state\" (varies based on UI variant).",
    "type": ["string", "number", "boolean"],
    "status": "required"
  },
  "valueOff": {
    "doc": "Source data value when the toggle is in the \"off-state\".",
    "type": ["string", "number", "boolean"],
    "status": "required"
  },
  "textOn": {
    "doc": "Text to show in the UI when in the \"on-state\".",
    "type": "string",
    "status": "optional"
  },
  "textOff": {
    "doc": "Text to show in the UI when in the \"off-state\".",
    "type": "string",
    "status": "optional"
  },
  "size": {
    "doc": "The sizes you can choose is small (1.5rem), default (2rem), medium (2.5rem) and large (3rem) are supported component sizes. Defaults to default / null. Also, if you define a number like size=\"2\" then it will be forwarded as the input element attribute. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).",
    "type": "string",
    "status": "optional"
  },
  "variant": {
    "doc": "Choice of input feature. Can be: `checkbox`, `button`, `checkbox-button` or `buttons`.",
    "type": "string",
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
    "ToggleField.no": {
      "nb-NO": "Nei",
      "en-GB": "No",
      "sv-SE": "Nej",
      "da-DK": "Nej"
    },
    "ToggleField.yes": {
      "nb-NO": "Ja",
      "en-GB": "Yes",
      "sv-SE": "Ja",
      "da-DK": "Ja"
    }
  }
}
```

## Events

### Field-specific events

```json
{
  "onClick": {
    "doc": "Will be called on click.",
    "type": "(value: unknown, { event: ClickEvent, preventDefault: () => void }) => void",
    "status": "optional"
  }
}
```

### General events

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
