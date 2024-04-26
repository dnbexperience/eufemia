import React, { useCallback } from 'react'
import useStep from './useStep'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export default function useReachRouter(
  id: string,
  { useLocation, navigate }
) {
  const { setFormError } = useStep(id)
  const location = useLocation()

  const onStepChange = useCallback(
    (index: number) => {
      try {
        const url = new URL(location.href)
        url.searchParams.set(`${id}-step`, String(index))
        navigate(url.href)
      } catch (error) {
        setFormError(error)
      }
    },
    [id, location.href, navigate, setFormError]
  )

  const { setActiveIndex } = useStep(id, { onStepChange })

  const getIndex = useCallback(() => {
    try {
      const searchParams = new URLSearchParams(location.search)
      return parseFloat(searchParams.get(`${id}-step`))
    } catch (error) {
      setFormError(error)
    }
  }, [id, location.search, setFormError])

  useLayoutEffect(() => {
    const routerIndex = getIndex()
    if (!isNaN(routerIndex)) {
      setActiveIndex(routerIndex, {
        skipStepChangeCallFromHook: true,
        skipStepChangeCallBeforeMounted: true,
      })
    }
  }, [getIndex, setActiveIndex])

  return { getIndex }
}
