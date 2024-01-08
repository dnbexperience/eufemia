import React from 'react'
import { Field } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/Date',
}

export function Date() {
  const [state, update] = React.useState('2023-01-16')
  React.useEffect(() => {
    update('2023-01-18')
  }, [])

  return (
    <Field.Date
      required
      // validateInitially
      value={state}
      onBlur={console.log}
      onFocus={console.log}
      onChange={(value) => {
        console.log('onChange', value)
        update(value)
      }}
    />
  )
}
