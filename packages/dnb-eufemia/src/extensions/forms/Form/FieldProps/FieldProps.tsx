import React, { useContext, useRef } from 'react'
import DataContext, { ContextState } from '../../DataContext/Context'
import { UseFieldProps } from '../../types'
import { FormStatusProps } from '../../../../components/FormStatus'
import { assignPropsWithContext } from '../../../../shared/component-helper'
import FieldPropsContext from './FieldPropsContext'
import SharedProvider from '../../../../shared/Provider'
import { ContextProps, Locale } from '../../../../shared/Context'

export type FieldPropsProps = UseFieldProps & {
  children: React.ReactNode
  FormStatus?: { globalStatus?: FormStatusProps }
  locale?: Locale
}

export default function FieldProps(props: FieldPropsProps) {
  const { children, FormStatus, ...rest } = props

  const nestedContext = useContext(FieldPropsContext)
  const dataContextRef = useRef<ContextState>()
  dataContextRef.current = useContext<ContextState>(DataContext)

  const sharedProviderProps: ContextProps = {}

  // Extract props to be used in the shared global context
  const { disabled, locale, ...restOfRest } = Object.assign(
    nestedContext?.inheritedContext || {},
    rest
  ) as ContextProps & {
    disabled?: boolean
  }
  if (typeof disabled === 'boolean') {
    sharedProviderProps.formElement = { disabled }
  }
  if (FormStatus) {
    sharedProviderProps.FormStatus = FormStatus
  }
  if (locale) {
    sharedProviderProps.locale = locale
  }

  function extend<T>(fieldProps: T) {
    // Extract props from data context to be used in fields
    const { required } = dataContextRef.current

    return nestedContext.extend(
      assignPropsWithContext(fieldProps, { required }, restOfRest)
    ) as T
  }

  return (
    <FieldPropsContext.Provider value={{ extend, inheritedContext: rest }}>
      <SharedProvider {...sharedProviderProps}>{children}</SharedProvider>
    </FieldPropsContext.Provider>
  )
}
