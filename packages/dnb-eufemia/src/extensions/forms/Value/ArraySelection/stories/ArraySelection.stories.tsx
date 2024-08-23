import { useState } from 'react'
import { Field, Form, Value } from '../../..'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Value/ArraySelection',
}

export function ArraySelectionValue() {
  const [count, setCount] = useState(0)
  return (
    <Form.Handler>
      <Flex.Stack>
        <Field.ArraySelection
          defaultValue={['foo', 'bar', 'baz']}
          label="My selection"
          path="/selection"
        >
          <Field.Option value="foo" title="Fooo!" />
          <Field.Option value="bar" title={<span>Baar!</span>} />
          <Field.Option value="baz" title="Bazz!" />
          <Field.Option value="qux" title="Quxx!" />
        </Field.ArraySelection>
        <Value.ArraySelection label="My selection" path="/selection" />
        <button onClick={() => setCount(count + 1)}> {count}</button>
      </Flex.Stack>
    </Form.Handler>
  )
}
