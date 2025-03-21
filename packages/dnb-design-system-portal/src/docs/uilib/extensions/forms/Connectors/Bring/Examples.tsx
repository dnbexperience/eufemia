import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { getMockData } from '@dnb/eufemia/src/extensions/forms/Connectors/Bring/postalCode'
import { Form, Field, Connectors } from '@dnb/eufemia/src/extensions/forms'

let mockFetchTimeout = null
async function mockFetch(countryCode: string) {
  const originalFetch = globalThis.fetch

  globalThis.fetch = () => {
    return Promise.resolve({
      ok: true,
      json: () => {
        return Promise.resolve(getMockData(countryCode))
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
    <ComponentBox scope={{ Connectors, getMockData, mockFetch }}>
      {() => {
        const { withConfig } = Connectors.createContext({
          fetchConfig: {
            url: async (value, { countryCode }) => {
              await mockFetch(countryCode)
              return '[YOUR-API-URL]/' + value
            },
          },
        })

        const onBlurValidator = withConfig(
          Connectors.Bring.postalCode.validator,
        )

        const onChange = withConfig(Connectors.Bring.postalCode.autofill, {
          cityPath: '/city',
        })

        return (
          <Form.Handler onSubmit={console.log}>
            <Form.Card>
              <Field.SelectCountry
                path="/countryCode"
                defaultValue="NO"
                filterCountries={({ iso }) => ['NO', 'SE'].includes(iso)}
              />
              <Field.PostalCodeAndCity
                countryCode="/countryCode"
                postalCode={{
                  path: '/postalCode',
                  onBlurValidator,
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
      }}
    </ComponentBox>
  )
}
