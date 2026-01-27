---
title: 'Field.Slider'
description: '`Field.Slider` is a wrapper component for the Slider to make it easier to use inside a form.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.311Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.Slider

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Slider />)
```

## Description

`Field.Slider` is a wrapper component for the [Slider](/uilib/components/slider/) component to make it easier to use inside a form.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Slider)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/more-fields/Slider)

## Multithumb support

You can use the `paths` property to define an array with JSON Pointers for multiple thumb buttons.

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Slider paths={['/myValue', '/mySecondValue']} />)
```

Or values in an array:

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Slider value={[30, 60]} />)
```

## Min, max and step values

The `min`, `max` and `step` properties can be used to define the minimum and maximum value of the slider.

You can provider a JSON Pointer path as well:

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Slider min="/minValue" max="/maxValue" step="/stepValue" />)
```

## Demos

### Basic usage

```tsx
render(
  <Form.Handler
    defaultData={{
      myValue: 50,
    }}
  >
    <Field.Slider label="Slider" path="/myValue" />
  </Form.Handler>
)
```

### Multi thumb

```tsx
render(
  <Form.Handler
    defaultData={{
      firstValue: 10,
      secondValue: 60,
    }}
  >
    <Flex.Stack>
      <Field.Composition width="large">
        <Field.Currency
          label="First value"
          path="/firstValue"
          decimalLimit={0}
        />
        <Field.Currency
          label="Second value"
          path="/secondValue"
          decimalLimit={0}
        />
      </Field.Composition>

      <Field.Slider
        label="My slider"
        paths={['/firstValue', '/secondValue']}
        multiThumbBehavior="push"
        width="large"
      />
    </Flex.Stack>
  </Form.Handler>
)
```

### Sync with input

```tsx
render(
  <Form.Handler
    defaultData={{
      firstValue: 10,
      secondValue: 60,
    }}
  >
    <Flex.Stack>
      <Field.Composition width="large">
        <Field.Currency
          label="First value"
          path="/firstValue"
          decimalLimit={0}
        />
        <Field.Currency
          label="Second value"
          path="/secondValue"
          decimalLimit={0}
        />
      </Field.Composition>

      <Field.Composition width="large">
        <Field.Slider label="First slider" path="/firstValue" />
        <Field.Slider label="Second slider" path="/secondValue" />
      </Field.Composition>
    </Flex.Stack>
  </Form.Handler>
)
```

### With stepper

```tsx
render(
  <Form.Handler
    defaultData={{
      myValue: 50,
    }}
  >
    <Flex.Stack>
      <Field.Currency
        label="Stepper"
        path="/myValue"
        width="medium"
        decimalLimit={0}
        showStepControls
      />
      <Field.Slider label="Slider" path="/myValue" width="large" />
    </Flex.Stack>
  </Form.Handler>
)
```

### Path usage for min, max and step

```tsx
render(
  <Form.Handler
    defaultData={{
      currentValue: 1000,
      min: 0,
      max: 10000,
      step: 10,
    }}
  >
    <Flex.Stack>
      <Flex.Horizontal align="center">
        <P>
          Max value (
          <Value.Currency path="/max" decimals={0} inline />)
        </P>

        <HelpButton>Help text</HelpButton>

        <Field.Currency
          path="/currentValue"
          width="stretch"
          decimalLimit={0}
        />
      </Flex.Horizontal>

      <Field.Slider
        path="/currentValue"
        min="/min"
        max="/max"
        step="/step"
      />
    </Flex.Stack>
  </Form.Handler>
)
```

### With help

```tsx
render(
  <Form.Handler
    defaultData={{
      myValue: 50,
    }}
  >
    <Field.Slider
      label="Slider"
      help={{
        title: 'Help is available',
        content:
          'Take the time to help other people without expecting a reward or gratitude is definitely important in living an optimistic life.',
      }}
      path="/myValue"
    />
  </Form.Handler>
)
```

## Properties

### Field-specific properties

```json
{
  "props": {
    "paths": {
      "doc": "Define an array with JSON Pointer paths for multiple thumb buttons.",
      "type": "Array<string>",
      "status": "optional"
    },
    "min": {
      "doc": "The minimum value. Can be a negative number as well. Defaults to `0`.",
      "type": "number",
      "status": "optional"
    },
    "max": {
      "doc": "The maximum value. Defaults to `100`.",
      "type": "number",
      "status": "optional"
    },
    "step": {
      "doc": "The steps the slider takes on changing the value. Defaults to `null`.",
      "type": "number",
      "status": "optional"
    },
    "vertical": {
      "doc": "Show the slider vertically. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "reverse": {
      "doc": "Show the slider reversed. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "stretch": {
      "doc": "If set to `true`, then the slider will be 100% in `width`.",
      "type": "boolean",
      "status": "optional"
    },
    "hideButtons": {
      "doc": "Removes the helper buttons. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "multiThumbBehavior": {
      "doc": "Use either `omit`, `push` or `swap`. This property only works for two (range) or more thumb buttons, while `omit` will stop the thumb from swapping, `push` will push its nearest thumb along. Defaults to `swap`.",
      "type": "string",
      "status": "optional"
    },
    "thumbTitle": {
      "doc": "Give the slider thumb button a title for accessibility reasons. Defaults to `null`.",
      "type": "string",
      "status": "optional"
    },
    "subtractTitle": {
      "doc": "Give the subtract button a title for accessibility reasons. Defaults to `Decrease (%s)`.",
      "type": "string",
      "status": "optional"
    },
    "addTitle": {
      "doc": "Give the add button a title for accessibility reasons. Defaults to `Increase (%s)`.",
      "type": "string",
      "status": "optional"
    },
    "numberFormat": {
      "doc": "Will extend the return object with a `number` property (from `onChange` event). You can use all the options from the [NumberFormat](/uilib/components/number-format/properties) component. It also will use that formatted number in the increase/decrease buttons. If it has to represent a currency, then use e.g. `numberFormat={{ currency: true, decimals: 0 }}`.",
      "type": "object",
      "status": "optional"
    },
    "tooltip": {
      "doc": "Use `true` to show a tooltip on `mouseOver`, `touchStart` and `focus`, showing the current number (if `numberFormat` is given) or the raw value.",
      "type": "boolean",
      "status": "optional"
    },
    "alwaysShowTooltip": {
      "doc": "Use `true` to always show the tooltip, in addition to the `tooltip` property.",
      "type": "boolean",
      "status": "optional"
    },
    "extensions": {
      "doc": "Makes it possible to display overlays with other functionality such as a marker on the slider marking a given value.",
      "type": "object",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
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
      "type": ["number", "Array<number>"],
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Default source data value for the field. Will not take precedence over the path value given in the data context.",
      "type": ["number", "Array<number>"],
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
      "type": ["number", "Array<number>", "undefined"],
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
      "doc": "Label text displayed above the field. Most fields already have a default label, so check the field translations for an existing label entry. Only set `label` when you need to override the default.",
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
  },
  "valueType": ["number", "Array<number>"]
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
    }
  }
}
```

## Events

```json
{
  "props": {
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
}
```
