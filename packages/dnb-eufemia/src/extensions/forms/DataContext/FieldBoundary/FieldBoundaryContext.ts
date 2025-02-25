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
   * Will be set to true when the boundary context error state should be shown.
   * Support a number to ensure we can renew hooks each time we get a new value.
   */
  showBoundaryErrors?: boolean | number

  /**
   * To set the boundary context error state.
   */
  setShowBoundaryErrors?: (
    showBoundaryErrors: FieldBoundaryContextState['showBoundaryErrors']
  ) => void

  /**
   * To set the local error state.
   */
  setFieldError?: (path: Path, error: Error) => void

  /**
   * To set the local visible error state.
   */
  revealError?: (path: Path, hasError: boolean) => void
}

const FieldBoundaryContext = React.createContext<
  FieldBoundaryContextState | undefined
>(undefined)

export default FieldBoundaryContext
