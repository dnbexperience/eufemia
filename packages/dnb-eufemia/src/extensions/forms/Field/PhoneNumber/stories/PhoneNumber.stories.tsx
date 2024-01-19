import React from 'react'
import { Field, Form } from '../../..'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/PhoneNumber',
}

const initialData = { phone: '+47 423456789' }

export function PhoneNumber() {
  const { update } = Form.useData('uniqueId')

  React.useLayoutEffect(() => {
    update('/phone', () => '+41 123')
  }, [update])

  return (
    <Form.Handler id="uniqueId" data={initialData}>
      <Flex.Stack>
        <Field.PhoneNumber
          pattern="((?=\+47)^\+47 [49]\d{7}$)|((?!\+47)^\+\d{2} \d{6})"
          // pattern="^\+47 [49]+"
          // required
          // validateInitially
          path="/phone"
          onBlur={console.log}
          onFocus={console.log}
          onChange={(value) => {
            console.log('onChange', value)
            update('/phone', () => value)
          }}
        />
        <Field.String label="Shadow" path="/phone" />
        <Form.ButtonRow>
          <Form.SubmitButton />
        </Form.ButtonRow>
      </Flex.Stack>
    </Form.Handler>
  )
}
