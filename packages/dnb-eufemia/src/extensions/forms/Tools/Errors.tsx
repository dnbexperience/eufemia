import React, { useContext } from 'react'
import DataContext from '../DataContext/Context'
import Log from './Log'

function Errors() {
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

  const data = {
    fieldErrors,
    formErrors,
  }

  return <Log data={data} />
}

Errors._supportsSpacingProps = true
export default Errors
