import React, { useState } from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import Expiry, { ExpiryValue } from '../Expiry'

import '../style'

export default {
  title: 'Eufemia/Extensions/Forms/Field',
}
export const ExpiryTest = () => {
  function onChange(e) {
    console.log(e)
  }

  return <Expiry onChange={onChange} />
}
