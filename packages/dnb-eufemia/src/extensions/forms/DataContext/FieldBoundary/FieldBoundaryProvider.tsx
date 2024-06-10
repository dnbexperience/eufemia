import React, { useCallback, useContext, useRef } from 'react'
import FieldBoundaryContext, {
  FieldBoundaryContextState,
} from './FieldBoundaryContext'
import DataContext from '../Context'
import { Path } from '../../types'

export default function FieldBoundaryProvider({ children }) {
  const { showAllErrors, hasVisibleError } = useContext(DataContext)

  const errorsRef = useRef<Record<Path, boolean>>({})
  const hasError = Object.keys(errorsRef.current || {}).length > 0
  const hasSubmitError = showAllErrors && hasError

  const setFieldError = useCallback((path: Path, error: Error) => {
    if (error) {
      errorsRef.current[path] = !!error
    } else {
      delete errorsRef.current?.[path]
    }
  }, [])

  const context: FieldBoundaryContextState = {
    hasError,
    hasSubmitError,
    hasVisibleError,
    errorsRef,
    setFieldError,
  }

  return (
    <FieldBoundaryContext.Provider value={context}>
      {children}
    </FieldBoundaryContext.Provider>
  )
}
