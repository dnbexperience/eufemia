import { Connectors, Field, Form } from '@dnb/eufemia/extensions/forms'

const { withConfig } = Connectors.createContext({
  fetchConfig: {
    url: (value, { countryCode }) => {
      return `https://api.bring.com/address/api/${countryCode}/postal-codes/${value}`
    },
  },
})

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
