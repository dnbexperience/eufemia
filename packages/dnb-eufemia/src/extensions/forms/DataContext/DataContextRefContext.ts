import { createContext } from 'react'
import type { ContextState } from './Context'

export type DataContextRef = {
  current: ContextState | undefined
}

const DataContextRefContext = createContext<DataContextRef | null>(null)

export default DataContextRefContext
