import { Field, Form, Value } from '../../..'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Value/Selection',
}

export function ValueFromProps() {
  return (
    <Form.Handler>
      <Field.Selection path="/selection" variant="radio">
        <Field.Option value="foo" title="Fooo!" />
        <Field.Option value="bar" title="Baar!" />
        <Field.Option value="baz" title="Bazz!" />
        <Field.Option value="qux" title="Quxx!" />
      </Field.Selection>
      <Value.Selection label="My selection" path="/selection" />
    </Form.Handler>
  )
}

export function ValueFromPath() {
  return (
    <Form.Handler
      data={{
        myList: [
          { value: 'foo', title: 'Foo' },
          { value: 'bar', title: 'Bar' },
          { value: 'baz', title: 'Baz' },
        ],
        selection: 'bar',
      }}
    >
      <Flex.Stack>
        <Field.Selection
          variant="radio"
          label="My selection"
          dataPath="/myList"
          path="/selection"
        />
        <Value.Selection
          inheritLabel
          path="/selection"
          dataPath="/myList"
        />
      </Flex.Stack>
    </Form.Handler>
  )
}
