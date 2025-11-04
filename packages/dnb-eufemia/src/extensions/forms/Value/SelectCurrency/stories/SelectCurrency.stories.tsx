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
        <Field.SelectCurrency path="/myCurrency" value="NOK" />
        <Value.SelectCurrency path="/myCurrency" />
      </Flex.Stack>
    </Form.Handler>
  )
}
