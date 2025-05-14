import { createContext } from 'react'
import { ContextState } from '../../DataContext/Context'
import { IsolationResetSnapshot } from './IsolationResetSnapshot'

export type IsolationContext = {
  resetSnapshot: IsolationResetSnapshot
  resetAfterCommit: boolean
  outerContext: ContextState
}

const IsolationContext = createContext<IsolationContext>(null)

export default IsolationContext
