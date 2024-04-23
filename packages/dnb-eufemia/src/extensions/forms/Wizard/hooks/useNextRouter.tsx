import React, { useCallback } from 'react'
import useStep from './useStep'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export default function useNextRouter(
  id: string,
  { useRouter, usePathname, useSearchParams }
) {
  const { setFormError } = useStep(id)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onStepChange = useCallback(
    (index: number) => {
      try {
        const params = new URLSearchParams(searchParams.toString())
        params.set(`${id}-step`, String(index))
        router.push(`${pathname}?${params.toString()}`)
      } catch (error) {
        setFormError(error)
      }
    },
    [id, pathname, router, searchParams, setFormError]
  )

  const { setActiveIndex } = useStep(id, { onStepChange })

  const getIndex = useCallback(
    () => parseFloat(searchParams.get(`${id}-step`)),
    [id, searchParams]
  )

  useLayoutEffect(() => {
    const routerIndex = getIndex()
    if (!isNaN(routerIndex)) {
      setActiveIndex(routerIndex, {
        skipStepChangeCallFromHook: true,
        skipStepChangeCallBeforeMounted: true,
      })
    }
  }, [getIndex, id, searchParams, setActiveIndex, setFormError])

  return { getIndex }
}
