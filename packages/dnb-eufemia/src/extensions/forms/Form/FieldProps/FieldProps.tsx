import React, { useContext, useRef } from 'react'
import DataContext, { ContextState } from '../../DataContext/Context'
import { Props as DataContextProps } from '../../DataContext/Provider'
import { FormStatusProps } from '../../../../components/FormStatus'
import { assignPropsWithContext } from '../../../../shared/component-helper'
import FieldPropsContext from './FieldPropsContext'
import SharedProvider from '../../../../shared/Provider'
import { ContextProps } from '../../../../shared/Context'
import type { FieldProps, Path } from '../../types'

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
  formElement?: ContextProps['formElement']

  /** For internal use only */
  FormStatus?: { globalStatus: FormStatusProps }
}

export default function FieldPropsProvider(props: FieldPropsProps) {
  const { children, formElement, FormStatus, overwriteProps, ...rest } =
    props

  const nestedContext = useContext(FieldPropsContext)
  const dataContextRef = useRef<ContextState>()
  dataContextRef.current = useContext<ContextState>(DataContext)

  const sharedProviderProps: ContextProps = {}

  // Extract props to be used in the shared global context
  const { locale, translations, ...restWithNestedContext } = Object.assign(
    nestedContext?.inheritedContext || {},
    rest
  ) as ContextProps & {
    disabled?: boolean
  }
  if (typeof restWithNestedContext.disabled === 'boolean') {
    sharedProviderProps.formElement = {
      disabled: restWithNestedContext.disabled,
    }
  }
  if (formElement) {
    sharedProviderProps.formElement = formElement
  }
  if (FormStatus) {
    sharedProviderProps.FormStatus = FormStatus
  }
  if (locale) {
    sharedProviderProps.locale = locale
  }
  if (translations) {
    sharedProviderProps.translations = wrapFormsTranslations(translations)
  }

  function extend<T extends FieldProps>(fieldProps: T) {
    // Extract props from data context to be used in fields
    const { required } = dataContextRef.current

    // Extract props from overwriteProps to be used in fields
    const overwrite = overwriteProps?.[fieldProps?.path?.split('/')?.pop()]

    // Overwrite given schema props
    if (overwrite && fieldProps?.schema) {
      Object.keys(fieldProps.schema).forEach((key) => {
        if (overwrite?.[key]) {
          fieldProps.schema[key] = overwrite[key]
        }
      })
    }

    return nestedContext.extend(
      assignPropsWithContext(
        overwrite ? { ...fieldProps, ...overwrite } : fieldProps,
        { required },
        restWithNestedContext
      )
    ) as T
  }

  return (
    <FieldPropsContext.Provider value={{ extend, inheritedContext: rest }}>
      <SharedProvider {...sharedProviderProps}>{children}</SharedProvider>
    </FieldPropsContext.Provider>
  )
}

function wrapFormsTranslations(
  translations: ContextProps['translations']
) {
  const result = {}
  const trObj = translations as Record<
    ContextProps['locale'],
    Record<string, Record<string, string>>
  >

  for (const locale in trObj) {
    const newObj: Record<
      'Forms',
      Record<string, Record<string, string>>
    > = {
      Forms: {},
    }

    for (const key in trObj[locale]) {
      const newKeyObj: Record<string, string> = {}

      for (const subKey in trObj[locale][key]) {
        newKeyObj[subKey] = trObj[locale][key][subKey]
      }

      newObj.Forms[key] = newKeyObj
    }

    result[locale] = newObj
  }

  return result
}
