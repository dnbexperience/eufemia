import React from 'react'
import { Field } from '../../..'

export default {
  title: 'Eufemia/Forms/SelectCountry',
}

export function SelectCountry() {
  const [state, update] = React.useState('NO')
  React.useEffect(() => {
    update('CH')
  }, [])
  return (
    <Field.SelectCountry
      required
      value={state}
      onChange={(value, data) => {
        console.log('onChange', value, data)
        update(value)
      }}
    />
  )
}
