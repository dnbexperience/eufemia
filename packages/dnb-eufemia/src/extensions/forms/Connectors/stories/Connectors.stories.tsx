import { Connectors, Field, Form, Tools } from '../../'
import { isSupportedCountryCode } from '../createContext'
import { supportedCountryCodes as postalCode_supportedCountryCodes } from '../Bring/postalCode'
import { supportedCountryCodes as address_supportedCountryCodes } from '../Bring/address'

export default {
  title: 'Eufemia/Extensions/Forms/Connectors',
}

export function PostalCode() {
  // 1. Create a context with the config
  const { withConfig } = Connectors.createContext({
    fetchConfig: {
      url: (value, { countryCode }) => {
        // Visit: https://cors-anywhere.herokuapp.com/corsdemo to enable this service
        return `https://cors-anywhere.herokuapp.com/https://api.bring.com/address/api/${countryCode}/postal-codes/${value}`
      },
      headers: {
        'X-Mybring-API-Uid': process.env.BRING_API_UID,
        'X-Mybring-API-Key': process.env.BRING_API_KEY,
      },
    },
  })

  type Response = {
    postal_codes: { postal_code: string; city: string }[]
  }

  // 2. Use the context to create the onChangeValidator ...
  const onChangeValidator = withConfig(
    Connectors.Bring.postalCode.validator,
    {
      // preResponseResolver: ({ value }) => {
      //   if (!value) {
      //     return { postal_codes: [] }
      //   }
      // },
      responseResolver: (response: Response) => {
        const { postal_code, city } = response?.postal_codes?.[0] || {}
        return {
          matcher: (value) => value === postal_code,
          payload: { city },
        }
      },
    }
  )

  // ... and an onChange function
  const onChange = withConfig(Connectors.Bring.postalCode.autofill, {
    cityPath: '/city',
    // preResponseResolver: ({ value }) => {
    //   if (!value) {
    //     return { postal_codes: [] }
    //   }
    // },
    // responseResolver: (response: Response) => {
    //   const { postal_code, city } = response?.postal_codes?.[0] || {}

    //   return {
    //     matcher: (value) => value === postal_code,
    //     payload: { city },
    //   }
    // },
  })

  return (
    <Form.Handler
      // defaultData={{ postalCode: '144', city: '' }}
      onSubmit={async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 3000))
        console.log('onSubmit', data)
      }}
    >
      <Form.Card>
        <Field.SelectCountry
          path="/countryCode"
          defaultValue="NO"
          // defaultValue="SE"
          filterCountries={({ iso }) =>
            isSupportedCountryCode(iso, postalCode_supportedCountryCodes)
          }
        />
        <Field.PostalCodeAndCity
          countryCode="/countryCode"
          postalCode={{
            path: '/postalCode',
            onChangeValidator,
            onChange,
            required: true,
          }}
          city={{
            path: '/city',
            required: true,
          }}
        />
      </Form.Card>
      <Form.SubmitButton />
    </Form.Handler>
  )
}

export function Address() {
  // 1. Create a context with the config
  const { withConfig } = Connectors.createContext({
    fetchConfig: {
      url: (value, { countryCode }) => {
        // Visit: https://cors-anywhere.herokuapp.com/corsdemo to enable this service
        return `https://cors-anywhere.herokuapp.com/https://api.bring.com/address/api/${countryCode}/addresses/suggestions?q=${value}`
      },
      headers: {
        'X-Mybring-API-Uid': process.env.BRING_API_UID,
        'X-Mybring-API-Key': process.env.BRING_API_KEY,
      },
    },
  })

  // 2. Use the context to create the element we use instead of the default one
  const addressSuggestionsElement = withConfig(
    Connectors.Bring.address.suggestionsElement,
    {
      countryCode: '/countryCode', // Can be "NO" or a path
      cityPath: '/city',
      postalCodePath: '/postalCode',
    }
  )

  return (
    <Form.Handler
      // defaultData={{ postalCode: '144', city: '' }}
      onSubmit={async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 3000))
        console.log('onSubmit', data)
      }}
    >
      <Form.Card>
        <Field.SelectCountry
          path="/countryCode"
          defaultValue="NO"
          // defaultValue="SE"
          filterCountries={({ iso }) =>
            isSupportedCountryCode(iso, address_supportedCountryCodes)
          }
        />
        <Field.Address.Street
          path="/streetAddress"
          required
          element={addressSuggestionsElement}
          autocompleteProps={{
            inputIcon: false,
          }}
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
        <Tools.Log />
      </Form.Card>
      <Form.SubmitButton />
    </Form.Handler>
  )
}
