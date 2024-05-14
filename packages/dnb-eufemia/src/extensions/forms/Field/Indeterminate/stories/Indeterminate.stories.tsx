import React from 'react'
import Field, { Form } from '../../../Forms'
import { Card } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Indeterminate',
}

export function WithToggle() {
  return (
    <Form.Handler onSubmit={console.log}>
      <Card stack>
        <Field.Indeterminate
          dependencePaths={['/checkbox1', '/checkbox2', '/checkbox3']}
          label="Indeterminate"
        />

        <Field.Toggle
          label="Checkbox 1"
          path="/checkbox1"
          valueOn="what-ever"
          valueOff="you-name-it"
          required
        />

        <Field.Boolean label="Checkbox 2" path="/checkbox2" required />

        <Field.Toggle
          label="Checkbox 3"
          path="/checkbox3"
          valueOn="on"
          valueOff="off"
        />
      </Card>

      <Form.SubmitButton />
    </Form.Handler>
  )
}
