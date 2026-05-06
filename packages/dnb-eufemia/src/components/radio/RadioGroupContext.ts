/**
 * Web RadioGroup Context
 *
 */

import { createContext } from 'react'
import type { SyntheticEvent } from 'react'

import type { RadioGroupLabelPosition, RadioGroupSize } from './RadioGroup'

export type RadioGroupContextValue = {
  name?: string
  value?: string
  size?: RadioGroupSize
  disabled?: boolean
  labelPosition?: RadioGroupLabelPosition
  onChange?: (args: { value: string; event: SyntheticEvent }) => void
}

const RadioGroupContext = createContext<RadioGroupContextValue>({})

export default RadioGroupContext
