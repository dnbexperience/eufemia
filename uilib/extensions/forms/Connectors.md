---
title: 'Connectors'
description: 'Connectors are an opt-in way to extend the functionality of a form. They can be used to add features like API calls for autofill, validation, and more.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.219Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Connectors

## Import

```tsx
import { Connectors } from '@dnb/eufemia/extensions/forms'
```

## Description

`Connectors` are an opt-in way to extend the functionality of a form. They can be used to add features like API calls for autofill, validation, and more.

Available connectors:

- [Bring](/uilib/extensions/forms/Connectors/Bring/)

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Connectors)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Connectors)

## How to create your own connector

Connectors are created by returning a function that takes the `generalConfig` and optionally a `handlerConfig` as an argument.

Here is an example of how to create a connector that can be used as a field's `onChangeValidator` or `onBlurValidator`:

```ts
export function validator(generalConfig: GeneralConfig) {
  // - The handler to be used as the validator
  return async function validatorHandler(value) {
    try {
      const { data, status } = await fetchData(value, {
        generalConfig,
        parameters: {},
      })

      const onMatch = () => {
        return new FormError('PostalCodeAndCity.invalidCode')
      }

      const { matcher } = responseResolver(data, handlerConfig)
      const match = matcher(value)

      if (status !== 400 && !match) {
        return onMatch()
      }
    } catch (error) {
      return error
    }
  }
}
```

Here is the `GeneralConfig` type simplified:

```ts
type GeneralConfig = {
  fetchConfig?: {
    url: string | ((value: string) => string | Promise<string>)
    headers?: HeadersInit
  }
}
```

The `responseResolver` is used to take care of the response from the API and return the `matcher` and `payload` to be used by the connector.

```ts
const responseResolver: ResponseResolver<
  PostalCodeResolverData,
  PostalCodeResolverPayload
> = (data, handlerConfig) => {
  // - Here we align the data from the API with the expected data structure
  const { postal_code, city } = data?.postal_codes?.[0] || {}

  return {
    /**
     * The matcher to be used to determine if and how the connector,
     * such as an validator for `onChangeValidator` or `onBlurValidator`,
     * should validate the field value.
     */
    matcher: (value) => value === postal_code,

    /**
     * The payload to be returned and used by the connector.
     */
    payload: { city },
  }
}
```

You can extend a response resolver to support a custom resolver, given via the `handlerConfig` argument.

```ts
const responseResolver = (data, handlerConfig) => {
  const resolver = handlerConfig?.responseResolver
  if (typeof resolver === 'function') {
    return resolver(data)
  }

  // ... the rest of the response resolver.
}
```
