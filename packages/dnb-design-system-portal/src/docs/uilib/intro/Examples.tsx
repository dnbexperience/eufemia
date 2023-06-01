import React from 'react'

import ComponentBox from '../../../shared/tags/ComponentBox'
import { Button, Input } from '@dnb/eufemia/src'

export const LayoutExample = () => (
  <ComponentBox>
    <Input label="My Input" value="Input" right="small" />
    <Button text="Button" />
  </ComponentBox>
)
