/**
 * Web ToggleButtonGroup Context
 *
 */

import { createContext } from 'react'
import type { ReactNode, SyntheticEvent } from 'react'
import type { ToggleButtonValue } from './ToggleButton'

export type ToggleButtonGroupContextValue = {
  name?: string
  value?: ToggleButtonValue | null
  values?: ToggleButtonValue[]
  size?: string
  multiselect?: boolean | null
  variant?: string | null
  leftComponent?: ReactNode
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
    event: SyntheticEvent
  }) => void
}

const ToggleButtonGroupContext =
  createContext<ToggleButtonGroupContextValue>({})

export default ToggleButtonGroupContext
