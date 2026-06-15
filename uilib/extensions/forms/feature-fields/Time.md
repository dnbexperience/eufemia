---
title: 'Field.Time'
description: '`Field.Time` is a wrapper component for the input of strings, with user experience tailored for time values (hours and minutes, optionally seconds).'
version: 11.6.1
generatedAt: 2026-06-15T12:17:01.922Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.Time

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Time />)
```

## Description

`Field.Time` is a wrapper component for [string input](/uilib/extensions/forms/base-fields/String), with user experience tailored for time input (hours, minutes and seconds).

It uses a segmented input with spin buttons, allowing users to input hours (0–23), minutes (0–59), and optionally seconds (0–59) with the `showSeconds` prop.

The value format is `"HH:mm"` (e.g. `"14:30"`), or `"HH:mm:ss"` (e.g. `"14:30:45"`) when `showSeconds` is enabled.

There is a corresponding [Value.Time](/uilib/extensions/forms/Value/Time) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Time)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/Time)

## Validators

### Internal validators exposed

`Field.Time` exposes the `timeValidator` validator through its `onBlurValidator` property. Take a look at [this demo](/uilib/extensions/forms/feature-fields/Time/demos/#extend-validation-with-custom-validation-function).
The `timeValidator` validator validates invalid hours, minutes, and seconds.

### Extending validators

Combine the exported validator with your own rules to keep the built-in checks and add custom guards. Import `TimeValidator` to type your validator and the shared `validators`.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
import type { TimeValidator } from '@dnb/eufemia/extensions/forms/Field/Time'

const myValidator: TimeValidator = (value, { validators }) => {
  const { timeValidator } = validators ?? {}
  const noMidnight = (value: string) => {
    if (value === '00:00') {
      return new Error('Midnight is not allowed')
    }
  }

  return [timeValidator, noMidnight]
}

render(<Field.Time onBlurValidator={myValidator} />)
```


## Demos

### Empty


```tsx
render(<Field.Time onChange={time => console.log('onChange', time)} />)
```


### Label


```tsx
render(<Field.Time value="14:30" label="Label text" onChange={time => console.log('onChange', time)} />)
```


### With a horizontal layout


```tsx
render(<Field.Time value="14:30" layout="horizontal" layoutOptions={{
  width: 'medium'
}} />)
```


### With help


```tsx
render(<Field.Time label="Label text" help={{
  title: 'Help is available',
  content: 'Enter the time using hours and minutes.'
}} onChange={time => console.log('onChange', time)} />)
```


### Disabled


```tsx
render(<Field.Time value="14:30" label="Label text" onChange={time => console.log('onChange', time)} disabled />)
```


### Error


```tsx
render(<Field.Time value="14:30" label="Label text" onChange={time => console.log('onChange', time)} error={new Error('This is what is wrong...')} />)
```


### Validation - Required


```tsx
render(<Field.Time label="Label text" onChange={time => console.log('onChange', time)} required validateInitially />)
```


### With seconds


```tsx
render(<Field.Time value="14:30:45" label="With seconds" showSeconds onChange={time => console.log('onChange', time)} />)
```


### Transform in and out

This example demonstrates how to transform data when it enters and leaves the form field.

You can use the `transformIn` property to modify the incoming data before it is displayed in the field, and the `transformOut` property to adjust the data before it is submitted or processed.
When `transformIn` one can either return a simple value `"14:30"` or an object `{ hours: "14", minutes: "30" }`.


```tsx
const transformOut = (internal, additionalArgs) => {
  const {
    hours,
    minutes
  } = additionalArgs;
  return {
    hours,
    minutes
  };
};
const transformIn = external => {
  if (external) {
    const {
      hours,
      minutes
    } = external;
    return {
      hours,
      minutes
    };
  }
};
render(<Form.Handler defaultData={{
  myField: {
    hours: '14',
    minutes: '30'
  }
}}>
            <Form.Card>
              <Field.Time path="/myField" transformOut={transformOut} transformIn={transformIn} label="Transform in and out" />
              <Tools.Log />
            </Form.Card>
          </Form.Handler>);
```


### Extend validation with custom validation function

