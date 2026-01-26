---
title: 'Field.Slider'
description: '`Field.Slider` is a wrapper component for the Slider to make it easier to use inside a form.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.297Z
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
```

### General properties

<PropertiesTable
props={FieldProperties}
valueType={['number', 'Array<number>']}
/>

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
