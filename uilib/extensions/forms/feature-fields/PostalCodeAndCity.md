---
title: 'Field.PostalCodeAndCity'
description: '`Field.PostalCodeAndCity` is a wrapper component for input of two separate values with user experience tailored for postal code and city values.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.306Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.PostalCodeAndCity

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.PostalCodeAndCity />)
```

## Description

`Field.PostalCodeAndCity` is a wrapper component for input of two separate [input of strings](/uilib/extensions/forms/base-fields/String) with user experience tailored for postal code and city values.

These fields are meant for Norwegian postal codes and cities. The postal code input takes a 4-digit string as values, since it's meant for Norwegian postal codes. A Norwegian postal code can have a leading zero, which is why the value is a string and not a number.
More info about postal codes can be found at [Posten](https://www.bring.no/tjenester/adressetjenester/postnummer).

It supports the HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute, and by default set it to `postal-code` for the postal code field, and to `address-level2` for the city field.

There is a corresponding [Value.PostalCodeAndCity](/uilib/extensions/forms/Value/PostalCodeAndCity) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/PostalCodeAndCity)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/PostalCodeAndCity)

## Validation and autofill

Read more about how to use the [Bring API](/uilib/extensions/forms/Connectors/Bring/) to validate and autofill a postal code and city name.

## Demos

### Empty

```tsx
render(
  <Field.PostalCodeAndCity
    postalCode={{
      onChange: (value) => console.log('postalCode onChange', value),
    }}
    city={{
      onChange: (value) => console.log('city onChange', value),
    }}
  />
)
```

### Placeholder

```tsx
render(
  <Field.PostalCodeAndCity
    postalCode={{
      placeholder: '????',
      onChange: (value) => console.log('postalCode onChange', value),
    }}
    city={{
      placeholder: 'Your city',
      onChange: (value) => console.log('city onChange', value),
    }}
  />
)
```

### Label

```tsx
render(
  <Field.PostalCodeAndCity
    postalCode={{
      label: 'PNR',
      onChange: (value) => console.log('postalCode onChange', value),
    }}
    city={{
      label: 'CTY',
      onChange: (value) => console.log('city onChange', value),
    }}
  />
)
```

### Label and value

```tsx
render(
  <Field.PostalCodeAndCity
    postalCode={{
      label: 'Pnr.',
      value: '0788',
      onChange: (value) => console.log('postalCode onChange', value),
    }}
    city={{
      value: 'Oslo',
      onChange: (value) => console.log('city onChange', value),
    }}
  />
)
```

### Iterate over array

By using the `itemPath` property, you can iterate over an array and use the `postalCode` and `city` properties to render the fields.

```tsx
render(
  <Iterate.Array
    value={[
      {
        postalCode: '0788',
        city: 'Oslo',
      },
      {
        postalCode: '0789',
        city: 'Bergen',
      },
    ]}
  >
    <Field.PostalCodeAndCity
      postalCode={{
        itemPath: '/postalCode',
      }}
      city={{
        itemPath: '/city',
      }}
    />
  </Iterate.Array>
)
```

### Disabled

```tsx
render(
  <Field.PostalCodeAndCity
    postalCode={{
      value: '1234',
      disabled: true,
      onChange: (value) => console.log('postalCode onChange', value),
    }}
    city={{
      value: 'Oslo',
      disabled: true,
      onChange: (value) => console.log('city onChange', value),
    }}
  />
)
```

### With help

```tsx
render(
  <Field.PostalCodeAndCity
    postalCode={{
      onChange: (value) => console.log('postalCode onChange', value),
    }}
    city={{
      onChange: (value) => console.log('city onChange', value),
    }}
    help={{
      title: 'Help is available',
      content:
        'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
    }}
  />
)
```

### Error

```tsx
render(
  <Field.PostalCodeAndCity
    postalCode={{}}
    city={{}}
    error={new Error('This is what is wrong...')}
  />
)
```

### Validation - Required

```tsx
render(
  <Field.PostalCodeAndCity
    postalCode={{
      required: true,
    }}
    city={{
      required: true,
    }}
  />
)
```

### Path Based Country

The `country` property supports a field path as value. This allows you to set the `country` based on the value of another field.

```tsx
render(
  <Form.Handler>
    <Form.Card>
      <Field.SelectCountry path="/country" defaultValue="NO" />
      <Field.PostalCodeAndCity countryCode="/country" />
    </Form.Card>
  </Form.Handler>
)
```

### Non-Norwegian Postal Codes

If you want to allow for a postal code that is not Norwegian, just set the `country` property to the desired country, and add your own custom validation.

NB: As of today, setting `country` property to anything other than `NO` will only remove the default norwegian postal code pattern, mask, and placeholder, but not actually set the postal code pattern, mask, and placeholder for the value provided to the `country` property. This functionality will hopefully be implemented in the future.

```tsx
render(
  <Form.Handler
    translations={{
      'nb-NO': {
        'PostalCode.errorPattern':
          'Dette er ikke et gyldig postnummer (fem siffer).',
      },
      'en-GB': {
        'PostalCode.errorPattern':
          'This is not a valid postal code (five-digits).',
      },
    }}
  >
    <Field.PostalCodeAndCity
      countryCode="DE"
      postalCode={{
        pattern: '^[0-9]{5}$',
        onBlurValidator: undefined,
        mask: [/\\d/, /\\d/, /\\d/, /\\d/, /\\d/],
        placeholder: '00000',
        width: '5.4rem',
      }}
      city={{
        pattern: '^[a-zA-ZäöüÄÖÜß -]+$',
        width: 'stretch',
      }}
    />
  </Form.Handler>
)
```

```tsx
render(
  <Field.PostalCodeAndCity
    postalCode={{
      label: 'With a very long label',
    }}
    city={{
      label: 'With a very long label',
    }}
  />
)
```

## Properties

### Field-specific properties

```json
{
  "props": {
    "countryCode": {
      "doc": "Defines which country the postal code and city is for, based on the [ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) i.e. `NO`, `DE` etc. Setting it to anything other than `NO` will remove the default norwegian postal code pattern. You can also use the value of another field to define the countryCode, by using a path value i.e. `/myCountryCodePath`. Defaults to `NO`.",
      "type": ["Path", "string"],
      "status": "optional"
    },
    "postalCode": {
      "doc": "Properties for the [Field.String](/uilib/extensions/forms/base-fields/String/) component for postal code.",
      "type": "object",
      "status": "required"
    },
    "city": {
      "doc": "Properties for the [Field.String](/uilib/extensions/forms/base-fields/String/) component for city.",
      "type": "object",
      "status": "required"
    },
    "help": {
      "doc": "Provide help content for the field using `title` and `content` as a string or React.Node. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
      "type": "object",
      "status": "optional"
    },
    "size": {
      "doc": "The sizes you can choose is `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).",
      "type": ["string", "number"],
      "status": "optional"
    }
  }
}
```

### General properties

```json
{
  "props": {
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
      "doc": "Define one of the following [heading sizes](/uilib/elements/heading/): `medium` or `large`.",
      "type": ["string", "false"],
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
    },
    "labelHeight": {
      "doc": "Defines the height of an component (size prop), so the label can be aligned correctly. Can be `default`, `small`, `medium`, `large`.",
      "type": "string",
      "status": "optional"
    },
    "asFieldset": {
      "doc": "Use `true` when you have several form elements. This way a `fieldset` with a `legend` is used.",
      "type": "boolean",
      "status": "optional"
    },
    "align": {
      "doc": "`center` or `bottom` for aligning the contents vertically. Defaults to `bottom`.",
      "type": ["string", "false"],
      "status": "optional"
    },
    "disableStatusSummary": {
      "doc": "Use `true` to disable the error summary.",
      "type": "boolean",
      "status": "optional"
    },
    "composition": {
      "doc": "Use `true` for when you have more than one field wrapped.",
      "type": "true",
      "status": "optional"
    },
    "disabled": {
      "doc": "Set `true` to make the inner [FormLabel](/uilib/components/form-label/) behave as disabled.",
      "type": "boolean",
      "status": "optional"
    }
  },
  "pick": ["width", "help", "[Space](/uilib/layout/space/properties)"]
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "City.errorPattern": {
      "nb-NO": "Stedsnavn kan kun inneholde bokstaver og gyldige tegn som bindestrek og mellomrom.",
      "en-GB": "City names can only contain letters and valid characters such as hyphens and spaces.",
      "sv-SE": "Ortsnamn kan endast innehålla bokstäver och giltiga tecken som bindestreck och mellanslag.",
      "da-DK": "Bynavn må kun indeholde bogstaver og gyldige tegn som bindestreg og mellemrum."
    },
    "City.errorRequired": {
      "nb-NO": "Du må fylle inn et stedsnavn.",
      "en-GB": "You must enter a city name.",
      "sv-SE": "Du måste fylla i ett ortsnamn.",
      "da-DK": "Du skal udfylde et bynavn."
    },
    "City.label": {
      "nb-NO": "Sted",
      "en-GB": "City",
      "sv-SE": "Ort",
      "da-DK": "By"
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
    },
    "PostalCode.errorPattern": {
      "nb-NO": "Dette er ikke et gyldig postnummer (fire siffer).",
      "en-GB": "This is not a valid postcode (four digits).",
      "sv-SE": "Detta är inte ett giltigt postnummer (fyra siffror).",
      "da-DK": "Dette er ikke et gyldigt postnummer (fire cifre)."
    },
    "PostalCode.errorRequired": {
      "nb-NO": "Du må fylle inn et postnummer.",
      "en-GB": "You must enter a postcode.",
      "sv-SE": "Du måste fylla i ett postnummer.",
      "da-DK": "Du skal udfylde et postnummer."
    },
    "PostalCode.label": {
      "nb-NO": "Postnr.",
      "en-GB": "Postcode",
      "sv-SE": "Postnr.",
      "da-DK": "Postnr."
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
