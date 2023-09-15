import React, { useState } from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import Expiry, { ExpiryValue } from '../Expiry'

export default {
  title: 'Eufemia/Extensions/Forms/Field',
}
export const ExpiryTest = () => {
  const [value, setValue] = useState<string>('')

  function onChange({ month, year, raw, formatted }: ExpiryValue) {
    setValue(formatted)

    console.log('month', month)
    console.log('year', year)
    console.log('raw', raw)
    console.log('formatted', formatted)
  }

  return (
    <Wrapper>
      <Box>
        <Expiry placeholder="dashes" value={value} onChange={onChange} />
        <Expiry placeholder="letters" value={value} onChange={onChange} />
        <Expiry placeholder="spaces" value={value} onChange={onChange} />
        <Expiry placeholder="none" value={value} onChange={onChange} />
        <p>{value}</p>
      </Box>
    </Wrapper>
  )
}
