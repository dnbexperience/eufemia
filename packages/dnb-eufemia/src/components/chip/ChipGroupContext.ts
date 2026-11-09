import { createContext } from 'react'
import type { ChipVariant } from './Chip'

export type ChipGroupContextValue = {
  variant?: ChipVariant
  status?: 'error'
}

const ChipGroupContext = createContext<ChipGroupContextValue>({})

export default ChipGroupContext
