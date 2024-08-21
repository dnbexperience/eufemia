import { Field, Form, Value } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/ArraySelection',
}

export function ArraySelectionValue() {
  return (
    <Form.Handler>
      <Field.ArraySelection path="/selection">
        <Field.Option value="foo" title="Fooo!" />
        <Field.Option value="bar" title="Baar!" />
        <Field.Option value="baz" title="Bazz!" />
        <Field.Option value="qux" title="Quxx!" />
      </Field.ArraySelection>
      <Value.ArraySelection label="My selection" path="/selection" />
    </Form.Handler>
  )
}
