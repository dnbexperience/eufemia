import React from 'react'

type StatRootContextValue = {
  inRoot: boolean
}

const StatRootContext = React.createContext<StatRootContextValue>({
  inRoot: false,
})

export default StatRootContext
