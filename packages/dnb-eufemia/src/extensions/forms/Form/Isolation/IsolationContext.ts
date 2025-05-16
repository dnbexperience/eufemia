import { createContext } from 'react'
import { ContextState } from '../../DataContext/Context'
import { IsolationDataReference } from './IsolationDataReference'

export type IsolationContext = {
  dataReference: IsolationDataReference
  resetAfterCommit: boolean
  outerContext: ContextState
}

const IsolationContext = createContext<IsolationContext>(null)

export default IsolationContext
