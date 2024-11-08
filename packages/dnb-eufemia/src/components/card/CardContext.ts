import React from 'react'

export interface CardContextState {
  isNested?: boolean
}

const CardContext = React.createContext<CardContextState | undefined>(
  undefined
)

export default CardContext
