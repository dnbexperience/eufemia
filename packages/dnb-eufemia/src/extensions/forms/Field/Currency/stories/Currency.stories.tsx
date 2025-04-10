import React from 'react'
import { Field } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/Currency',
}

export function Currency() {
  return (
    <Field.Currency
      label="Amount"
      currencyDisplay="name"
      onChange={(value) => console.log('onChange', value)}
    />
  )
}
