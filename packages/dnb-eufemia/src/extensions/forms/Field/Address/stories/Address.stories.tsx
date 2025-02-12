import React from 'react'
import { Field } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/Address',
}

export function Address() {
  const [state, update] = React.useState(' Dronning Eufemias gate 30 ')
  React.useEffect(() => {
    update(' Dronning Eufemias gate 30 ')
  }, [])

  return (
    <Field.Address
      required
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
