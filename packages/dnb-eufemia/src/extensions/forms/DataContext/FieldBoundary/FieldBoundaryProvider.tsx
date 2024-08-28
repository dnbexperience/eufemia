import React, { useCallback, useContext, useReducer, useRef } from 'react'
import FieldBoundaryContext, {
  FieldBoundaryContextState,
} from './FieldBoundaryContext'
import DataContext from '../Context'
import { Path } from '../../types'

export type Props = {
  showErrors?: boolean
  onPathError?: (path: Path, error: Error) => void
  children: React.ReactNode
}

export default function FieldBoundaryProvider(props: Props) {
  const { showErrors = false, onPathError = null, children } = props
  const [, forceUpdate] = useReducer(() => ({}), {})
  const { showAllErrors, hasVisibleError } = useContext(DataContext)

  const errorsRef = useRef<Record<Path, boolean>>({})
  const showBoundaryErrorsRef = useRef<boolean>(showErrors)
  const hasError = Object.keys(errorsRef.current).length > 0
  const hasSubmitError = showAllErrors && hasError

  const setFieldError = useCallback(
    (path: Path, error: Error) => {
      if (error) {
        errorsRef.current[path] = !!error
      } else {
        delete errorsRef.current?.[path]
      }
      forceUpdate()
      onPathError?.(path, error)
    },
    [onPathError]
  )

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
