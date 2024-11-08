import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex, P } from '@dnb/eufemia/src'
import { Field, Form, Value } from '@dnb/eufemia/src/extensions/forms'

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.SelectCountry placeholder="No values given" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox>
      <Value.SelectCountry value="NO" />
    </ComponentBox>
  )
}

export const DifferentLocale = () => {
  return (
    <ComponentBox>
      <Form.Handler locale="en-GB" data={{ myCountry: 'CH' }}>
        <Value.SelectCountry path="/myCountry" />
      </Form.Handler>
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Value.SelectCountry label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Value.SelectCountry label="Label text" value="NO" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        This is before the component{' '}
        <Value.SelectCountry value="NO" inline /> This is after the
        component
      </P>
    </ComponentBox>
  )
}

export const WithFieldAndValue = () => {
  return (
    <ComponentBox>
      <Form.Handler data={{ myCountry: 'NO' }}>
        <Flex.Stack>
          <Field.SelectCountry path="/myCountry" />
          <Value.SelectCountry path="/myCountry" />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}
