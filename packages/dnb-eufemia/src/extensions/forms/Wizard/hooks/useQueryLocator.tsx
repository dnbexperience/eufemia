import React, { useCallback } from 'react'
import useStep from './useStep'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export default function useQueryLocator(id: string) {
  const { setFormError } = useStep(id)

  const onStepChange = useCallback(
    (index: number) => {
      try {
        const url = new URL(window.location.href)
        url.searchParams.set(`${id}-step`, String(index))
        window.history.pushState({}, '', url.toString())
      } catch (error) {
        setFormError(error)
      }
    },
    [id, setFormError]
  )

  const { setActiveIndex } = useStep(id, { onStepChange })

  const getIndex = useCallback(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search)
      return parseFloat(searchParams.get(`${id}-step`))
    } catch (error) {
      setFormError(error)
    }
  }, [id, setFormError])

  useLayoutEffect(() => {
    try {
      const popstateListener = () => {
        const routerIndex = getIndex()
        if (!isNaN(routerIndex)) {
          setActiveIndex(routerIndex, {
            skipStepChangeCallFromHook: true,
            skipStepChangeCallBeforeMounted: true,
          })
        }
      }

      // Initial setup call
      popstateListener()

      window.addEventListener('popstate', popstateListener)
      return () => window.removeEventListener('popstate', popstateListener)
    } catch (error) {
      setFormError(error)
    }
  }, [getIndex, id, setActiveIndex, setFormError])

  return { getIndex }
}
