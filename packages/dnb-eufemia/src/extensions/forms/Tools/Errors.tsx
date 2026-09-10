import { useCallback, useContext, useReducer } from 'react'
import type { ReactNode } from 'react'
import DataContext from '../DataContext/Context'
import Log from './Log'
import useEventListener from '../DataContext/Provider/useEventListener'
import withComponentMarkers from '../../../shared/helpers/withComponentMarkers'

function Errors({ label }: { label?: ReactNode }) {
  const [, forceUpdate] = useReducer(() => ({}), {})
  const { fieldErrorRef, errorsRef, mountedFieldsRef } =
    useContext(DataContext)

  const fieldErrors = Object.keys(fieldErrorRef?.current || {}).reduce(
    (acc, key) => {
      if (mountedFieldsRef?.current.get(key)?.isMounted === false) {
        return acc
      }

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
  const handleSetMountedFieldState = useCallback(() => {
    Promise.resolve().then(forceUpdate)
  }, [])
  useEventListener('onSetFieldError', handleSetFieldError)
  useEventListener('onSetMountedFieldState', handleSetMountedFieldState)

  const data = {
    fieldErrors,
    formErrors,
  }

  return <Log data={data} label={label} />
}

withComponentMarkers(Errors, {
  _supportsSpacingProps: true,
})

export default Errors
