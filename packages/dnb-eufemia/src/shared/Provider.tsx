/**
 * Lib Provider
 *
 */

import React, { useCallback, useContext, useMemo, useState } from 'react'
import type { ContextProps, InternalLocale } from './Context'
import Context, { prepareContext } from './Context'
import { prepareFormElementContext } from './helpers/filterValidProps'

export type ProviderProps = {
  /**
   * Send in an object that gets spread as properties to the Provider
   */
  value?: ContextProps

  /**
   * The content
   */
  children: React.ReactNode
} & ContextProps

export default function Provider<Props>(
  localProps: ProviderProps & Props
) {
  const nestedContext = useContext(Context)
  const [localContext, setLocalContext] = useState(null)

  const updateCurrent = useCallback((props: ContextProps) => {
    setLocalContext({ __context__: props })
  }, [])

  const setCurrentLocale = useCallback((locale: InternalLocale) => {
    setLocalContext({ __context__: { locale } })
  }, [])

  const update = useCallback(
    (props: ContextProps) => {
      nestedContext.update?.(props)
      setLocalContext({ __context__: props })
    },
    [nestedContext]
  )

  const setLocale = useCallback(
    (locale: InternalLocale) => {
      update({ locale })
    },
    [update]
  )

  const value = useMemo(() => {
    const {
      children, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...rest
    } = localProps

    const preparedContext = {
      // Make copy to avoid extending the root context
      ...prepareContext(
        mergeContextWithProps(nestedContext, {
          ...localContext,
          ...rest,
        })
      ),
    }

    preparedContext.update = update
    preparedContext.setLocale = setLocale
    preparedContext.updateCurrent = updateCurrent
    preparedContext.setCurrentLocale = setCurrentLocale

    nestedContext.updateTranslation(
      preparedContext.locale,
      preparedContext.translations
    )

    return preparedContext
  }, [
    localProps,
    nestedContext,
    localContext,
    update,
    setLocale,
    updateCurrent,
    setCurrentLocale,
  ])

  return (
    <Context.Provider value={value}>
      {localProps.children}
    </Context.Provider>
  )
}

type MergeContext = {
  FormRow?: Pick<ContextProps, 'FormRow'>
}
type MergeContextProps = {
  value: ProviderProps
} & MergeContext

function mergeContextWithProps<ContextT, PropsT>(
  nestedContext: ContextT & ContextProps,
  localProps: PropsT & MergeContextProps
) {
  // When value is given as so: <Provider value={{}} />
  const { value, ...rest } = localProps

  // Make sure we create a copy, because we add some custom methods to it
  const props = { ...value, ...rest }

  // Merge our new values with an existing context
  const mergedContext = { ...nestedContext, ...props }

  // Because we don't want to deep merge, we merge formElement additionally
  if (nestedContext?.formElement && props.formElement) {
    mergedContext.formElement = {
      ...nestedContext.formElement,
      ...props.formElement,
    }
    mergedContext.formElement = prepareFormElementContext(
      mergedContext.formElement
    )
  }

  // Deprecated – can be removed in v11
  if (nestedContext?.FormRow && props.FormRow) {
    mergedContext.FormRow = {
      ...nestedContext.FormRow,
      ...props.FormRow,
    }
    mergedContext.FormRow = prepareFormElementContext(
      mergedContext.FormRow
    )
  }

  return mergedContext
}
