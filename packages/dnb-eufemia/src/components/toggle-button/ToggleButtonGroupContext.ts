/**
 * Web ToggleButtonGroup Context
 *
 */

import React from 'react'

export type ToggleButtonGroupContextValue = {
  name?: string
  value?: string | number | Record<string, unknown> | any[] | null
  values?: string | any[]
  size?: 'default' | 'small' | 'medium' | 'large'
  multiselect?: boolean
  variant?: 'default' | 'checkbox' | 'radio'
  leftComponent?: React.ReactNode
  disabled?: boolean
  skeleton?: boolean
  status?: string
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
