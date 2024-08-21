import { Field, Form, Value } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/Selection',
}

export function SelectionValue() {
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
