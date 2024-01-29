import React from 'react'
import Field, { Form, JSONSchema } from '../../../Forms'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Boolean',
}

const schema: JSONSchema = {
  type: 'object',
  properties: {
    hasEmployees: {
      type: 'boolean',
      const: true,
    },
  },
  required: ['hasEmployees'],
}

export function Boolean() {
  return (
    <Form.Handler schema={schema} onSubmit={console.log}>
      <Flex.Vertical>
        <Field.Boolean
          label="Has Employees"
          path="/hasEmployees"
          validateInitially
        />

        <Form.SubmitButton />
      </Flex.Vertical>
    </Form.Handler>
  )
}
