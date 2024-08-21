import { Field, Form, Value } from '../../..'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Value/ArraySelection',
}

export function ArraySelectionValue() {
  return (
    <Form.Handler>
      <Flex.Stack>
        <Field.ArraySelection path="/selection">
          <Field.Option value="foo" title="Fooo!" />
          <Field.Option value="bar" title="Baar!" />
          <Field.Option value="baz" title="Bazz!" />
          <Field.Option value="qux" title="Quxx!" />
        </Field.ArraySelection>
        <Value.ArraySelection label="My selection" path="/selection" />
      </Flex.Stack>
    </Form.Handler>
  )
}
