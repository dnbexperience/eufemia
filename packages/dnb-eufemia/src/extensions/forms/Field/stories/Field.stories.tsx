import { useState } from 'react'
import Expiry, { ExpiryValue } from '../Expiry'

import '../style'

export default {
  title: 'Eufemia/Extensions/Forms/Field',
}
export const ExpiryTest = () => {
  const [value, setValue] = useState<ExpiryValue>({ month: '', year: '' })

  return (
    <Expiry
      onChange={setValue}
      value={{ month: value.month, year: value.year }}
    />
  )
}
