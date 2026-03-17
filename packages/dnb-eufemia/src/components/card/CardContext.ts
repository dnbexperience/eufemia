import React from 'react'

export type CardContextValue = {
  isNested?: boolean
}

const CardContext = React.createContext<CardContextValue | undefined>(
  undefined
)

export default CardContext
