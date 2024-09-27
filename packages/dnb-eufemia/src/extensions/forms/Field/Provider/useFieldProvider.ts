import { useCallback, useContext, useMemo, useRef } from 'react'
import {
  assignPropsWithContext,
  extendDeep,
} from '../../../../shared/component-helper'
import FieldProviderContext from './FieldProviderContext'
import DataContext, { ContextState } from '../../DataContext/Context'
import SharedContext, { ContextProps } from '../../../../shared/Context'
import type { FieldProps } from '../../types'
import { FieldProviderProps } from './FieldProvider'

function useFieldProvider(props?: Omit<FieldProviderProps, 'children'>) {
  const { formElement, FormStatus, overwriteProps, ...restProps } =
    props || {}
  const nestedContext = useContext(FieldProviderContext)
  const inheritedProps = nestedContext?.inheritedContext

  const sharedContext = useContext(SharedContext)
  const dataContextRef = useRef<ContextState>()
  dataContextRef.current = useContext(DataContext)

  /**
   * Always use data context as the last source for localization
   */
  const locale = dataContextRef.current?.props?.locale ?? restProps?.locale

  const nestedFieldProps = useMemo(() => {
    if (inheritedProps && Object.keys(inheritedProps).length > 0) {
      return { ...inheritedProps, ...restProps } as FieldProps
    }

    return restProps
  }, [inheritedProps, restProps])

  const sharedProviderParams: ContextProps = {}

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

  const extend = useCallback(
    <T extends FieldProps>(fieldProps: T) => {
      // Extract props from data context to be used in fields
      const { required: requiredByContext } = dataContextRef.current

      // Extract props from overwriteProps to be used in values
      const key = overwriteProps && fieldProps?.path?.split('/')?.pop()
      const overwrite = overwriteProps?.[key]
      // Overwrite given schema props
      if (overwrite && fieldProps?.schema) {
        Object.keys(fieldProps.schema).forEach((key) => {
          if (overwrite?.[key]) {
            fieldProps.schema[key] = overwrite[key]
          }
        })
      }

      const props = overwrite
        ? { ...fieldProps, ...overwrite }
        : fieldProps
      const required =
        requiredByContext ?? nestedContext?.inheritedContext?.required

      const value =
        typeof required !== 'undefined' ||
        Object.keys(nestedFieldProps).length > 0
          ? assignPropsWithContext(
              props,
              { required },
              nestedFieldProps as Record<string, unknown>
            )
          : props

      return value as T
    },
    [
      nestedContext?.inheritedContext?.required,
      nestedFieldProps,
      overwriteProps,
    ]
  )

  return {
    extend,
    inheritedProps: restProps,
    inheritedContext: nestedFieldProps,
    sharedProviderParams,
  }
}

export default useFieldProvider
