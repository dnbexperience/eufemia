import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex, P } from '@dnb/eufemia/src'
import { Field, Form, Value } from '@dnb/eufemia/src/extensions/forms'

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Selection placeholder="No values selected" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Selection value="Bar" />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Selection label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Selection label="Label text" value="Foo" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <P>
        This is before the component
        <Value.Selection value="Baz" inline />
        This is after the component
      </P>
    </ComponentBox>
  )
}

export const FieldSelectionPath = () => {
  return (
    <ComponentBox>
      <Form.Handler
        data={{
          myPath: [
            { value: 'foo', title: 'Foo' },
            { value: 'bar', title: 'Bar' },
            { value: 'baz', title: 'Baz' },
          ],
        }}
      >
        <Flex.Stack>
          <Field.Selection label="My selection" path="/myPath" />
          <Value.Selection label="My selection" path="/myPath" />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const FieldSelectionAndOption = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Flex.Stack>
          <Field.Selection
            label="My selection"
            path="/myPath"
            variant="radio"
            value="bar"
          >
            <Field.Option value="foo" title="Foo" />
            <Field.Option value="bar" title="Bar" />
            <Field.Option value="baz" title="Baz" />
          </Field.Selection>

          <Value.Selection label="My selection" path="/myPath" />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}
