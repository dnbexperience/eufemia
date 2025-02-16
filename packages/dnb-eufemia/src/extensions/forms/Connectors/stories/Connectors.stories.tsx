import { Connectors, Field, Form } from '../../'
import { supportedCountryCodes } from '../Bring/postalCode'

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
          // defaultValue="NO"
          defaultValue="SE"
          filterCountries={({ iso }) =>
            supportedCountryCodes.includes(iso)
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
