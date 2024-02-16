import { Field } from '../../..'

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
    />
  )
}
