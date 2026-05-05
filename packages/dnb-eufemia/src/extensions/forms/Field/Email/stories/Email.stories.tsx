import { useEffect, useState } from 'react'
import { Field } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/Email',
}

export function Email() {
  const [state, update] = useState(' me@mail ')
  useEffect(() => {
    update(' me@mail.com ')
  }, [])

  return (
    <Field.Email
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

export function Crashes() {
  return (
    <Field.Email
      value={
        'hehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehehe'
      }
    />
  )
}
