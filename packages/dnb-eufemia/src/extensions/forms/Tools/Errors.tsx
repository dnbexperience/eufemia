import React, { useCallback, useContext, useReducer } from 'react'
import DataContext from '../DataContext/Context'
import Log from './Log'

function Errors() {
  const [, forceUpdate] = useReducer(() => ({}), {})
  const { setFieldEventListener, fieldErrorRef, errorsRef } =
    useContext(DataContext)

  const fieldErrors = Object.keys(fieldErrorRef?.current || {}).reduce(
    (acc, key) => {
      acc[key] = fieldErrorRef?.current[key]?.message
      return acc
    },
    {}
  )
  const formErrors = Object.keys(errorsRef?.current || {}).reduce(
    (acc, key) => {
      acc[key || '/'] = errorsRef?.current[key]?.message
      return acc
    },
    {}
  )

  const handleSetFieldError = useCallback(() => {
    forceUpdate()
  }, [])
  setFieldEventListener?.(
    undefined,
    'onSetFieldError',
    handleSetFieldError
  )

  const data = {
    fieldErrors,
    formErrors,
  }

  return <Log data={data} />
}

Errors._supportsSpacingProps = true
export default Errors
