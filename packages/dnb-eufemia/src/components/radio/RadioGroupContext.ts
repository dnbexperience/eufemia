/**
 * Web RadioGroup Context
 *
 */

import React from 'react'

import type { RadioGroupLabelPosition, RadioGroupSize } from './RadioGroup'

export type RadioGroupContextValue = {
  name?: string
  value?: string
  size?: RadioGroupSize
  disabled?: boolean
  labelPosition?: RadioGroupLabelPosition
  onChange?: (args: { value: string; event: React.SyntheticEvent }) => void
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({})

export default RadioGroupContext
