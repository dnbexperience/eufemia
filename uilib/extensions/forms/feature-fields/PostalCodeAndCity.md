---
title: 'PostalCodeAndCity'
description: '`Field.PostalCodeAndCity` is a wrapper component for input of two separate values with user experience tailored for postal code and city values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/feature-fields/PostalCodeAndCity/metadata.json
---

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
  />,
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
  />,
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
  />,
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
  />,
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
  </Iterate.Array>,
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
  />,
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
  />,
)
```

### Error

```tsx
render(
  <Field.PostalCodeAndCity
    postalCode={{}}
    city={{}}
    error={new Error('This is what is wrong...')}
  />,
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
  />,
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
  </Form.Handler>,
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
  </Form.Handler>,
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
  />,
)
```
