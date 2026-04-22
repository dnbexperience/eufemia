import React from 'react'

type StatValueContextValue = {
  useBasisSize: boolean
  defaultMainWeight: 'regular' | 'medium' | null
}

const StatValueContext = React.createContext<StatValueContextValue>({
  useBasisSize: false,
  defaultMainWeight: null,
})

export default StatValueContext
