import { Connectors, Field, Form } from '@dnb/eufemia/extensions/forms'

const { withConfig } = Connectors.createContext({
  fetchConfig: {
    url: (value, { countryCode }) => {
      return `https://api.bring.com/address/api/${countryCode}/postal-codes/${value}`
    },
  },
})

const onChange = withConfig(Connectors.Bring.postalCode.autofill, {
  cityPath: '/city',
})

function MyForm() {
  return (
    <Form.Handler>
      <Field.PostalCodeAndCity
        postalCode={{
          path: '/postalCode',
          // @ts-expect-error – library typing: connector returns unknown value type, field expects string
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
