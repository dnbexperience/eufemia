---
title: 'Field.PhoneNumber'
description: '`Field.PhoneNumber` is a wrapper component for the input of strings, with user experience tailored for phone number values.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.305Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.PhoneNumber

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.PhoneNumber />)
```

## Description

`Field.PhoneNumber` is a wrapper component for [string input](/uilib/extensions/forms/base-fields/String), with user experience tailored for phone number values.

There is a corresponding [Value.PhoneNumber](/uilib/extensions/forms/Value/PhoneNumber) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/PhoneNumber)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/PhoneNumber)

## Value

This component behaves as "one single component". It combines the country code and the number into a single string during an event callback.

The `value` property should be a string with the country code separated by a space from the main number.

The component returns the `emptyValue` when no number is set, which defaults to `undefined`.

It uses the HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute (`tel-country-code` and `tel-national`) in their respective fields (country code and phone number) to provide automated assistance in filling out form field values, as well as guidance to the browser as to the type of information expected in the field.

### Default country code

The default country code is set to `+47`.

## Structure and format of phone numbers

Creating a list of all possible phone numbers would be impractical due to the vast number of combinations, especially considering the various country codes, area codes, and local numbers. Additionally, new numbers are constantly being allocated, and existing numbers may be reassigned over time.

Therefore, the structure and format are only used when `+47` is selected.

## Support for locales like `sv-SE` and `da-DK`

In addition to the default support for `nb-NO` and `en-GB`, you can also use `sv-SE` and `da-DK` locales to display country names in Swedish or Danish.

Learn more about [importing additional locales](/uilib/usage/customisation/localization/#eufemia-forms).

## Filter or prioritize country listing

You can filter countries with the `countries` property's values `Scandinavia`, `Nordic` or `Europe`.

Countries are sorted in alphabetical order, with the following prioritized countries on top of the list:

- Norway
- Sweden
- Denmark
- Finland

## Validation

By default, it has no validation. However, you can enable it by providing a `required`, `pattern`, `schema`, `onChangeValidator`, or `onBlurValidator` property with the needed validation. More about validation in the [Getting Started](/uilib/extensions/forms/getting-started/#validation-and-error-handling) section.

### Norwegian mobile numbers

E.g. the following pattern will strictly match Norwegian mobile numbers, which are defined as having a "+47" country code, followed by a number starting with 4 or 9, and exactly 7 more digits. If the country code is set to any other two-digit code, the pattern will match any 6 digits after the country code.

```jsx
<Field.PhoneNumber pattern="((?=\+47)^\+47 [49]\d{7}$)|((?!\+47)^\+\d{2} \d{6})" />
```

## Demos

### Empty

```tsx
render(
  <Field.PhoneNumber
    onFocus={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onFocus', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    onBlur={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onBlur', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    onCountryCodeChange={(countryCode) =>
      console.log('onCountryCodeChange', countryCode)
    }
    onNumberChange={(phoneNumber) =>
      console.log('onNumberChange', phoneNumber)
    }
  />
)
```

### Placeholder

```tsx
render(
  <Field.PhoneNumber
    placeholder="Call this number"
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
  />
)
```

### Label

```tsx
render(
  <Field.PhoneNumber
    numberLabel="Label text"
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
  />
)
```

### Label and value

```tsx
render(
  <Field.PhoneNumber
    numberLabel="Label text"
    value="+47 98765432"
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
  />
)
```

### Show only Scandinavian countries

```tsx
render(
  <Field.PhoneNumber
    numberLabel="Label text"
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    countries="Scandinavia"
  />
)
```

### With help

```tsx
render(
  <Field.PhoneNumber
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    help={{
      title: 'Help is available',
      content:
        'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
    }}
  />
)
```

### Used in Card

```tsx
render(
  <Form.Card>
    <Field.PhoneNumber />
  </Form.Card>
)
```

### Disabled

```tsx
render(
  <Field.PhoneNumber
    value="+47 12345678"
    numberLabel="Label text"
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    disabled
  />
)
```

### Error

```tsx
render(
  <Field.PhoneNumber
    value="007"
    numberLabel="Label text"
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    error={new Error('This is what is wrong...')}
  />
)
```

### Validation - Required

```tsx
render(
  <Field.PhoneNumber
    value="+47 888"
    numberLabel="Label text"
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    required
  />
)
```

### Validation - Pattern

```tsx
render(
  <Field.PhoneNumber
    value="+41 123"
    numberLabel="Label text"
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    pattern="^\\+41 [1]\\d{2}$"
  />
)
```

### Filter countries

This example demonstrates how to filter specific countries. Use the `countries` property to define a set of countries and/or the `filterCountries` property to apply custom filtering logic.

```tsx
render(
  <Field.PhoneNumber
    countries="Scandinavia"
    filterCountries={({ iso }) => iso !== 'DK'}
  />
)
```

### With FieldBlock label

This example demonstrates how to use the `label` and `labelDescription` props on the [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) wrapper.

```tsx
render(
  <Field.PhoneNumber
    label="Additional Label that will stretch all the way down here"
    labelDescription="And a label description that will stretch all the way down here"
  />
)
```

### Transform in and out

This example demonstrates how to transform data when it enters and leaves the form field.

You can use the `transformIn` property to modify the incoming data before it is displayed in the field, and the `transformOut` property to adjust the data before it is submitted or processed.
When `transformIn` one can either return a simple value `"+47 98765432"` or an object `{ countryCode:"+47", phoneNumber:"98765432" }`.

```tsx
const transformOut = (internalArgs, additionalArgs) => {
  return {
    countryCode: additionalArgs?.iso,
    phoneNumber: additionalArgs?.phoneNumber,
    countryCodePrefix: additionalArgs?.countryCode,
  }
}
const transformIn = (externalArgs) => {
  return {
    countryCode: externalArgs?.countryCodePrefix,
    phoneNumber: externalArgs?.phoneNumber,
  }
}
render(
  <Form.Handler
    defaultData={{
      myField: {
        countryCode: 'GB',
        phoneNumber: '9123457',
        countryCodePrefix: '+44',
      },
    }}
  >
    <Form.Card>
      <Field.PhoneNumber
        path="/myField"
        transformOut={transformOut}
        transformIn={transformIn}
        numberLabel="Transform in and out"
      />
      <Tools.Log />
    </Form.Card>
  </Form.Handler>
)
```

Here is how you can deal with TypeScript types for the transform functions:

```ts
import { AdditionalArgs } from '@dnb/eufemia/src/extensions/forms/Field/PhoneNumber'

type MyFieldShape = {
  countryCode: string
  phoneNumber: string
  countryCodePrefix: string
}

const transformOut = (internal, additionalArgs = {}) => {
  const {
    countryCode: countryCodePrefix,
    phoneNumber,
    iso: countryCode,
  } = additionalArgs as AdditionalArgs

  return {
    countryCode,
    phoneNumber,
    countryCodePrefix,
  } satisfies MyFieldShape
}

const transformIn = (
  {
    countryCode: iso,
    phoneNumber,
    countryCodePrefix: countryCode,
  }: MyFieldShape = {} as MyFieldShape | undefined
) => {
  return {
    countryCode,
    phoneNumber,
    iso,
  } satisfies AdditionalArgs
}
```

```tsx
render(
  <Field.PhoneNumber
    numberLabel="Telefon/mobilnummer with long label"
    required={false}
  />
)
```

```tsx
render(
  <Form.Card>
    <Field.String width="stretch" />
    <Field.PhoneNumber numberLabel="default" />
    <Field.PhoneNumber width="large" numberLabel="large" />
    <Field.PhoneNumber width="stretch" numberLabel="stretch" />
    <Field.PhoneNumber omitCountryCodeField numberLabel="default" />
    <Field.PhoneNumber
      omitCountryCodeField
      width="large"
      numberLabel="large"
    />
    <Field.PhoneNumber
      omitCountryCodeField
      width="stretch"
      numberLabel="stretch"
    />
  </Form.Card>
)
```

## Properties

### Field-specific properties

<PropertiesTable props={PhoneNumberProperties} />

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
  "omit": [
    "layout",
    "layoutOptions",
    "label",
    "labelDescription",
    "labelSize"
  ]
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
    "PhoneNumber.countryCodeLabel": {
      "nb-NO": "Landskode",
      "en-GB": "Country code",
      "sv-SE": "Landskod",
      "da-DK": "Landskode"
    },
    "PhoneNumber.errorRequired": {
      "nb-NO": "Mobilnummer må fylles ut. Hvis du ikke har et mobilnummer, kan du oppgi et annet telefonnummer.",
      "en-GB": "Mobile number must be filled in. If you don’t have a mobile number, you can enter another phone number.",
      "sv-SE": "Mobilnummer måste fyllas i. Om du inte har ett mobilnummer kan du ange ett annat telefonnummer.",
      "da-DK": "Mobilnummer skal udfyldes. Hvis du ikke har et mobilnummer, kan du indtaste et andet telefonnummer."
    },
    "PhoneNumber.label": {
      "nb-NO": "Mobilnummer",
      "en-GB": "Mobile number",
      "sv-SE": "Mobilnummer",
      "da-DK": "Mobilnummer"
    },
    "PhoneNumber.warningRequired": {
      "nb-NO": "Du har ikke skrevet inn et mobilnummer. Du kan likevel bruke dette nummeret hvis det er riktig.",
      "en-GB": "You have not entered a mobile number. You can still use this number if it is correct.",
      "sv-SE": "Du har inte angett ett mobilnummer. Du kan ändå använda detta nummer om det är korrekt.",
      "da-DK": "Du har ikke angivet et mobilnummer. Du kan stadig bruge dette nummer, hvis det er korrekt."
    }
  }
}
```

## List of available countries

[Link to the code of the available countries](https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/extensions/forms/constants/countries.ts#L46).

<AvailableCountriesTable />

## Events

### Field-specific events

<PropertiesTable props={PhoneNumberSpecificEvents} />

### General events

<PropertiesTable props={PhoneNumberGeneralEvents} />

#### Details about general events arguments

The first argument value returned by the event handlers is a string where the country code and phone-number is separated by a space, e.g. `+47 9123457`. If the `omitCountryCodeField` is set to `true`, then only the phone-number will be used, so the argument would be `9123457` without the leading country code.

The PhoneNumber field also has an extra second parameter that includes additional information about the country code and phone number. This is an object with the following properties:

```tsx
render(
  <Field.PhoneNumber
    onChange={(
      value: string | undefined, // e.g. "+47 12345678"
      additionalArgs?: {
        phoneNumber: string | undefined // e.g. "12345678"
        countryCode: string // e.g. "+47"
        iso: string // e.g. "NO"
      }
    ) => {}}
  />
)
```
