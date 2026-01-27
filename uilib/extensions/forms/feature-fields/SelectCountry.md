---
title: 'Field.SelectCountry'
description: '`Field.SelectCountry` is a wrapper component for the selection component, with options built in for selecting a country.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.308Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.SelectCountry

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.SelectCountry />)
```

## Description

`Field.SelectCountry` is a wrapper component for [Field.Selection](/uilib/extensions/forms/base-fields/Selection), with options built in for selecting a country.
[The list of available countries to select](/uilib/extensions/forms/feature-fields/SelectCountry/properties/#list-of-available-countries) is carefully curated to meet the demands we know today.
When selecting a country, the value returned is the selected country's [ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) (country code) like `NO` for Norway.

It supports the HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute, and by default set it to `country-name`.

There is a corresponding [Value.SelectCountry](/uilib/extensions/forms/Value/SelectCountry) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/SelectCountry)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/SelectCountry)

## Support for locales like `sv-SE` and `da-DK`

In addition to the default support for `nb-NO` and `en-GB`, you can also use the `sv-SE` and `da-DK` locales to display country names in Swedish or Danish.

Learn more about [importing additional locales](/uilib/usage/customisation/localization/#eufemia-forms).

### Filter or prioritize country listing

You can filter countries with the `countries` property's values `Scandinavia`, `Nordic` or `Europe`.

Countries are sorted in alphabetically order, with the following prioritized countries on top of the list:

- Norway
- Sweden
- Denmark
- Finland

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.PhoneNumber countries="Prioritized" />)
```

### TransformIn and TransformOut

You can use the `transformIn` and `transformOut` to transform the value before it gets displayed in the field and before it gets sent to the form context. The second parameter is the country object. You may have a look at the demo below to see how it works.

```tsx
import type { CountryType } from '@dnb/eufemia/extensions/forms/Field/SelectCountry'

// From the Field (internal value) to the data context or event parameter
const transformOut = (internal: string, country: CountryType) => {
  if (internal) {
    return `${country.name} (${internal})`
  }
}

// To the Field (from e.g. defaultValue)
const transformIn = (external: unknown) => {
  return String(external).match(/\((.*)\)/)?.[1] || 'NO'
}
```

### onFocus, onBlur, onChange

These events have an additional parameter with the country object.

```tsx
const onFocus = (value, country) => {}
```

### The country object

```ts
{
  cdc: '47',
  iso: 'NO',
  name: 'Norge',
  i18n: { en: 'Norway', nb: 'Norge' },
  regions: ['Scandinavia', 'Nordic'],
  continent: 'Europe',
}
```

## Demos

### Option selected

```tsx
render(
  <Field.SelectCountry
    value="NO"
    onChange={(value, obj) => console.log('onChange', value, obj)}
  />
)
```

### With a horizontal layout

```tsx
render(
  <Field.SelectCountry
    value="NO"
    layout="horizontal"
    layoutOptions={{
      width: '6rem',
    }}
  />
)
```

### With help

```tsx
render(
  <Field.SelectCountry
    value="NO"
    label="Label text"
    help={{
      title: 'Help is available',
      content:
        'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
    }}
    onChange={(value, obj) => console.log('onChange', value, obj)}
  />
)
```

### Disabled

```tsx
render(
  <Field.SelectCountry
    value="NO"
    label="Label text"
    onChange={(value, obj) => console.log('onChange', value, obj)}
    disabled
  />
)
```

### Error

```tsx
render(
  <Field.SelectCountry
    value="NO"
    label="Label text"
    onChange={(value, obj) => console.log('onChange', value, obj)}
    error={new Error('This is what is wrong...')}
  />
)
```

### Validation - Required

```tsx
render(
  <Field.SelectCountry
    label="Label text"
    onChange={(value, obj) => console.log('onChange', value, obj)}
    required
    validateInitially
    validateUnchanged
  />
)
```

### TransformIn and TransformOut

```tsx
// From the Field (internal value) to the data context or event parameter
const transformOut = (value, country) => {
  if (value) {
    return country
  }
}

// To the Field (from e.g. defaultValue)
// To the Field (from e.g. defaultValue)
const transformIn = (country) => {
  return country?.iso
}
const MyForm = () => {
  return (
    <Form.Handler onSubmit={console.log}>
      <Form.Card>
        <Field.SelectCountry
          path="/country"
          transformIn={transformIn}
          transformOut={transformOut}
          defaultValue="NO"
        />

        <Value.SelectCountry
          path="/country"
          transformIn={transformIn}
          placeholder="(Select a country)"
          showEmpty
        />

        <Form.SubHeading>Data Context</Form.SubHeading>
        <Tools.Log />
      </Form.Card>
      <Form.SubmitButton />
    </Form.Handler>
  )
}
render(<MyForm />)
```

### Filter countries

This example demonstrates how to filter specific countries. Use the `countries` property to define a set of countries and/or the `filterCountries` property to apply custom filtering logic.

```tsx
render(
  <Field.SelectCountry
    countries="Scandinavia"
    filterCountries={({ iso }) => iso !== 'DK'}
  />
)
```

```tsx
render(
  <Field.SelectCountry
    value="NO"
    htmlAttributes={{
      opened: true,
    }}
  />
)
```

### Field-specific properties

<PropertiesTable props={SelectCountryProperties} />

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
    "SelectCountry.errorRequired": {
      "nb-NO": "Du må velge et land fra listen.",
      "en-GB": "You must select a country from the list.",
      "sv-SE": "Du måste välja ett land från listan.",
      "da-DK": "Du skal vælge et land fra listen."
    },
    "SelectCountry.label": {
      "nb-NO": "Land",
      "en-GB": "Country",
      "sv-SE": "Land",
      "da-DK": "Land"
    },
    "SelectCountry.placeholder": {
      "nb-NO": "Velg et land",
      "en-GB": "Select country",
      "sv-SE": "Välj ett land",
      "da-DK": "Vælg et land"
    }
  }
}
```

## List of available countries

[Link to the code of the available countries](https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/extensions/forms/constants/countries.ts#L46).

NOTE: This list does not say anything about the order in which they will appear in component `Field.SelectCountry`. And is only meant to easily find which countries that's supported and available to use.

<AvailableCountriesTable />

## Events

<PropertiesTable props={SelectCountryGeneralEvents} />

### Details about argument values

The event handlers has two arguments. The first one is a `string` containing the `ISO` of the selected country, e.g. `CH`, and the second argument is an object with the properties `cdc`, `continent`, `i18n` and `iso`.

```jsx
(
  value?: string, // e.g. "CH"
  additionalArgs?: {
    i18n: {
      en: string, // e.g. "Switzerland"
      nb: string // e.g. "Sveits"
    },
    cdc: string, // e.g. "41"
    iso: string, // e.g. "CH"
    continent: string, // e.g. "Europe"
    name: string, // e.g. "Sveits"
    regions?: string[] // e.g ["Scandinavia", "Nordic"]
  }
) => void
```
