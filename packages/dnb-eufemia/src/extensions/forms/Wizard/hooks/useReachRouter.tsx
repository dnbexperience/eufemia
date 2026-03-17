import { useCallback } from 'react'
import useStep from './useStep'

import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../../shared/helpers/useIsomorphicLayoutEffect'

export default function useReachRouter(
  id: string = null,
  { useLocation, navigate }
) {
  const name = id ? `${id}-step` : 'step'
  const { setFormError } = useStep(id)
  const location = useLocation()

  const onStepChange = useCallback(
    (index: number) => {
      try {
        const url = new URL(location.href)
        url.searchParams.set(name, String(index))
        navigate(url.href)
      } catch (error) {
        // @ts-expect-error -- strictFunctionTypes
        setFormError(error)
      }
    },
    [location.href, name, navigate, setFormError]
  )

  const { setActiveIndex } = useStep(id, { onStepChange })

  const getIndex = useCallback(() => {
    try {
      const searchParams = new URLSearchParams(location.search)
      return parseFloat(searchParams.get(name))
    } catch (error) {
      // @ts-expect-error -- strictFunctionTypes
      setFormError(error)
    }
  }, [location.search, name, setFormError])

  useLayoutEffect(() => {
    const routerIndex = getIndex()
    if (!isNaN(routerIndex)) {
      setActiveIndex?.(routerIndex, {
        skipStepChangeCallFromHook: true,
        skipStepChangeCallBeforeMounted: true,
      })
    }
  }, [getIndex, setActiveIndex])

  return { getIndex }
}
