import { useCallback } from 'react'
import useStep from './useStep'

import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../../shared/helpers/useIsomorphicLayoutEffect'

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
        // @ts-expect-error -- strictFunctionTypes
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
      // @ts-expect-error -- strictFunctionTypes
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
      // @ts-expect-error -- strictFunctionTypes
      setFormError(error)
    }
  }, [getIndex, id, setActiveIndex, setFormError])

  return { getIndex }
}
