import { useCallback, useContext, useMemo } from 'react'
import { assignPropsWithContext } from '../../../../shared/component-helper'
import ValueProviderContext from './ValueProviderContext'
import type { ValueProps } from '../../types'
import { ValueProviderProps } from './ValueProvider'

function useValueProvider(props?: Omit<ValueProviderProps, 'children'>) {
  const { overwriteProps, ...restProps } = props || {}
  const nestedContext = useContext(ValueProviderContext)
  const inheritedProps = nestedContext?.inheritedContext

  const nestedValueProps = useMemo(() => {
    if (inheritedProps && Object.keys(inheritedProps).length > 0) {
      return { ...inheritedProps, ...restProps } as ValueProps
    }

    return restProps
  }, [inheritedProps, restProps])

  const extend = useCallback(
    <T extends ValueProps>(valueProps: T) => {
      // Extract props from overwriteProps to be used in values
      const key = overwriteProps && valueProps?.path?.split('/')?.pop()
      const overwrite = overwriteProps?.[key]
      const props = overwrite
        ? { ...valueProps, ...overwrite }
        : valueProps

      const value =
        Object.keys(nestedValueProps).length > 0
          ? assignPropsWithContext(
              props,
              nestedValueProps as Record<string, unknown>
            )
          : props

      return value as T
    },
    [nestedValueProps, overwriteProps]
  )

  return {
    extend,
    inheritedProps: restProps,
    inheritedContext: nestedValueProps,
  }
}

export default useValueProvider
