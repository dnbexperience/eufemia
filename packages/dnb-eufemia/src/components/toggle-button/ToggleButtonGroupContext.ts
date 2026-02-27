/**
 * Web ToggleButtonGroup Context
 *
 */

import React from 'react'

export interface ToggleButtonGroupContextValue {
  name?: string
  value?: string | number | Record<string, unknown> | any[]
  values?: any[]
  size?: string
  multiselect?: boolean | null
  variant?: string | null
  leftComponent?: React.ReactNode
  disabled?: boolean | null
  skeleton?: boolean | string | null
  setContext?: (
    context:
      | Record<string, unknown>
      | ((
          tmp: Record<string, unknown> | undefined
        ) => Record<string, unknown>)
  ) => void
  onChange?: (args: {
    value: unknown
    event: React.SyntheticEvent
  }) => void
}

const ToggleButtonGroupContext =
  React.createContext<ToggleButtonGroupContextValue>({})

export default ToggleButtonGroupContext
