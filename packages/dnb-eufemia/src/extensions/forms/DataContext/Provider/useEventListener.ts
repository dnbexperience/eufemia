import { useCallback, useContext, useEffect, useMemo } from 'react'
import DataContext, { type EventListenerCall } from '../Context'

export default function useEventListener(
  id: EventListenerCall['type'],
  listener: EventListenerCall['callback'],
  path: EventListenerCall['path'] = undefined
) {
  const { setFieldEventListener } = useContext(DataContext)

  useMemo(() => {
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
