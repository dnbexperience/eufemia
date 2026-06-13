import { useCallback, useRef } from 'react'
import useStep from './useStep'

import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../../shared/helpers/useIsomorphicLayoutEffect'

const routerStepChanges = new Map<string, number>()

export default function useReactRouter(
  id: string = null,
  { useSearchParams }
) {
  const name = id ? `${id}-step` : 'step'
  const { setFormError } = useStep(id)
  const [searchParams, setSearchParams] = useSearchParams()

  const searchParamsRef = useRef(searchParams)
  searchParamsRef.current = searchParams
  const routerStepChangeRef = useRef<number>(undefined)
  const hasRouterStepRef = useRef(false)

  const onStepChange = useCallback(
    (index: number) => {
      try {
        const searchParams = searchParamsRef.current
        const currentSearchParams = new URLSearchParams(
          typeof window !== 'undefined'
            ? window.location.search
            : searchParams.toString()
        )

        if (
          parseFloat(currentSearchParams.get(name)) === index ||
          routerStepChangeRef.current === index ||
          routerStepChanges.get(name) === index
        ) {
          return
        }

        routerStepChangeRef.current = index
        routerStepChanges.set(name, index)
        hasRouterStepRef.current = true
        searchParams.set(name, index)
        setSearchParams(searchParams)
      } catch (error) {
        routerStepChanges.delete(name)
        setFormError(error as Error)
      }
    },
    [name, setFormError, setSearchParams]
  )

  const { setActiveIndex } = useStep(id, {
    onStepChange,
    unregisterOnUnmount: true,
  })

  useLayoutEffect(() => {
    return () => {
      if (routerStepChanges.get(name) === routerStepChangeRef.current) {
        routerStepChanges.delete(name)
      }
    }
  }, [name])

  const getIndex = useCallback(
    () => parseFloat(searchParams.get(name)),
    [name, searchParams]
  )

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
  }, [getIndex, id, name, searchParams, setActiveIndex, setFormError])

  return { getIndex }
}
