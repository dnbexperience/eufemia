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
  const { showErrors = undefined, onPathError = null, children } = props
  const [, forceUpdate] = useReducer(() => ({}), {})
  const { showAllErrors } = useContext(DataContext)

  const onPathErrorRef = useRef(onPathError)
  onPathErrorRef.current = onPathError
  const errorsRef = useRef<Record<Path, boolean>>({})
  const showBoundaryErrorsRef =
    useRef<FieldBoundaryContextState['showBoundaryErrors']>(showErrors)
  const hasError = Object.keys(errorsRef.current).length > 0
  const hasSubmitError = showAllErrors && hasError

  const setFieldError = useCallback((path: Path, error: Error) => {
    if (error) {
      errorsRef.current[path] = !!error
    } else {
      delete errorsRef.current?.[path]
    }
    forceUpdate()
    onPathErrorRef.current?.(path, error)
  }, [])

  const hasVisibleErrorRef = useRef<Record<Path, boolean>>({})
  const revealError = useCallback((path: Path, hasError: boolean) => {
    if (hasError) {
      hasVisibleErrorRef.current[path] = hasError
    } else {
      delete hasVisibleErrorRef.current[path]
    }
    forceUpdate()
  }, [])

  const setShowBoundaryErrors: FieldBoundaryContextState['setShowBoundaryErrors'] =
    useCallback((showBoundaryErrors) => {
      showBoundaryErrorsRef.current = showBoundaryErrors
        ? Date.now() // in order to renew the internal dependency "showBoundaryErrors"
        : false
      forceUpdate()
    }, [])

  const context: FieldBoundaryContextState = {
    hasError,
    hasSubmitError,
    hasVisibleError: Object.keys(hasVisibleErrorRef.current).length > 0,
    errorsRef,
    showBoundaryErrors: showBoundaryErrorsRef.current,
    setShowBoundaryErrors,
    setFieldError,
    revealError,
  }

  return (
    <FieldBoundaryContext.Provider value={context}>
      {children}
    </FieldBoundaryContext.Provider>
  )
}
