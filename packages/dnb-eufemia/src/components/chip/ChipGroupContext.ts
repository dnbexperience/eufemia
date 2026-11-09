import { createContext } from 'react'
import type { ChipChangeEvent, ChipGroupProps } from './types'

type ChipGroupContextValue = Pick<
  ChipGroupProps,
  'name' | 'variant' | 'multiselect' | 'disabled' | 'readOnly' | 'skeleton'
> & {
  value?: string
  values: string[]
  invalid: boolean
  describedBy?: string
  onChange: (event: ChipChangeEvent) => void
}

export default createContext<ChipGroupContextValue | undefined>(undefined)
