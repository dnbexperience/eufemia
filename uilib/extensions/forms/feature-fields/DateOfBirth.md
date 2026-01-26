---
title: 'Field.DateOfBirth'
description: '`Field.DateOfBirth` is a wrapper component for the input of strings, with user experience tailored for date of birth values.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.286Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.DateOfBirth

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.DateOfBirth />)
```

## Description

`Field.DateOfBirth` is a wrapper component for the [input of strings](/uilib/extensions/forms/base-fields/String), with user experience tailored for date of birth values.

There is a corresponding [Value.DateOfBirth](/uilib/extensions/forms/Value/DateOfBirth) component.

It supports the HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute, and by default set it to `bday-day` for the day field, `bday-month` for the month field, and to `bday-year` for the year field.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/DateOfBirth)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/DateOfBirth)

## Validators

### Internal validators exposed

`Field.DateOfBirth` expose the `dateOfBirthValidator` validator through its `onChangeValidator` and `onBlurValidator` property, take a look at [this demo](/uilib/extensions/forms/feature-fields/DateOfBirth/demos/#extend-validation-with-custom-validation-function).
The `dateOfBirthValidator` validator, validates if the date provided is a valid date or not.

### Extending validators

When you return the built-in validator together with custom validation logic you can introduce additional rules without losing the default checks. Import `DateOfBirthValidator` to type your validator and the `validators` object.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
import type { DateOfBirthValidator } from '@dnb/eufemia/extensions/forms/Field/DateOfBirth'

const myValidator: DateOfBirthValidator = (value, { validators }) => {
  const { dateOfBirthValidator } = validators ?? {}
  const modernBirthYear = (value: string) => {
    if (value && value.slice(0, 4) < '1900') {
      return new Error('Birth year must be 1900 or later')
    }
  }

  // Keep the default validator and add a minimum year requirement.
  return [dateOfBirthValidator, modernBirthYear]
}

render(<Field.DateOfBirth onBlurValidator={myValidator} />)
```

## Demos

<ChangeLocale
  bottom
  label="Locale used in the demos:"
  listUSLocale={true}
/>

### Empty

```tsx
render(
  <Field.DateOfBirth
    onChange={(value, additionalArgs) => {
      {
        const { day, month, year } = additionalArgs || {}
        console.log('onChange', value, {
          day,
          month,
          year,
        })
      }
    }}
    onDayChange={(day) => console.log('onDayChange', day)}
    onMonthChange={(month) => console.log('onMonthChange', month)}
    onYearChange={(year) => console.log('onYearChange', year)}
  />
)
```

### Label

