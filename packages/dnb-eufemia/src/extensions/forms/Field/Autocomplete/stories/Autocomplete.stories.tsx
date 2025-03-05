import React from 'react'
import { Field, Form } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/Autocomplete',
}

export function Autocomplete() {
  return (
    <Form.Card>
      <Field.Autocomplete
        label="Label"
        required
        validateInitially
        onChange={(value) => console.log('onChange', value)}
      >
        {/* <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" /> */}
      </Field.Autocomplete>
    </Form.Card>
  )
}
