import React from 'react'
import { Field } from '../../..'

export default {
  title: 'Eufemia/Forms/PhoneNumber',
}

export function PhoneNumber() {
  const [state, update] = React.useState('+47 1')
  // const [state, update] = React.useState(undefined)
  React.useEffect(() => {
    // update('+41 1')
    update('+45')
  }, [])
  return (
    <Field.PhoneNumber
      required
      pattern="^[49]+"
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