```tsx
render(
  <Field.DateOfBirth
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Label and value

```tsx
render(
  <Field.DateOfBirth
    label="Label text"
    value="2000-05-17"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### With help

```tsx
render(
  <Field.DateOfBirth
    label="Label text"
    value="2000-05-17"
    help={{
      title: 'Help is available',
      content:
        'The real point is that we all need help somewhere along life’s path whether we think we will or not. And, if you are the one giving and helping, just remember this: no matter what happens later, you will always be secure in the fact knowing that you have remained strong and true to assist those that need your help.',
    }}
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Disabled

```tsx
render(
  <Field.DateOfBirth
    value="2000-05-17"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />
)
```

### Error

```tsx
render(
  <Field.DateOfBirth
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  />
)
```

### Validation - Required

```tsx
render(
  <Field.DateOfBirth
    value="2000-05-17"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    required
  />
)
```

### Extend validation with custom validation function

You can [extend the existing validation](/uilib/extensions/forms/create-component/useFieldProps/info/#validators) (`dateOfBirthValidator`) with your own validation function.

```tsx
const firstDigitIs1Validator = (value: string) => {
  if (value.substring(0, 4) !== '1990') {
    return new Error('Has to be born in the year 1990!')
  }
}

// Keep the default validator and add a custom year rule.
// Keep the default validator and add a custom year rule.
const myValidator: DateOfBirthValidator = (value, { validators }) => {
  const { dateOfBirthValidator } = validators
  return [dateOfBirthValidator, firstDigitIs1Validator]
}
render(
  <Field.DateOfBirth
    required
    value="2000-05-17"
    onBlurValidator={myValidator}
    validateInitially
  />
)
```

```tsx
render(
  <Form.Card>
    <Field.String width="stretch" />
    <Field.DateOfBirth label="default" />
    <Field.DateOfBirth width="large" label="large" />
    <Field.DateOfBirth width="stretch" label="stretch" />
  </Form.Card>
)
```

### Path usage

```tsx
render(
  <Form.Handler
    onSubmit={console.log}
    data={{
      dob: '2000-05-17',
    }}
  >
    <Form.Card>
      <Field.DateOfBirth path="/dob" />

      <Value.DateOfBirth path="/dob" showEmpty />

      <Tools.Log />
    </Form.Card>
    <Form.SubmitButton />
  </Form.Handler>
)
```

### Transform in and out

You can use `transformIn` and `transformOut` to transform data between external and internal formats.

```tsx
const transformOut = (internal, additionalArgs) => {
  if (additionalArgs) {
    const { year, month, day } = additionalArgs
    return {
      year,
      month,
      day,
    }
  }
}
const transformIn = (external) => {
  if (external) {
    const { year, month, day } = external
    return `${year}-${month}-${day}`
  }
}
render(
  <Form.Handler
    defaultData={{
      myField: {
        year: '1990',
        month: '05',
        day: '15',
      },
    }}
  >
    <Form.Card>
      <Field.DateOfBirth
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

## Properties

### Field-specific properties

<PropertiesTable props={DateOfBirthProperties} />

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
    "DateOfBirth.dayLabel": {
      "nb-NO": "Dag",
      "en-GB": "Day",
      "sv-SE": "Dag",
      "da-DK": "Dag"
    },
    "DateOfBirth.dayPlaceholder": {
      "nb-NO": "dd",
      "en-GB": "dd",
      "sv-SE": "dd",
      "da-DK": "dd"
    },
    "DateOfBirth.errorDateOfBirth": {
      "nb-NO": "Ugyldig fødselsdato.",
      "en-GB": "Invalid date of birth.",
      "sv-SE": "Ogiltigt födelsedatum.",
      "da-DK": "Ugyldig fødselsdato."
    },
    "DateOfBirth.errorDateOfBirthFuture": {
      "nb-NO": "Ugyldig fødselsdato. Skriv inn dagens dato eller tidligere.",
      "en-GB": "Invalid date of birth. Enter todays date or earlier.",
      "sv-SE": "Invalid date of birth. Skriv in dagens datum eller tidigare.",
      "da-DK": "Ugyldig fødselsdato. Angiv dags dato eller tidligere."
    },
    "DateOfBirth.errorRequired": {
      "nb-NO": "Du må fylle inn en fødselsdato.",
      "en-GB": "You must enter a date of birth.",
      "sv-SE": "Du må fylle inn en födelsedatum.",
      "da-DK": "Du skal udfylde en fødselsdato."
    },
    "DateOfBirth.label": {
      "nb-NO": "Fødselsdato",
      "en-GB": "Date of birth",
      "sv-SE": "Födelsedatum",
      "da-DK": "Fødselsdato"
    },
    "DateOfBirth.monthLabel": {
      "nb-NO": "Måned",
      "en-GB": "Month",
      "sv-SE": "Månad",
      "da-DK": "Måned"
    },
    "DateOfBirth.monthPlaceholder": {
      "nb-NO": "måned",
      "en-GB": "month",
      "sv-SE": "månad",
      "da-DK": "måned"
    },
    "DateOfBirth.yearLabel": {
      "nb-NO": "År",
      "en-GB": "Year",
      "sv-SE": "År",
      "da-DK": "År"
    },
    "DateOfBirth.yearPlaceholder": {
      "nb-NO": "åååå",
      "en-GB": "yyyy",
      "sv-SE": "åååå",
      "da-DK": "åååå"
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

### Field-specific events

<PropertiesTable props={DateOfBirthSpecificEvents} />

### General events

<PropertiesTable props={DateOfBirthGeneralEvents} />

#### Details about general events arguments

The first argument value returned by the event handlers is a string where the day, month, and year is separated by a `/`, e.g. `24/01/2024`.

The DateOfBirth field also has an extra second parameter that includes additional information about the day, month, and year. This is an object with the following properties:

```tsx
render(
  <Field.DateOfBirth
    onChange={(
      value: string | undefined, // e.g. "24/01/2024"
      additionalArgs?: {
        day: string | undefined // e.g. "24"
        month: string // e.g. "01"
        year: string // e.g. "2024"
      }
    ) => {}}
  />
)
```
