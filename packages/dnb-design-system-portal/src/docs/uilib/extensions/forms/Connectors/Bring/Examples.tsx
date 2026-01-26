import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { getMockData as getMockDataPostalCode } from '@dnb/eufemia/src/extensions/forms/Connectors/Bring/postalCode'
import { getMockData as getMockDataAddress } from '@dnb/eufemia/src/extensions/forms/Connectors/Bring/address'
import { Form, Field, Connectors } from '@dnb/eufemia/src/extensions/forms'

let mockFetchTimeout = null
async function mockFetch(countryCode: string, data) {
  const originalFetch = globalThis.fetch

  globalThis.fetch = () => {
    return Promise.resolve({
      ok: true,
      json: () => {
        return Promise.resolve(data)
      },
    }) as any
  }

  await new Promise((resolve) => setTimeout(resolve, 1000))

  clearTimeout(mockFetchTimeout)
  mockFetchTimeout = setTimeout(() => {
    globalThis.fetch = originalFetch
  }, 1100)
}

export const PostalCode = () => {
  return (
    <ComponentBox scope={{ Connectors, getMockDataPostalCode, mockFetch }}>
      {() => {
        const { withConfig } = Connectors.createContext({
          fetchConfig: {
            url: async (value, { countryCode }) => {
              await mockFetch(
                countryCode,
                getMockDataPostalCode(countryCode)
              )
              return `[YOUR-API-URL]/${value}`
            },
          },
        })

        const onBlurValidator = withConfig(
          Connectors.Bring.postalCode.validator
        )

        const onBlur = withConfig(Connectors.Bring.postalCode.autofill, {
          cityPath: '/city',
        })

        return (
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
      }}
    </ComponentBox>
  )
}

export const Address = () => {
  return (
    <ComponentBox scope={{ Connectors, getMockDataAddress, mockFetch }}>
      {() => {
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

        return (
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
      }}
    </ComponentBox>
  )
}
