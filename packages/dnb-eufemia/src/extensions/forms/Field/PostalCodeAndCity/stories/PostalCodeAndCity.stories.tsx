import { Connectors, Field, Form, Value } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/PostalCodeAndCity',
}

export const PostalCodeAndCity = () => {
  return (
    <Field.PostalCodeAndCity
      postalCode={{
        label: 'With a very long label',
        error: new Error('Feil i postnummeret'),
      }}
      city={{
        label: 'With a very long label',
        error: new Error('Feil i poststedet'),
      }}
      error={
        new Error(
          'Flere feil (test) som går over flere linjer og som aldrig slutter'
        )
      }
      help={{
        title: 'Help is available',
        content:
          'Somewhere along the way, we must learn that there is nothing greater than to do something for others.',
      }}
    />
  )
}

export function PostalCodeAndCityCountryCodeSelection() {
  return (
    <>
      <Form.Handler>
        <Field.Selection path="/country" defaultValue="NO" variant="radio">
          <Field.Option value="NO" label="Norway" />
          <Field.Option value="DE" label="Germany" />
        </Field.Selection>
        <Field.PostalCodeAndCity
          country="/country"
          postalCode={{ path: '/postalCode' }}
          city={{ path: '/city' }}
        />
        <Value.PostalCodeAndCity
          postalCode={{ path: '/postalCode' }}
          city={{ path: '/city' }}
        />
      </Form.Handler>
    </>
  )
}

// 1. Create a context with the config
const { withConfig, handlerId } = Connectors.createContext({
  fetchConfig: {
    headers: {
      'X-Mybring-API-Uid': 'email',
      'X-Mybring-API-Key': 'token',
    },
  },
})

// 2. Use the context to create the onChangeValidator and onChange functions
const onChangeValidator = withConfig(
  Connectors.Bring.postalCode.onChangeValidator
)

// Should we name "onChange" to "autocompleteOnChange" or something like that?
const onChange = withConfig(Connectors.Bring.postalCode.onChange, {
  cityPath: '/city', // or targetPath?
})

export function PostalCodeAPI_Draft() {
  return (
    <Form.Handler
      id={handlerId}
      // defaultData={{ postalCode: '000', city: 'Oslo' }}
      onSubmit={async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 3000))
        console.log('onSubmit', data)
      }}
    >
      <Form.Card>
        <Field.PostalCodeAndCity
          postalCode={{
            path: '/postalCode',
            onChange,
            onChangeValidator,
            // validateInitially: true,
          }}
          city={{
            path: '/city',
            // readOnly: true,
            onChange: async (value) => {
              console.log('value', value)
              // await new Promise((resolve) => setTimeout(resolve, 2000))
              // console.log('onChange', value)
              // return { success: 'saved' }
            },
          }}
        />
      </Form.Card>
      <Form.SubmitButton />
    </Form.Handler>
  )
}
