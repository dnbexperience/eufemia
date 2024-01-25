import React from 'react'
import { Field, Form, JSONSchema } from '../../..'
import { Flex } from '../../../../../components'
import Provider from '../Provider'

export default {
  title: 'Eufemia/Extensions/Forms/Provider',
}

const existingData = {
  count: 1,
  foo: 'bar',
}

const Component = () => {
  const { data, update } = Form.useData('update-id', existingData)

  const increment = React.useCallback(() => {
    update('/count', (count) => {
      return count + 1
    })
  }, [update])

  return (
    <Form.Handler id="update-id">
      <Flex.Horizontal>
        <Field.Number path="/count" showStepControls />
        <Form.SubmitButton
          onClick={increment}
          text={'Increment ' + data.count}
        />
      </Flex.Horizontal>
    </Form.Handler>
  )
}

export function Hook() {
  return (
    <Flex.Vertical>
      <Component />
      <Component />
    </Flex.Vertical>
  )
}

const initialSchema: JSONSchema = {
  type: 'object',
  properties: {
    txt: {
      type: 'string',
      pattern: '^(one|two|three)$',
    },
  },
}
const initialData = {}

export function Validation() {
  return (
    <Provider schema={initialSchema} data={initialData}>
      <Flex.Vertical>
        <Field.String path="/txt" validateInitially />

        <Field.String
          label="Field 1"
          path="/foo"
          errorMessages={{
            required: 'Required string',
          }}
          required
        />
        <Field.String
          label="Field 2"
          value="abc"
          minLength={5}
          errorMessages={{
            minLength: 'Min 5 chars',
          }}
        />
        <Field.Number
          label="Field 3"
          errorMessages={{
            required: 'Required number',
          }}
          required
        />

        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Flex.Vertical>
    </Provider>
  )
}
