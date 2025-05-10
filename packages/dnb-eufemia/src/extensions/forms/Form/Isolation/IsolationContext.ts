import { createContext } from 'react'
import { ContextState } from '../../DataContext/Context'

export type IsolationContext = {
  outerContext: ContextState
  requireCommit: boolean
}

const IsolationContext = createContext<IsolationContext>(null)

export default IsolationContext
