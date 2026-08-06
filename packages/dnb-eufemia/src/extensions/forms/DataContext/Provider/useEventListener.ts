import { useCallback, useContext, useEffect } from 'react'
import DataContext from '../Context'
import type { EventListenerCall } from '../Context'

export default function useEventListener(
  id: EventListenerCall['type'],
  listener: EventListenerCall['callback'],
  path: EventListenerCall['path'] = undefined
) {
  const { setFieldEventListener } = useContext(DataContext)

  const removeEvent = useCallback(() => {
    setFieldEventListener?.(path, id, listener, {
      remove: true,
    })
  }, [id, listener, path, setFieldEventListener])

  useEffect(() => {
    setFieldEventListener?.(path, id, listener)

    return removeEvent
  }, [id, listener, path, removeEvent, setFieldEventListener])

  return { removeEvent }
}
