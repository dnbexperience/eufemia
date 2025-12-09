import React, { useCallback, useContext, useReducer } from 'react'
import DataContext from '../DataContext/Context'
import Log from './Log'
import useEventListener from '../DataContext/Provider/useEventListener'

function Errors({ label }: { label?: React.ReactNode }) {
  const [, forceUpdate] = useReducer(() => ({}), {})
  const { fieldErrorRef, errorsRef } = useContext(DataContext)

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
  useEventListener('onSetFieldError', handleSetFieldError)

  const data = {
    fieldErrors,
    formErrors,
  }

  return <Log data={data} label={label} />
}

Errors._supportsSpacingProps = true
export default Errors
