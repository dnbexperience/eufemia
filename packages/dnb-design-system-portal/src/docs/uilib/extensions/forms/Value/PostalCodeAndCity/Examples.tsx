import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Form, Value } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.PostalCodeAndCity showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.PostalCodeAndCity placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.PostalCodeAndCity value="0010 Oslo" />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.PostalCodeAndCity label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.PostalCodeAndCity label="Label text" value="0010 Oslo" />
    </ComponentBox>
  )
}

export const LabelAndValueFromDataContext = () => {
  return (
    <ComponentBox scope={{ Value }}>
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
    <ComponentBox scope={{ Value }}>
      <P>
        This is before the component
        <Value.PostalCodeAndCity value="0010 Oslo" inline />
        This is after the component
      </P>
    </ComponentBox>
  )
}
