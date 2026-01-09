import React from 'react'
import type { JSONSchema } from '../../../Forms';
import { Field, Form } from '../../../Forms'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Composition',
}

export function Composition() {
  return (
    <Field.Composition>
      <Field.String label="A" />
      <Field.String label="B" />
    </Field.Composition>
  )
}

export function Schema() {
  const schema: JSONSchema = {
    type: 'object',
    required: ['first', 'last'],
    properties: {
      first: {
        type: 'string',
      },
      last: {
        type: 'string',
      },
    },
  }

  return (
    <Form.Handler schema={schema}>
      <Flex.Stack>
        <Field.Composition width="large">
          <Field.String label="First" path="/first" />
          <Field.String label="Last" path="/last" />
        </Field.Composition>

        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
  )
}
