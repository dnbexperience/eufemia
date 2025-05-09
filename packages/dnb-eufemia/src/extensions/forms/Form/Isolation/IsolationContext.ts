import { createContext } from 'react'
import { ContextState } from '../../DataContext/Context'
import { IsolationDataReference } from './IsolationDataReference'

export type IsolationContext = {
  dataReference: IsolationDataReference
  resetDataAfterCommit: boolean
  outerContext: ContextState
  requireCommit: boolean
}

const IsolationContext = createContext<IsolationContext>(null)

export default IsolationContext
