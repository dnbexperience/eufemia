import React from 'react'
import { Path } from '../../types'

export interface FieldBoundaryContextState {
  hasError?: boolean
  hasErrorAndShowIt?: boolean
  errorsRef?: React.RefObject<unknown>
  setFieldError?: (path: Path, error: Error) => void
}

const FieldBoundaryContext = React.createContext<
  FieldBoundaryContextState | undefined
>(undefined)

export default FieldBoundaryContext
