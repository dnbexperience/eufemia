import { useCallback, useRef } from 'react'
import useStep from './useStep'

import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../../shared/helpers/useIsomorphicLayoutEffect'

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

  const onStepChange = useCallback(
    (index: number) => {
      try {
        routerStepChangeRef.current = index
        const params = new URLSearchParams(
          searchParamsRef.current.toString()
        )
        params.set(name, String(index))
        routerRef.current.push(
          `${pathnameRef.current}?${params.toString()}`
        )
      } catch (error) {
        setFormError(error as Error)
      }
    },
    [name, setFormError]
  )

  const { setActiveIndex } = useStep(id, { onStepChange })

  const getIndex = useCallback(
    () => parseFloat(searchParams.get(name)),
    [name, searchParams]
  )

  useLayoutEffect(() => {
    const routerIndex = getIndex()
    if (!isNaN(routerIndex)) {
      const skipStepChangeCall =
        routerIndex === routerStepChangeRef.current
      if (skipStepChangeCall) {
        routerStepChangeRef.current = undefined
      }

      setActiveIndex?.(routerIndex, {
        skipStepChangeCall,
        skipStepChangeCallFromHook: true,
        skipStepChangeCallBeforeMounted: true,
      })
    }
  }, [getIndex, id, searchParams, setActiveIndex, setFormError])

  return { getIndex }
}
