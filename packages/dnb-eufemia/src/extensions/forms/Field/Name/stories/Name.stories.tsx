import React from 'react'
import { Field } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/Name',
}

export function Name() {
  return (
    <Field.Name.First
      required
      onBlur={console.log}
      onFocus={console.log}
      onChange={(value) => {
        console.log('onChange', value)
      }}
    />
  )
}
