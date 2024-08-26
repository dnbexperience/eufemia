import React, { useCallback, useContext, useReducer, useRef } from 'react'
import FieldBoundaryContext, {
  FieldBoundaryContextState,
} from './FieldBoundaryContext'
import DataContext from '../Context'
import { Path } from '../../types'

export default function FieldBoundaryProvider({ children }) {
  const [, forceUpdate] = useReducer(() => ({}), {})
  const { showAllErrors, hasVisibleError } = useContext(DataContext)

  const errorsRef = useRef<Record<Path, boolean>>({})
  const showBoundaryErrorsRef = useRef<boolean>(false)
  const hasError = Object.keys(errorsRef.current || {}).length > 0
  const hasSubmitError = showAllErrors && hasError

  const setFieldError = useCallback((path: Path, error: Error) => {
    if (error) {
      errorsRef.current[path] = !!error
    } else {
      delete errorsRef.current?.[path]
    }
  }, [])

  const setShowBoundaryErrors = useCallback(
    (showBoundaryErrors: boolean) => {
      showBoundaryErrorsRef.current = showBoundaryErrors
      forceUpdate()
    },
    []
  )

  const context: FieldBoundaryContextState = {
    hasError,
    hasSubmitError,
    hasVisibleError,
    errorsRef,
    showBoundaryErrors: showBoundaryErrorsRef.current,
    setShowBoundaryErrors,
    setFieldError,
  }

  return (
    <FieldBoundaryContext.Provider value={context}>
      {children}
    </FieldBoundaryContext.Provider>
  )
}
