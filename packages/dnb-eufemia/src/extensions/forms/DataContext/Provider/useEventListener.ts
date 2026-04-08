import { useCallback, useContext, useEffect, useMemo } from 'react'
import DataContext from '../Context'

export default function useEventListener(
  id: string,
  listener: (...args: unknown[]) => void,
  path?: string
) {
  const { setFieldEventListener } = useContext(DataContext)

  useMemo(() => {
    setFieldEventListener?.(
      path,
      id as Parameters<typeof setFieldEventListener>[1],
      listener
    )
  }, [id, listener, path, setFieldEventListener])

  const removeEvent = useCallback(() => {
    setFieldEventListener?.(
      path,
      id as Parameters<typeof setFieldEventListener>[1],
      listener,
      {
        remove: true,
      }
    )
  }, [id, listener, path, setFieldEventListener])

  useEffect(() => removeEvent, [removeEvent])

  return { removeEvent }
}
