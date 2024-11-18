import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { getMockData } from '@dnb/eufemia/src/extensions/forms/Connectors/Bring/postalCode'
import { Form, Field, Connectors } from '@dnb/eufemia/src/extensions/forms'

let mockFetchTimeout = null
async function mockFetch(country: string) {
  const originalFetch = globalThis.fetch

  globalThis.fetch = () => {
    return Promise.resolve({
      ok: true,
      json: () => {
        return Promise.resolve(getMockData(country))
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
            url: async (value, { country }) => {
              await mockFetch(country)
              return '[YOUR-API-URL]/' + value
            },
          },
        })

        const onChangeValidator = withConfig(
          Connectors.Bring.postalCode.onChangeValidator,
        )

        const onChange = withConfig(Connectors.Bring.postalCode.onChange, {
          cityPath: '/city',
        })

        return (
          <Form.Handler onSubmit={console.log}>
            <Form.Card>
              <Field.SelectCountry
                path="/country"
                defaultValue="NO"
                filterCountries={({ iso }) => ['NO', 'SE'].includes(iso)}
              />
              <Field.PostalCodeAndCity
                country="/country"
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
      }}
    </ComponentBox>
  )
}
