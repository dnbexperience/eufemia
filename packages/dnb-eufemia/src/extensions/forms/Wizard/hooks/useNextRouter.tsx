import React, { useCallback } from 'react'
import useStep from './useStep'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export default function useNextRouter(
  id: string = null,
  { useRouter, usePathname, useSearchParams }
) {
  const name = id ? `${id}-step` : 'step'
  const { setFormError } = useStep(id)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onStepChange = useCallback(
    (index: number) => {
      try {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, String(index))
        router.push(`${pathname}?${params.toString()}`)
      } catch (error) {
        setFormError(error)
      }
    },
    [name, pathname, router, searchParams, setFormError]
  )

  const { setActiveIndex } = useStep(id, { onStepChange })

  const getIndex = useCallback(
    () => parseFloat(searchParams.get(name)),
    [name, searchParams]
  )

  useLayoutEffect(() => {
    const routerIndex = getIndex()
    if (!isNaN(routerIndex)) {
      setActiveIndex?.(routerIndex, {
        skipStepChangeCallFromHook: true,
        skipStepChangeCallBeforeMounted: true,
      })
    }
  }, [getIndex, id, searchParams, setActiveIndex, setFormError])

  return { getIndex }
}
