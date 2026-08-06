import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { getMockData as getMockDataPostalCode } from '@dnb/eufemia/src/extensions/forms/Connectors/Bring/postalCode'
import { getMockData as getMockDataAddress } from '@dnb/eufemia/src/extensions/forms/Connectors/Bring/address'
import { Form, Field, Connectors } from '@dnb/eufemia/src/extensions/forms'

const mockResponses = new Map<string, unknown>()
let originalFetch: typeof globalThis.fetch | undefined
let mockFetchImplementation: typeof globalThis.fetch | undefined

export function resetMockFetch() {
  mockResponses.clear()

  if (originalFetch) {
    globalThis.fetch = originalFetch
  }

  originalFetch = undefined
  mockFetchImplementation = undefined
}

export async function mockFetch(url: string, data: unknown) {
  mockResponses.set(url, data)

  if (globalThis.fetch !== mockFetchImplementation) {
    originalFetch = globalThis.fetch
    const fallbackFetch = originalFetch
    mockFetchImplementation = (input, init) => {
      const requestUrl =
        typeof input === 'string'
          ? input
          : input instanceof URL
            ? input.href
            : input.url

      if (mockResponses.has(requestUrl)) {
        return Promise.resolve(
          new Response(JSON.stringify(mockResponses.get(requestUrl)), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        )
      }

      return fallbackFetch(input, init)
    }
    globalThis.fetch = mockFetchImplementation
  }

  await new Promise((resolve) => setTimeout(resolve, 1000))
}

export const PostalCode = () => {
  return (
    <ComponentBox scope={{ Connectors, getMockDataPostalCode, mockFetch }}>
      {() => {
        const { withConfig } = Connectors.createContext({
          fetchConfig: {
            url: async (value, { countryCode }) => {
              const url = `[YOUR-API-URL]/postal-code/${value}`
              await mockFetch(url, getMockDataPostalCode(countryCode))
              return url
            },
          },
        })

        const onChangeValidator = withConfig(
          Connectors.Bring.postalCode.validator
        )

        const onChange = withConfig(Connectors.Bring.postalCode.autofill, {
          cityPath: '/city',
        })

        return (
          <Form.Handler onSubmit={console.log}>
            <Form.Card>
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
              const url = `[YOUR-API-URL]/address/${value}`
              await mockFetch(url, getMockDataAddress(countryCode))
              return url
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
