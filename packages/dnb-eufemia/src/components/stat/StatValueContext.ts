import { createContext } from 'react'
type StatValueContextValue = {
  useBasisSize: boolean
  defaultMainWeight: 'regular' | 'medium' | null
}

const StatValueContext = createContext<StatValueContextValue>({
  useBasisSize: false,
  defaultMainWeight: null,
})

export default StatValueContext
