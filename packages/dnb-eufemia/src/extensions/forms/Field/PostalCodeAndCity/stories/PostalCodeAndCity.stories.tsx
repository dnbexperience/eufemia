import { Field, Form, Value } from '../../..'

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
