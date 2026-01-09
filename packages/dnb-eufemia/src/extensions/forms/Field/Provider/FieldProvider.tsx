import React from 'react'
import type { Props as DataContextProps } from '../../DataContext/Provider'
import type { FormStatusProps } from '../../../../components/FormStatus'
import FieldProviderContext from './FieldProviderContext'
import SharedProvider from '../../../../shared/Provider'
import type { ContextProps } from '../../../../shared/Context'
import useFieldProvider from './useFieldProvider'
import type { FieldProps, Path } from '../../types'
import type { JsonObject } from '../../utils'

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
    <FieldProviderContext.Provider value={providerValue}>
      <SharedProvider {...sharedProviderParams}>{children}</SharedProvider>
    </FieldProviderContext.Provider>
  )
}

FieldProviderProvider._supportsSpacingProps = 'children'
export default FieldProviderProvider
