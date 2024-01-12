import React from 'react'
import { Field } from '../../..'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/String',
}

export const String = () => {
  return (
    <Flex.Stack>
      <Field.String label="Label" />
      <Field.String label="Label" multiline />

      <Field.String label="Label" width="small" />
      <Field.String label="Label" multiline width="small" />

      <Field.String label="Label" width="medium" />
      <Field.String label="Label" multiline width="medium" />

      <Field.String label="Label" width="large" />
      <Field.String label="Label" multiline width="large" />
    </Flex.Stack>
  )
}
