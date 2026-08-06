import { useCallback, useContext, useInsertionEffect } from 'react'
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

  // Register before layout effects so descendants cannot dispatch first.
  useInsertionEffect(() => {
    setFieldEventListener?.(path, id, listener)

    return removeEvent
  }, [id, listener, path, removeEvent, setFieldEventListener])

  return { removeEvent }
}
