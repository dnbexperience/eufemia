import React, { useCallback } from 'react'
import useStep from './useStep'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export default function useQueryLocator(id: string = undefined) {
  const { setFormError } = useStep(id)
  const name = id ? `${id}-step` : 'step'

  const onStepChange = useCallback(
    (index: number) => {
      try {
        const url = new URL(window.location.href)
        url.searchParams.set(name, String(index))
        window.history.pushState({}, '', url.toString())
      } catch (error) {
        setFormError(error)
      }
    },
    [name, setFormError]
  )

  const { setActiveIndex } = useStep(id, { onStepChange })

  const getIndex = useCallback(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search)
      return parseFloat(searchParams.get(name))
    } catch (error) {
      setFormError(error)
    }
  }, [name, setFormError])

  useLayoutEffect(() => {
    try {
      const popstateListener = () => {
        const routerIndex = getIndex()
        if (!isNaN(routerIndex)) {
          setActiveIndex?.(routerIndex, {
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
