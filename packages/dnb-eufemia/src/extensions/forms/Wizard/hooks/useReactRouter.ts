import { useCallback, useRef } from 'react'
import useStep from './useStep'

import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../../shared/helpers/useIsomorphicLayoutEffect'

export default function useReactRouter(
  id: string = null,
  { useSearchParams }
) {
  const name = id ? `${id}-step` : 'step'
  const { setFormError } = useStep(id)
  const [searchParams, setSearchParams] = useSearchParams()

  const searchParamsRef = useRef(searchParams)
  searchParamsRef.current = searchParams

  const onStepChange = useCallback(
    (index: number) => {
      try {
        const searchParams = searchParamsRef.current
        searchParams.set(name, index)
        setSearchParams(searchParams)
      } catch (error) {
        setFormError(error as Error)
      }
    },
    [name, setFormError, setSearchParams]
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
        skipStepChangeCall: true,
        skipStepChangeCallFromHook: true,
        skipStepChangeCallBeforeMounted: true,
      })
    }
  }, [getIndex, id, searchParams, setActiveIndex, setFormError])

  return { getIndex }
}
