import { useState } from 'react'
import Expiry from '../Expiry'

export default {
  title: 'Eufemia/Extensions/Forms/Field/Expiry',
}
export const ExpiryTest = () => {
  const [value, setValue] = useState<string>('')
  console.log(value)

  function onChange(value: string) {
    setValue(value)
  }

  return <Expiry onChange={onChange} value={value} />
}
