import { useCallback } from 'react'
import useStep from './useStep'

import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../../shared/helpers/useIsomorphicLayoutEffect'

export default function useNextRouter(
  id: string = null,
  {
    useRouter,
    usePathname,
    useSearchParams,
  }: {
    useRouter: () => { push: (url: string) => void }
    usePathname: () => string
    useSearchParams: () => URLSearchParams
  }
) {
  const name = id ? `${id}-step` : 'step'
  const { setFormError } = useStep(id)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onStepChange = useCallback(
    (index: number) => {
      try {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, String(index))
        router.push(`${pathname}?${params.toString()}`)
      } catch (error) {
        setFormError(error as Error)
      }
    },
    [name, pathname, router, searchParams, setFormError]
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
