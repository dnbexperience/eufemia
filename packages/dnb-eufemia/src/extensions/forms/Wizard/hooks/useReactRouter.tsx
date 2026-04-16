import { useCallback } from 'react'
import useStep from './useStep'

import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../../shared/helpers/useIsomorphicLayoutEffect'

export default function useReactRouter(
  id: string = null,
  {
    useSearchParams,
  }: {
    useSearchParams: () => [
      URLSearchParams,
      (params: URLSearchParams) => void,
    ]
  }
) {
  const name = id ? `${id}-step` : 'step'
  const { setFormError } = useStep(id)
  const [searchParams, setSearchParams] = useSearchParams()

  const onStepChange = useCallback(
    (index: number) => {
      try {
        searchParams.set(name, index as unknown as string)
        setSearchParams(searchParams)
      } catch (error) {
        setFormError(error as Error)
      }
    },
    [name, searchParams, setFormError, setSearchParams]
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
