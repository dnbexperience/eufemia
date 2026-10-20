import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Form, Value } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox>
      <Value.PostalCodeAndCity showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.PostalCodeAndCity placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox>
      <Value.PostalCodeAndCity value="0010 Oslo" />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Value.PostalCodeAndCity label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Value.PostalCodeAndCity label="Label text" value="0010 Oslo" />
    </ComponentBox>
  )
}

export const LabelAndValueFromDataContext = () => {
  return (
    <ComponentBox>
      <Form.Handler data={{ myPostalCode: '0010', myCity: 'Oslo' }}>
        <Value.PostalCodeAndCity
          postalCode={{ path: '/myPostalCode' }}
          city={{ path: '/myCity' }}
        />
      </Form.Handler>
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        This is before the component{' '}
        <Value.PostalCodeAndCity value="0010 Oslo" inline /> This is after
        the component
      </P>
    </ComponentBox>
  )
}
