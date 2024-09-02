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
        <Field.SelectCountry
          path="/myCountry"
          value="NO"
          // defaultValue="NO"
        />
        <Value.SelectCountry
          // label="Custom Label"
          path="/myCountry"
          // defaultValue="NO"
        />
      </Flex.Stack>
    </Form.Handler>
  )
}
