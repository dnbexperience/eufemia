import { useCallback, useContext, useEffect, useMemo } from 'react'
import DataContext from '../Context'

export default function useEventListener(
  id: any,
  listener: any,
  path: any = undefined
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
