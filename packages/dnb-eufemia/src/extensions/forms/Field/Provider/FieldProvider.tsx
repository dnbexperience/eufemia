import type { ReactNode } from 'react'
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
  children: ReactNode

  /**
   * Locale (language) to use for all nested Eufemia components.
   */
  locale?: DataContextProps<JsonObject>['locale']

  /**
   * Provide translation strings. Can be a flat or nested object keyed by locale, e.g. `{ "nb-NO": { MyKey: "value" } }`. See [Localization](/uilib/usage/customisation/localization).
   */
  translations?: DataContextProps<JsonObject>['translations']

  /**
   * Async function that receives the current locale and returns a translations object. Called on mount and when the locale changes. Loaded translations are merged on top of static `translations`. See [Load translations dynamically](/uilib/usage/customisation/localization/#load-translations-dynamically).
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
  forceDisabled?: boolean

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
  _supportsSpacingProps: 'passthrough',
})

export default FieldProviderProvider
