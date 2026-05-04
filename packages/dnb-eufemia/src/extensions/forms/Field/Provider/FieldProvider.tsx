import React from 'react'
import type { DataContextProviderProps as DataContextProps } from '../../DataContext/Provider'
import type { FormStatusProps } from '../../../../components/FormStatus'
import FieldProviderContext from './FieldProviderContext'
import SharedProvider from '../../../../shared/Provider'
import type { ContextProps } from '../../../../shared/Context'
import useFieldProvider from './useFieldProvider'
import type { FieldProps, Path } from '../../types'
import type { JsonObject } from '../../utils'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type FieldProviderProps = FieldProps & {
  children: React.ReactNode

  /**
   * Locale to use for all nested Eufemia components
   */
  locale?: DataContextProps<JsonObject>['locale']

  /**
   * Provide your own translations. Use the same format as defined in the translation files
   */
  translations?: DataContextProps<JsonObject>['translations']

  /**
   * Async function to load translations for a given locale.
   * Called on mount and whenever the locale changes.
   * The returned translations are merged with any existing translations.
   */
  translationsLoader?: DataContextProps<JsonObject>['translationsLoader']

  /**
   * Message formatter for advanced message formatting (e.g. ICU MessageFormat).
   * Import and pass `icu` from `@dnb/eufemia/shared` to enable
   * pluralization, select, and other ICU features in translation strings.
   */
  messageFormatter?: DataContextProps<JsonObject>['messageFormatter']

  /** For internal use only */
  overwriteProps?: {
    [key: Path]: FieldProps
  }

  /** For internal use only */
  formElement?: ContextProps['formElement']

  /** For internal use only */
  FormStatus?: { globalStatus: FormStatusProps }
}

function FieldProviderProvider(props: FieldProviderProps) {
  const { children, ...restProps } = props
  const { sharedProviderParams, ...providerValue } =
    useFieldProvider(restProps)

  return (
    <FieldProviderContext value={providerValue}>
      <SharedProvider {...sharedProviderParams}>{children}</SharedProvider>
    </FieldProviderContext>
  )
}

withComponentMarkers(FieldProviderProvider, {
  _supportsSpacingProps: 'children',
})

export default FieldProviderProvider
