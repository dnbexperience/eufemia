---
title: 'Connector.Bring'
description: 'Bring is a connector that allows you to fetch data from their REST API and use it in your form.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.218Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Connector.Bring

## Description

The `Bring` connector allows you to use the [Bring API](https://developer.bring.com/api/) to:

- Verify a postal code: [PostalCode API](#postalcode-api)
- Autofill a city name or street name: [PostalCode API](#postalcode-api)
- Search for addresses with suggestions: [Address Suggestions API](#address-suggestions-api)

---

## PostalCode API

Here is an example of how to use the Bring [Postal Code API](https://developer.bring.com/api/postal-code/) to connect the [PostalCodeAndCity](/uilib/extensions/forms/feature-fields/PostalCodeAndCity/) field to a form.

First, create a context with the config:

```tsx
import { Connectors, Field, Form } from '@dnb/eufemia/extensions/forms'

const { withConfig } = Connectors.createContext({
  fetchConfig: {
    url: (value, { countryCode }) => {
      return `[YOUR-API-URL]/.../${countryCode}/.../${value}`
      // Real-world example using Bring's Postal Code API's get postal code endpoint, directly without proxy:
      // return `https://api.bring.com/address/api/{countryCode}/postal-codes/{value}`
    },
  },
})
```

`[YOUR-API-URL]` is the URL of your own API endpoint that proxies the Bring [Postal Code API](https://developer.bring.com/api/postal-code/) with a token.

### Supported countries

The Bring API for PostalCode supports the [following countries](https://developer.bring.com/api/postal-code/#supported-countries), by its country codes:

{postalCode_supportedCountryCodes.join(', ')}

### Endpoints and response format

Ensure you use one of the [following endpoints](https://developer.bring.com/api/postal-code/#endpoints) from Bring via your proxy API, returning a list of postal codes in the following format:

```json
{
  "postal_codes": [
    {
      "postal_code": "1391",
      "city": "Vollen"
      ...
    }
  ]
}
```

### How to verify a postal code

Use the context to create a validator based on the `validator` connector.

You can use it for an `onChangeValidator` or `onBlurValidator` (recommended), depending on your use case.

```tsx
const onBlurValidator = withConfig(Connectors.Bring.postalCode.validator)

function MyForm() {
  return (
    <Form.Handler>
      <Field.PostalCodeAndCity
        postalCode={{
          path: '/postalCode',
          onBlurValidator,
        }}
      />
    </Form.Handler>
  )
}
```

### How to autofill a city name based on a postal code

Use the context to create the `onChange` event handler based on the `autofill` connector.

```tsx
const onChange = withConfig(Connectors.Bring.postalCode.autofill, {
  cityPath: '/city',
})

function MyForm() {
  return (
    <Form.Handler>
      <Field.PostalCodeAndCity
        postalCode={{
          path: '/postalCode',
          onChange,
        }}
        city={{
          path: '/city',
        }}
      />
      <Form.SubmitButton />
    </Form.Handler>
  )
}
```

### Verify a postal code

This demo contains only a mocked API call, so only a postal code of `1391` for Norway and `11432` for Sweden is valid.

```tsx
const { withConfig } = Connectors.createContext({
  fetchConfig: {
    url: async (value, { countryCode }) => {
      await mockFetch(countryCode, getMockDataPostalCode(countryCode))
      return `[YOUR-API-URL]/${value}`
    },
  },
})
const onBlurValidator = withConfig(Connectors.Bring.postalCode.validator)
const onBlur = withConfig(Connectors.Bring.postalCode.autofill, {
  cityPath: '/city',
})
render(
  <Form.Handler onSubmit={console.log}>
    <Form.Card>
      <Field.PostalCodeAndCity
        countryCode="/countryCode"
        postalCode={{
          path: '/postalCode',
          onBlurValidator,
          onBlur,
          required: true,
        }}
        city={{
          path: '/city',
          required: true,
        }}
      />
      <Field.SelectCountry
        path="/countryCode"
        defaultValue="NO"
        filterCountries={({ iso }) => ['NO', 'SE'].includes(iso)}
      />
    </Form.Card>
    <Form.SubmitButton />
  </Form.Handler>
)
```

---

## Address Suggestions API

Here is an example of how to use the Bring [Address API](https://developer.bring.com/api/address/#get-street-or-place-suggestions-get) to connect the [Address](/uilib/extensions/forms/feature-fields/Address/) field to a form.

First, create a context with the config:

```tsx
import { Connectors, Field, Form } from '@dnb/eufemia/extensions/forms'

const { withConfig } = Connectors.createContext({
  fetchConfig: {
    url: (value, { countryCode }) => {
      return `[YOUR-API-URL]/.../${countryCode}/.../${value}`
      // Real-world example using Bring's Address API's get address endpoint, directly without proxy:
      // return `https://api.bring.com/address/api/{countryCode}/addresses/suggestions?q=${value}`
    },
  },
})
```

Then create an element that will be used to render the autocomplete component to show the suggestions.

```tsx
const addressSuggestionsElement = withConfig(
  Connectors.Bring.address.suggestionsElement,
  {
    countryCode: '/countryCode', // Can be "NO" or a path
    cityPath: '/city',
    postalCodePath: '/postalCode',
  }
)
```

And use the element in the Address field:

```tsx
function MyForm() {
  return (
    <Form.Handler>
      <Field.Address.Street
        path="/streetAddress"
        element={addressSuggestionsElement}
      />
    </Form.Handler>
  )
}
```

### Populate data to PostalCodeAndCity

You can auto fill the address fields based on the selected address.

```tsx
function MyForm() {
  return (
    <Form.Handler>
      <Field.Address.Street
        path="/streetAddress"
        element={addressSuggestionsElement}
      />

      <Field.PostalCodeAndCity
        postalCode={{ path: '/postalCode' }}
        city={{ path: '/city' }}
      />
    </Form.Handler>
  )
}
```

### Supported countries

The Bring API for Address supports the [following countries](https://developer.bring.com/api/address/), by its country codes:

{address_supportedCountryCodes.join(', ')}

### Endpoints and response format

Ensure you use one of the [following endpoints](https://developer.bring.com/api/address/#endpoints) from Bring via your proxy API, returning a list of addresses in the following format:

```json
{
  "addresses": [
    {
      "address_id": "1398742",
      "street_name": "Gransvea",
      "house_number": 37,
      "postal_code": "1391",
      "city": "Vollen",
      "county": "Akershus",
      "municipality": "Asker",
      "type": "STREET"
    }
  ]
}
```

### Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "StreetAddress.suggestionPlaceholder": {
      "nb-NO": "Skriv inn adressen",
      "en-GB": "Enter an address",
      "sv-SE": "Ange en adress",
      "da-DK": "Indtast en adresse"
    }
  }
}
```

### Address suggestion demos

This demo contains only a mocked API call, so you can enter anything in the Street field.

```tsx
const { withConfig } = Connectors.createContext({
  fetchConfig: {
    url: async (value, { countryCode }) => {
      await mockFetch(countryCode, getMockDataAddress(countryCode))
      return `[YOUR-API-URL]/${value}`
    },
  },
})
const addressSuggestionsElement = withConfig(
  Connectors.Bring.address.suggestionsElement,
  {
    countryCode: '/countryCode',
    cityPath: '/city',
    postalCodePath: '/postalCode',
  }
)
render(
  <Form.Handler onSubmit={console.log}>
    <Form.Card>
      <Field.Address.Street
        path="/streetAddress"
        element={addressSuggestionsElement}
      />
      <Field.PostalCodeAndCity
        countryCode="/countryCode"
        postalCode={{
          path: '/postalCode',
          required: true,
        }}
        city={{
          path: '/city',
          required: true,
        }}
      />
      <Field.SelectCountry
        path="/countryCode"
        defaultValue="NO"
        filterCountries={({ iso }) => ['NO', 'SE'].includes(iso)}
      />
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>
)
```
