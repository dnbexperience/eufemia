import React from 'react'
import { Field, Value } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/Currency',
}

export function Currency() {
  return (
    <>
      <Field.Currency
        label="Amount"
        value={1234.56}
        // currency="USD"
        // currencyDisplay="code"
      />
      <Value.Currency
        label="Amount"
        value={1234.56}
        showEmpty
        // currency="USD"
        // currencyDisplay="code"
      />
    </>
  )
}
