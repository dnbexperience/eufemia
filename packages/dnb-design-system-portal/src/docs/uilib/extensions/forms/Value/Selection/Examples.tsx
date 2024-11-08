import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex, P } from '@dnb/eufemia/src'
import { Field, Form, Value } from '@dnb/eufemia/src/extensions/forms'

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.Selection placeholder="No values selected" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox>
      <Value.Selection value="Bar" />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Value.Selection label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Value.Selection label="Label text" value="Foo" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        This is before the component <Value.Selection value="Baz" inline />{' '}
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
          selection: 'bar',
          myList: [
            { value: 'foo', title: 'Foo' },
            { value: 'bar', title: 'Bar' },
            { value: 'baz', title: 'Baz' },
          ],
        }}
      >
        <Flex.Stack>
          <Field.Selection
            path="/selection"
            dataPath="/myList"
            variant="radio"
            label="My selection"
          />
          <Value.Selection
            path="/selection"
            dataPath="/myList"
            inheritLabel
          />
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
