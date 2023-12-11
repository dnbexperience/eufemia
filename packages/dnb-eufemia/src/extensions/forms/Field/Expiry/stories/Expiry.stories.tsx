import { useState } from 'react'
import { Field } from '../../../'

export default {
  title: 'Eufemia/Extensions/Forms/Expiry',
}

export const Expiry = () => {
  const [value, setValue] = useState<string>('')
  console.log(value)

  function onChange(value: string) {
    setValue(value)
  }

  return <Field.Expiry onChange={onChange} value={value} />
}
