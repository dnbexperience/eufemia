import { createContext } from 'react'
import type { ChipChangeEvent, ChipGroupProps, ChipValue } from './types'

type ChipGroupContextValue = Pick<
  ChipGroupProps,
  | 'name'
  | 'variant'
  | 'size'
  | 'selectionMode'
  | 'disabled'
  | 'readOnly'
  | 'skeleton'
> & {
  value?: ChipValue
  values: ChipValue[]
  invalid: boolean
  describedBy?: string
  onChange: (event: ChipChangeEvent) => void
}

export default createContext<ChipGroupContextValue | undefined>(undefined)
