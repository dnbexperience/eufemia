import React, { useCallback, useContext, useMemo, useRef } from 'react'
import DataContext, { ContextState } from '../../DataContext/Context'
import { Props as DataContextProps } from '../../DataContext/Provider'
import { FormStatusProps } from '../../../../components/FormStatus'
import { assignPropsWithContext } from '../../../../shared/component-helper'
import FieldPropsContext from './FieldPropsContext'
import SharedProvider from '../../../../shared/Provider'
import { ContextProps } from '../../../../shared/Context'
import type { FieldProps, Path, UseFieldProps } from '../../types'

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

export default function FieldPropsProvider(props: FieldPropsProps) {
  const {
    children,
    formElement,
    FormStatus,
    overwriteProps,
    deep,
    ...restProps
  } = props

  const nestedContext = useContext(FieldPropsContext)
  const dataContextRef = useRef<ContextState>()
  dataContextRef.current = useContext<ContextState>(DataContext)

  const sharedProviderProps: ContextProps = {}

  // Extract props to be used in the shared global context
  const { locale, translations } = useMemo(() => {
    return {
      ...restProps,
      ...removeUndefined(nestedContext?.inheritedProps),
    } as ContextProps
  }, [nestedContext?.inheritedProps, restProps])

  const nestedFieldProps = useMemo(() => {
    return Object.assign(
      nestedContext?.inheritedProps || {},
      restProps
    ) as UseFieldProps
  }, [nestedContext?.inheritedProps, restProps])

  if (typeof nestedFieldProps.disabled === 'boolean') {
    sharedProviderProps.formElement = {
      disabled: nestedFieldProps.disabled,
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

  const extend = useCallback(
    <T extends FieldProps>(fieldProps: T) => {
      // Extract props from data context to be used in fields
      const { required: requiredByContext } = dataContextRef.current

      // Extract props from overwriteProps to be used in fields
      const key = fieldProps?.path?.split('/')?.pop()
      const overwrite = overwriteProps?.[key]

      // Overwrite given schema props
      if (overwrite && fieldProps?.schema) {
        Object.keys(fieldProps.schema).forEach((key) => {
          if (overwrite?.[key]) {
            fieldProps.schema[key] = overwrite[key]
          }
        })
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
    [deep, nestedContext, overwriteProps, nestedFieldProps]
  )

  return (
    <FieldPropsContext.Provider
      value={{
        extend,
        inheritedProps: restProps,
        inheritedContext: nestedFieldProps,
      }}
    >
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

function removeUndefined(obj = {}) {
  const result = {}
  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key]
    }
  }
  return result
}
