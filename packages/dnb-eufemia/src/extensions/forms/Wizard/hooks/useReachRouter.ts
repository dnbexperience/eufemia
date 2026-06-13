import { useCallback, useRef } from 'react'
import useStep from './useStep'

import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../../shared/helpers/useIsomorphicLayoutEffect'

const routerStepChanges = new Map<string, number>()

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
  const routerStepChangeRef = useRef<number>(undefined)
  const hasRouterStepRef = useRef(false)

  const onStepChange = useCallback(
    (index: number) => {
      try {
        const locationUrl = new URL(locationRef.current.href)
        const url =
          typeof window !== 'undefined'
            ? new URL(window.location.href)
            : locationUrl

        if (
          parseFloat(url.searchParams.get(name)) === index ||
          routerStepChangeRef.current === index ||
          routerStepChanges.get(name) === index
        ) {
          return
        }

        routerStepChangeRef.current = index
        routerStepChanges.set(name, index)
        hasRouterStepRef.current = true
        url.searchParams.set(name, String(index))
        navigateRef.current(url.href)
      } catch (error) {
        routerStepChanges.delete(name)
        setFormError(error as Error)
      }
    },
    [name, setFormError]
  )

  const { setActiveIndex } = useStep(id, { onStepChange })

  useLayoutEffect(() => {
    return () => {
      if (routerStepChanges.get(name) === routerStepChangeRef.current) {
        routerStepChanges.delete(name)
      }
    }
  }, [name])

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
    const hasRouterIndex = !isNaN(routerIndex)

    if (hasRouterIndex) {
      hasRouterStepRef.current = true
    }

    if (hasRouterIndex || hasRouterStepRef.current) {
      const activeIndex = hasRouterIndex ? routerIndex : 0
      const skipStepChangeCall =
        hasRouterIndex && activeIndex === routerStepChangeRef.current
      routerStepChangeRef.current = undefined
      routerStepChanges.delete(name)

      setActiveIndex?.(activeIndex, {
        skipStepChangeCall,
        skipStepChangeCallFromHook: true,
        skipStepChangeCallBeforeMounted: true,
      })
    }
  }, [getIndex, name, setActiveIndex])

  return { getIndex }
}
