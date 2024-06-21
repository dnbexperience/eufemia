import React, { useCallback, useContext, useMemo, useRef } from 'react'
import DataContext, { ContextState } from '../../DataContext/Context'
import { Props as DataContextProps } from '../../DataContext/Provider'
import { FormStatusProps } from '../../../../components/FormStatus'
import {
  assignPropsWithContext,
  extendDeep,
} from '../../../../shared/component-helper'
import FieldPropsContext from './FieldPropsContext'
import SharedProvider from '../../../../shared/Provider'
import SharedContext, { ContextProps } from '../../../../shared/Context'
import type { FieldProps, Path, UseFieldProps } from '../../types'
import { isAjvSchema } from '../../utils/schema/ajv/useAjvSchemaValidator'
import { isValibotSchema } from '../../utils/schema/valibot/useValibotSchemaValidator'

export type FieldPropsProps = FieldProps & {
  children: React.ReactNode

  /**
   * Locale to use for all nested Eufemia components
   */
  locale?: DataContextProps<unknown>['locale']

  /**
   * Provide your own translations. Use the same format as defined in the translation files
   */
  translations?: DataContextProps<unknown>['translations']

  /** For internal use only */
  overwriteProps?: {
    [key: Path]: FieldProps
  }

  /** For internal use only */
  deep?: boolean

  /** For internal use only */
  formElement?: ContextProps['formElement']

  /** For internal use only */
  FormStatus?: { globalStatus: FormStatusProps }
}

function FieldPropsProvider(props: FieldPropsProps) {
  const {
    children,
    formElement,
    FormStatus,
    overwriteProps,
    deep,
    ...restProps
  } = props

  const sharedProviderParams: ContextProps = {}
  const nestedContext = useContext(FieldPropsContext)
  const sharedContext = useContext(SharedContext)
  const dataContextRef = useRef<ContextState>()
  dataContextRef.current = useContext(DataContext)

  /**
   * Always use data context as the last source for localization
   */
  const locale = dataContextRef.current?.props?.locale ?? restProps?.locale

  const nestedFieldProps = useMemo(() => {
    return Object.assign(
      nestedContext?.inheritedProps || {},
      restProps
    ) as UseFieldProps
  }, [nestedContext?.inheritedProps, restProps])

  if (typeof nestedFieldProps.disabled === 'boolean') {
    sharedProviderParams.formElement = {
      disabled: nestedFieldProps.disabled,
    }
  }
  if (formElement) {
    sharedProviderParams.formElement = formElement
  }
  if (FormStatus) {
    sharedProviderParams.FormStatus = FormStatus
  }
  if (locale) {
    sharedProviderParams.locale = locale
  }
  sharedProviderParams.translations = useMemo(() => {
    const translations = extendDeep(
      {},
      sharedContext.translations,
      restProps?.translations,
      dataContextRef.current?.props?.translations
    ) as ContextProps

    return translations
  }, [restProps?.translations, sharedContext.translations])

  // console.log('make change')

  const extend = useCallback(
    <T extends FieldProps>(fieldProps: T) => {
      // Extract props from data context to be used in fields
      const { required: requiredByContext } = dataContextRef.current

      // Extract props from overwriteProps to be used in fields
      const key = overwriteProps && fieldProps?.path?.split('/')?.pop()
      const overwrite = overwriteProps?.[key]
      // console.log('overwrite', overwrite)

      // Overwrite given schema props
      if (overwrite && fieldProps?.schema) {
        // if (isValibotSchema(fieldProps.schema)) {
        //   // console.log('make change')
        //   // Object.keys(overwrite).forEach((key) => {
        //   //   if (overwrite?.[key]) {
        //   //     console.log('merge?', key, overwrite[key])
        //   //     // fieldProps.schema[key] = overwrite[key]
        //   //   }
        //   // })
        // }
        // if (isAjvSchema(fieldProps.schema)) {
        //   Object.keys(fieldProps.schema).forEach((key) => {
        //     if (overwrite?.[key]) {
        //       fieldProps.schema[key] = overwrite[key]
        //     }
        //   })
        // }
      }

      const value = assignPropsWithContext(
        overwrite ? { ...fieldProps, ...overwrite } : fieldProps,
        {
          required:
            requiredByContext ?? nestedContext?.inheritedContext?.required,
        },
        nestedFieldProps as Record<string, unknown>
      )

      return (deep ? nestedContext.extend(value) : value) as T
    },
    [deep, nestedContext, nestedFieldProps, overwriteProps]
  )

  return (
    <FieldPropsContext.Provider
      value={{
        extend,
        inheritedProps: restProps,
        inheritedContext: nestedFieldProps,
      }}
    >
      <SharedProvider {...sharedProviderParams}>{children}</SharedProvider>
    </FieldPropsContext.Provider>
  )
}

FieldPropsProvider._supportsSpacingProps = 'children'
export default FieldPropsProvider
