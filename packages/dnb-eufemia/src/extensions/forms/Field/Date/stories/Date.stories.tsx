import React from 'react'
import { Field, Value } from '../../..'
import FormHandler from '../../../Form/Handler/Handler'

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

export function Range() {
  return (
    <FormHandler data={{ myRange: '2023-01-16 2023-01-20' }}>
      <Field.Date path="/myRange" range />
      <Value.Date path="/myRange" variant="numeric" />
    </FormHandler>
  )
}
