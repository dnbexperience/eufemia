import React from 'react'
import { Path } from '../../types'

export interface FieldBoundaryContextState {
  /**
   * Will be set to true when one or more nested fields are in error state.
   */
  hasError?: boolean

  /**
   * Will be set to true when the inherited data context has submit errors and the `hasError` has errors as well.
   */
  hasSubmitError?: boolean

  /**
   * Will be set to true when a nested field contains a visible error.
   */
  hasVisibleError?: boolean

  /**
   * Contains the nested field errors.
   */
  errorsRef?: React.RefObject<unknown>

  /**
   * To set the local error state.
   */
  setFieldError?: (path: Path, error: Error) => void
}

const FieldBoundaryContext = React.createContext<
  FieldBoundaryContextState | undefined
>(undefined)

export default FieldBoundaryContext
