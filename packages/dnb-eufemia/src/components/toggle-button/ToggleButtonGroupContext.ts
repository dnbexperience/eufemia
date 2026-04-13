/**
 * Web ToggleButtonGroup Context
 *
 */

import React from 'react'
import type { ToggleButtonValue } from './ToggleButton'

export type ToggleButtonGroupContextValue = {
  name?: string
  value?: ToggleButtonValue | null
  values?: ToggleButtonValue[]
  size?: string
  multiselect?: boolean | null
  variant?: string | null
  leftComponent?: React.ReactNode
  disabled?: boolean | null
  skeleton?: boolean | string | null
  status?: string
  setContext?: (
    context:
      | Record<string, unknown>
      | ((
          tmp: Record<string, unknown> | undefined
        ) => Record<string, unknown>)
  ) => void
  onChange?: (args: {
    value: ToggleButtonValue | ToggleButtonValue[]
    event: React.SyntheticEvent
  }) => void
}

const ToggleButtonGroupContext =
  React.createContext<ToggleButtonGroupContextValue>({})

export default ToggleButtonGroupContext
