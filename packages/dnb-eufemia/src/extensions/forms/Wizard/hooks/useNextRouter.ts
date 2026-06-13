import { useCallback, useRef } from 'react'
import useStep from './useStep'

import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../../shared/helpers/useIsomorphicLayoutEffect'

const routerStepChanges = new Map<string, number>()

export default function useNextRouter(
  id: string = null,
  { useRouter, usePathname, useSearchParams }
) {
  const name = id ? `${id}-step` : 'step'
  const { setFormError } = useStep(id)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const routerRef = useRef(router)
  routerRef.current = router

  const pathnameRef = useRef(pathname)
  pathnameRef.current = pathname

  const searchParamsRef = useRef(searchParams)
  searchParamsRef.current = searchParams
  const routerStepChangeRef = useRef<number>(undefined)
  const hasRouterStepRef = useRef(false)

  const onStepChange = useCallback(
    (index: number) => {
      try {
        const params = new URLSearchParams(
          searchParamsRef.current.toString()
        )
        const currentParams = new URLSearchParams(
          typeof window !== 'undefined'
            ? window.location.search
            : params.toString()
        )

        if (
          parseFloat(currentParams.get(name)) === index ||
          routerStepChangeRef.current === index ||
          routerStepChanges.get(name) === index
        ) {
          return
        }

        routerStepChangeRef.current = index
        routerStepChanges.set(name, index)
        hasRouterStepRef.current = true
        params.set(name, String(index))
        routerRef.current.push(
          `${pathnameRef.current}?${params.toString()}`
        )
      } catch (error) {
        routerStepChanges.delete(name)
        setFormError(error as Error)
      }
    },
    [name, setFormError]
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
