import React from 'react'
import { Field, Form, Value } from '../../..'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Value/SelectCountry',
}

export function SelectCountryValue() {
  return (
    <Form.Handler>
      <Flex.Stack>
        <Field.SelectCountry path="/myCountry" value="NO" />
        <Value.SelectCountry path="/myCountry" />
      </Flex.Stack>
    </Form.Handler>
  )
}
