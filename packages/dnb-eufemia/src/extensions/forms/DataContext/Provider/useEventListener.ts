import { useCallback, useContext, useEffect, useMemo } from 'react'
import DataContext from '../Context'

export default function useEventListener(id, listener, path = undefined) {
  const { setFieldEventListener } = useContext(DataContext)

  useEffect(() => {
    setFieldEventListener?.(path, id, listener)
  }, [id, listener, path, setFieldEventListener])

  const removeEvent = useCallback(() => {
    setFieldEventListener?.(path, id, listener, {
      remove: true,
    })
  }, [id, listener, path, setFieldEventListener])

  useEffect(() => removeEvent, [removeEvent])

  return { removeEvent }
}
