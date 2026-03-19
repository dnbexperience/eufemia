import { useCallback } from 'react'
import useStep from './useStep'

import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../../shared/helpers/useIsomorphicLayoutEffect'

export default function useReachRouter(
  id: string = null,
  {
    useLocation,
    navigate,
  }: {
    useLocation: () => { href: string; search: string }
    navigate: (url: string) => void
  }
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
        setFormError(error as Error)
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
      setFormError(error as Error)
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
