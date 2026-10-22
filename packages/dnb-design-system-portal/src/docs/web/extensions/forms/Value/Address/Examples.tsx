import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Form, Value } from '@dnb/eufemia/src/extensions/forms'

export const PostalAddress = () => {
  return (
    <ComponentBox>
      <Value.Address.Postal value="Postboks 55 Falkum 3705 Skien" />
    </ComponentBox>
  )
}

export const StreetAddress = () => {
  return (
    <ComponentBox>
      <Value.Address.Street value="Dronning Eufemias gate 30" />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.Address.Street placeholder="Custom placeholder" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <Form.Handler
        defaultData={{
          streetAddress: 'Dronning Eufemias gate 30',
          postalAddress: 'Postboks 55 Falkum 3705 Skien',
        }}
      >
        <P>
          This is before the component{' '}
          <Value.Address.Street path="/streetAddress" inline />{' '}
          <Value.Address.Postal path="/postalAddress" inline /> This is
          after the component
        </P>
      </Form.Handler>
    </ComponentBox>
  )
}
