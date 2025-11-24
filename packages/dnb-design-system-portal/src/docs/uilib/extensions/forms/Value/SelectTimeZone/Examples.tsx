import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex, P } from '@dnb/eufemia/src'
import { Field, Form, Value } from '@dnb/eufemia/src/extensions/forms'

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.SelectTimeZone placeholder="No value given" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox>
      <Value.SelectTimeZone value="Europe/Oslo" />
    </ComponentBox>
  )
}

export const DifferentLocale = () => {
  return (
    <ComponentBox>
      <Form.Handler locale="en-GB" data={{ myTimezone: 'Europe/Copenhagen' }}>
        <Value.SelectTimeZone path="/myTimezone" />
      </Form.Handler>
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Value.SelectTimeZone label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Value.SelectTimeZone label="Label text" value="Europe/Oslo" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        This is before the component{' '}
        <Value.SelectTimeZone value="Europe/Oslo" inline /> This is after the
        component
      </P>
    </ComponentBox>
  )
}

export const WithFieldAndValue = () => {
  return (
    <ComponentBox>
      <Form.Handler data={{ myTimezone: 'Europe/Oslo' }}>
        <Flex.Stack>
          <Field.SelectTimeZone path="/myTimezone" />
          <Value.SelectTimeZone path="/myTimezone" />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

