import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex, P } from '@dnb/eufemia/src'
import { Field, Form, Value } from '@dnb/eufemia/src/extensions/forms'

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.SelectCurrency placeholder="No value given" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox>
      <Value.SelectCurrency value="NOK" />
    </ComponentBox>
  )
}

export const DifferentLocale = () => {
  return (
    <ComponentBox>
      <Form.Handler locale="en-GB" data={{ myCurrency: 'CHF' }}>
        <Value.SelectCurrency path="/myCurrency" />
      </Form.Handler>
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Value.SelectCurrency label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Value.SelectCurrency label="Label text" value="NOK" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        This is before the component{' '}
        <Value.SelectCurrency value="NOK" inline /> This is after the
        component
      </P>
    </ComponentBox>
  )
}

export const WithFieldAndValue = () => {
  return (
    <ComponentBox>
      <Form.Handler data={{ myCurrency: 'NOK' }}>
        <Flex.Stack>
          <Field.SelectCurrency path="/myCurrency" />
          <Value.SelectCurrency path="/myCurrency" />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}
