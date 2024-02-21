import React from 'react'
import Field, { Form, JSONSchema, Value } from '../../../Forms'
import { Button, Flex } from '../../../../../components'

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

export function BooleanReset() {
  const { update, data } = Form.useData('unique')
  console.dir('data', data)

  return (
    <Form.Handler id="unique" data={{}}>
      <Flex.Vertical>
        <Field.Boolean
          variant="buttons"
          path="/questions/isThisTrue"
          label="Is this true?"
        />
        <Value.Boolean
          path="/questions/isThisTrue"
          label="Is it?"
          showEmpty
        />
        <Button
          onClick={() => update('/questions/isThisTrue', () => undefined)}
        >
          Reset
        </Button>
      </Flex.Vertical>
    </Form.Handler>
  )
}
