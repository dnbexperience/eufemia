import { useCallback, useRef } from 'react'
import useStep from './useStep'

import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../../shared/helpers/useIsomorphicLayoutEffect'

export default function useReachRouter(
  id: string = null,
  { useLocation, navigate }
) {
  const name = id ? `${id}-step` : 'step'
  const { setFormError } = useStep(id)
  const location = useLocation()

  const locationRef = useRef(location)
  locationRef.current = location

  const navigateRef = useRef(navigate)
  navigateRef.current = navigate

  const onStepChange = useCallback(
    (index: number) => {
      try {
        const url = new URL(locationRef.current.href)
        url.searchParams.set(name, String(index))
        navigateRef.current(url.href)
      } catch (error) {
        setFormError(error as Error)
      }
    },
    [name, setFormError]
  )

  const { setActiveIndex } = useStep(id, { onStepChange })

  const getIndex = useCallback(() => {
    try {
      const searchParams = new URLSearchParams(location.search)
      return parseFloat(searchParams.get(name))
    } catch (error) {
      setFormError(error as Error)
    }

    return undefined
  }, [location.search, name, setFormError])

  useLayoutEffect(() => {
    const routerIndex = getIndex()
    if (!isNaN(routerIndex)) {
      setActiveIndex?.(routerIndex, {
        skipStepChangeCall: true,
        skipStepChangeCallFromHook: true,
        skipStepChangeCallBeforeMounted: true,
      })
    }
  }, [getIndex, setActiveIndex])

  return { getIndex }
}
