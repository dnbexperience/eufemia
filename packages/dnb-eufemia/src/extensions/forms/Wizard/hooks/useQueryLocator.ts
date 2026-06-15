import { useCallback, useRef } from 'react'
import useStep from './useStep'

import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../../shared/helpers/useIsomorphicLayoutEffect'

export default function useQueryLocator(id: string = undefined) {
  const { setFormError } = useStep(id)
  const name = id ? `${id}-step` : 'step'
  const hasRouterStepRef = useRef(false)

  const onStepChange = useCallback(
    (index: number) => {
      try {
        const url = new URL(window.location.href)

        if (parseFloat(url.searchParams.get(name)) === index) {
          return
        }

        hasRouterStepRef.current = true
        url.searchParams.set(name, String(index))
        window.history.pushState({}, '', url.toString())
      } catch (error) {
        setFormError(error as Error)
      }
    },
    [name, setFormError]
  )

  const { setActiveIndex, onStepChangeEventsRef } = useStep(id, {
    onStepChange,
  })

  useLayoutEffect(() => {
    return () => {
      onStepChangeEventsRef?.current?.delete(onStepChange)
    }
  }, [onStepChange, onStepChangeEventsRef])

  const getIndex = useCallback(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search)
      return parseFloat(searchParams.get(name))
    } catch (error) {
      setFormError(error as Error)
    }

    return undefined
  }, [name, setFormError])

  useLayoutEffect(() => {
    try {
      const popstateListener = () => {
        const routerIndex = getIndex()
        const hasRouterIndex = !isNaN(routerIndex)

        if (hasRouterIndex) {
          hasRouterStepRef.current = true
        }

        if (hasRouterIndex || hasRouterStepRef.current) {
          setActiveIndex?.(hasRouterIndex ? routerIndex : 0, {
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
      setFormError(error as Error)
    }

    return undefined
  }, [getIndex, id, setActiveIndex, setFormError])

  return { getIndex }
}
