import { useCallback, useContext, useEffect, useMemo } from 'react'
import DataContext from '../Context'

export default function useEventListener(
  id: string,
  listener: (...args: unknown[]) => void,
  path: string = undefined
) {
  const { setFieldEventListener } = useContext(DataContext)

  useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFieldEventListener?.(path, id as any, listener)
  }, [id, listener, path, setFieldEventListener])

  const removeEvent = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFieldEventListener?.(path, id as any, listener, {
      remove: true,
    })
  }, [id, listener, path, setFieldEventListener])

  useEffect(() => removeEvent, [removeEvent])

  return { removeEvent }
}
