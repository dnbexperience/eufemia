import React from 'react'
import { Field, Form, FormError } from '../../..'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/PhoneNumber',
}

const initialData = { phone: '+47 42345678' }

const makeRequest = async (value) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false)
    }, 1000)
  })
}

const onChangeValidator = async (value) => {
  // Delay the response
  const isValid = await makeRequest(value)
  if (!isValid) {
    return new FormError('Field.errorRequired')
  }
}

export function PhoneNumber() {
  const { update } = Form.useData('uniqueId')

  React.useEffect(() => {
    update('/phone', () => '+41 123')
  }, [update])

  return (
    <Form.Handler id="uniqueId" data={initialData}>
      <Flex.Stack>
        <Field.PhoneNumber
          required
          onChangeValidator={onChangeValidator}
          // pattern="^\+41 [1]\d{2}$"
          validateInitially
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