You can [extend the existing validation](/uilib/extensions/forms/create-component/useFieldProps/info/#validators) (`timeValidator`) with your own validation function.


```tsx
const noMidnight = (value: string) => {
  if (value === '00:00') {
    return new Error('Midnight is not allowed');
  }
};
const myOnBlurValidator: TimeValidator = (value: string, {
  validators
}) => {
  const {
    timeValidator
  } = validators;
  return [noMidnight, timeValidator];
};
render(<Field.Time value="00:00"
// @ts-expect-error -- strictFunctionTypes
onBlurValidator={myOnBlurValidator} />);
```

## Properties

### Field-specific properties


```json
{
  "props": {
    "size": {
      "doc": "The sizes you can choose are `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem). Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).",
      "type": [
        "string",
        "number"
      ],
      "status": "optional"
    },
    "showSeconds": {
      "doc": "If set to `true`, a seconds input is shown in addition to hours and minutes.",
      "type": "boolean",
      "status": "optional"
    },
    "onBlurValidator": {
      "doc": "Custom validator function that is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Defaults to validating invalid hours and minutes, using `timeValidator`.",
      "type": "function",
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
    "width",
    "contentWidth",
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
    "Time.errorInvalidTime": {
      "nb-NO": "Ugyldig tidspunkt.",
      "en-GB": "Invalid time.",
      "sv-SE": "Ogiltig tid.",
      "da-DK": "Ugyldigt tidspunkt."
    },
    "Time.errorRequired": {
      "nb-NO": "Du må fylle inn et tidspunkt.",
      "en-GB": "You must enter a time.",
      "sv-SE": "Du måste ange en tid.",
      "da-DK": "Du skal udfylde et tidspunkt."
    },
    "Time.hours": {
      "nb-NO": "Timer",
      "en-GB": "Hours",
      "sv-SE": "Timmar",
      "da-DK": "Timer"
    },
    "Time.hoursPlaceholder": {
      "nb-NO": "t",
      "en-GB": "h",
      "sv-SE": "t",
      "da-DK": "t"
    },
    "Time.label": {
      "nb-NO": "Tidspunkt",
      "en-GB": "Time",
      "sv-SE": "Tid",
      "da-DK": "Tidspunkt"
    },
    "Time.minutes": {
      "nb-NO": "Minutter",
      "en-GB": "Minutes",
      "sv-SE": "Minuter",
      "da-DK": "Minutter"
    },
    "Time.minutesPlaceholder": {
      "nb-NO": "m",
      "en-GB": "m",
      "sv-SE": "m",
      "da-DK": "m"
    },
    "Time.seconds": {
      "nb-NO": "Sekunder",
      "en-GB": "Seconds",
      "sv-SE": "Sekunder",
      "da-DK": "Sekunder"
    },
    "Time.secondsPlaceholder": {
      "nb-NO": "s",
      "en-GB": "s",
      "sv-SE": "s",
      "da-DK": "s"
    }
  }
}
```

## Events

### Field-specific events


```json
{
  "props": {
    "onChange": {
      "doc": "Callback on hours, minutes, and seconds change.",
      "type": "(value?: string, additionalArgs?: { hours?: string, minutes?: string, seconds?: string }) => void",
      "status": "optional"
    }
  }
}
```


### General events


```json
{
  "props": {
    "onFocus": {
      "doc": "Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `properties` (all given `Field.*` properties).",
      "type": "(value?: string, additionalArgs: object) => void",
      "status": "optional"
    },
    "onBlur": {
      "doc": "Will be called when the component stops being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `properties` (all given `Field.*` properties).",
      "type": "(value?: string, additionalArgs: object) => void",
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


#### Details about general events arguments

The first argument value returned by the event handlers is a string where the hours and minutes are separated by a `:`, e.g. `14:30`.

The Time field also has an extra second parameter that includes additional information about the hours, minutes, and seconds. This is an object with the following properties:

```tsx
render(
  <Field.Time
    onChange={(
      value: string | undefined, // e.g. "14:30"
      additionalArgs?: {
        hours: string | undefined // e.g. "14"
        minutes: string | undefined // e.g. "30"
        seconds: string | undefined // e.g. "45" (only when showSeconds is true)
      }
    ) => {}}
  />
)
```
