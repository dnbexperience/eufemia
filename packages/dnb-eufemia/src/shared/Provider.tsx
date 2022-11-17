/**
 * Lib Provider
 *
 */

import React from 'react'
import Context, { prepareContext } from './Context'
import type { ContextProps } from './Context'
import { prepareFormRowContext } from '../components/form-row/FormRowHelpers'

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
  const { children, ...props } = localProps

  const context = React.useContext(Context)
  const [localContext, setLocalContext] = React.useState(null)

  let value = mergeContext(context, { ...localContext, ...props })

  if (context) {
    value = prepareContext(value)
    context.updateTranslation(value.locale, value.translation)
  }

  value.update = updateAll
  value.setLocale = setAllLocale
  value.updateCurrent = updateCurrent
  value.setCurrentLocale = setCurrentLocale

  return <Context.Provider value={value}>{children}</Context.Provider>

  function updateCurrent(props: ContextProps) {
    setLocalContext({ __context__: props })
  }

  function setCurrentLocale(locale: string) {
    setLocalContext({ __context__: { locale } })
  }

  function setAllLocale(locale: string) {
    updateAll({ locale })
  }

  function updateAll(props: ContextProps) {
    if (typeof context.update === 'function') {
      context.update(props)
    }

    setLocalContext({ __context__: props })
  }
}

type MergeContext = {
  FormRow?: Pick<ContextProps, 'FormRow'>
}
type MergeContextProps = {
  value: ProviderProps
} & MergeContext

function mergeContext<ContextT, PropsT>(
  context: ContextT & ContextProps,
  props: PropsT & MergeContextProps
) {
  // When value is given as so: <Provider value={{}} />
  const { value, ...rest } = props

  // Make sure we create a copy, because we add some custom methods to it
  const merge = { ...value, ...rest }

  // Merge our new values with an existing context
  const mergedContext = { ...context, ...merge }

  // Because we don't want to deep merge, we merge FormRow additionally
  if (context?.FormRow && merge.FormRow) {
    mergedContext.FormRow = {
      ...context.FormRow,
      ...merge.FormRow,
    }
    mergedContext.FormRow = prepareFormRowContext(mergedContext.FormRow)
  }

  return mergedContext
}
