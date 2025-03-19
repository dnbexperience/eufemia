import React from 'react'
import { Field, Form, Value } from '../../..'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Value/SelectCurrency',
}

export function SelectCurrencyValue() {
  return (
    <Form.Handler>
      <Flex.Stack>
        <Field.SelectCurrency
          path="/myCurrency"
          value="NOK"
          // defaultValue="NOK"
        />
        <Value.SelectCurrency
          // label="Custom Label"
          path="/myCurrency"
          // defaultValue="NOK"
        />
      </Flex.Stack>
    </Form.Handler>
  )
}
