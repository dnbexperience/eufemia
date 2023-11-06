import { useState } from 'react'
import Expiry, { ExpiryValue } from '../Expiry'

export default {
  title: 'Eufemia/Extensions/Forms/Field/Expiry',
}
export const ExpiryTest = () => {
  const [value, setValue] = useState<ExpiryValue>({ month: '', year: '' })
  console.log(value)

  function onChange(value: ExpiryValue) {
    setValue(value)
  }

  return (
    <Expiry
      onChange={onChange}
      value={{ month: value.month, year: value.year }}
    />
  )
}
