import React from 'react'
import { Card } from '../../../../../components'
import { Field } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/Selection',
}

export function Selection() {
  return (
    <Card stack>
      <Field.Selection
        label="Label"
        required
        validateInitially
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>

      <Field.Selection
        label="Label"
        required
        validateInitially
        variant="radio"
        layout="horizontal"
        optionsLayout="horizontal"
        // error={new FormError('This is what is wrong...')}
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option
          value="foo"
          title="Foo!"
          // error={new FormError('This is what is wrong...')}
        />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>

      <Field.Selection
        label="Label"
        required
        validateInitially
        variant="button"
        layout="horizontal"
        optionsLayout="horizontal"
        value="foo"
        // error={new FormError('This is what is wrong...')}
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option
          value="foo"
          title="Foo!"
          // error={new FormError('This is what is wrong...')}
        />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>
    </Card>
  )
}
