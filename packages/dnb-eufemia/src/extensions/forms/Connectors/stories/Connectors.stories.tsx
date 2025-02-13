import { Connectors, Field, Form } from '../../'
import { supportedCountries } from '../Bring/postalCode'

export default {
  title: 'Eufemia/Extensions/Forms/Connectors',
}

export function PostalCode() {
  // 1. Create a context with the config
  const { withConfig } = Connectors.createContext({
    fetchConfig: {
      url: (value, { country }) => {
        // Visit: https://cors-anywhere.herokuapp.com/corsdemo to enable this service
        return `https://cors-anywhere.herokuapp.com/https://api.bring.com/address/api/${country}/postal-codes/${value}`
      },
      headers: {
        'X-Mybring-API-Uid': 'Uid',
        'X-Mybring-API-Key': 'Key',
      },
    },
  })

  // 2. Use the context to create the onChangeValidator ...
  const onChangeValidator = withConfig(
    Connectors.Bring.postalCode.validator
  )

  // ... and an onChange function
  const onChange = withConfig(Connectors.Bring.postalCode.onChange, {
    cityPath: '/city',
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
          path="/country"
          // defaultValue="NO"
          defaultValue="SE"
          filterCountries={({ iso }) => supportedCountries.includes(iso)}
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
}
