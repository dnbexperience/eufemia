/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { DateFormat } from '@dnb/eufemia/src'

export const DateFormatExample = () => (
  <ComponentBox>
    <DateFormat date={new Date()} />
  </ComponentBox>
)
