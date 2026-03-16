import React from 'react'

export type CardContextState = {
  isNested?: boolean
}

const CardContext = React.createContext<CardContextState | undefined>(
  undefined
)

export default CardContext
