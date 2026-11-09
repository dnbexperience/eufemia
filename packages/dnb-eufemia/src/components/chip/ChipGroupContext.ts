import { createContext } from 'react'
import type { ChipVariant } from './Chip'

export type ChipGroupContextValue = {
  variant?: ChipVariant
}

const ChipGroupContext = createContext<ChipGroupContextValue>({})

export default ChipGroupContext
