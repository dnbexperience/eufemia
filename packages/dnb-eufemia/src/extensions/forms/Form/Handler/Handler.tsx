import React, { createElement, useEffect, useRef } from 'react'
import { JsonObject } from '../../utils/json-pointer'
import { warn } from '../../../../shared/helpers'
import DataContextProvider, {
  Props as ProviderProps,
} from '../../DataContext/Provider'
import FormElement, { Props as FormElementProps } from '../Element'
import { ContextState } from '../../DataContext'

export type Props = FormElementProps & {
  /**
   * Will enable autoComplete for all nested Field.String fields
   */
  autoComplete?: boolean

  /**
   * Will decouple the form element from rendering
   */
  decoupleForm?: boolean

  /**
   * A wrapper component to wrap the form element.
   * You can provide an array of components to wrap the form element from right to left.
   */
  wrapper?:
    | React.ComponentType<{ children: React.ReactNode }>
    | Array<React.ComponentType<{ children: React.ReactNode }>>
}

type AllowedProviderContextProps = ProviderProps<JsonObject> &
  Pick<Props, 'decoupleForm' | 'autoComplete' | 'disabled'> &
  Pick<ContextState, 'restHandlerProps' | 'hasElementRef'>

const allowedProviderContextProps: Array<
  keyof AllowedProviderContextProps
> = [
  'id',
  'defaultData',
  'data',
  'schema',
  'ajvInstance',
  'errorMessages',
  'globalStatusId',
  'filterSubmitData',
  'transformIn',
  'transformOut',
  'onChange',
  'onPathChange',
  'onSubmit',
  'onSubmitRequest',
  'onSubmitComplete',
  'onClear',
  'minimumAsyncBehaviorTime',
  'asyncSubmitTimeout',
  'scrollTopOnSubmit',
  'sessionStorageId',
  'locale',
  'translations',
  'autoComplete',
  'disabled',
  'required',
  'decoupleForm',
  'restHandlerProps',
]

export default function FormHandler<Data extends JsonObject>(
  props: ProviderProps<Data> & Omit<Props, keyof ProviderProps<Data>>
) {
  const { decoupleForm, wrapper, children } = props

  const hasElementRef = useRef(false)
  useEffect(() => {
    if (decoupleForm && !hasElementRef.current) {
      warn('Please include a Form.Element when using decoupleForm!')
    }
  }, [decoupleForm])

  const providerProps = {
    hasElementRef,
    restHandlerProps: {},
  } as AllowedProviderContextProps

  for (const key in props) {
    if (
      allowedProviderContextProps.includes(
        key as keyof AllowedProviderContextProps
      )
    ) {
      providerProps[key] = props[key]
    } else if (key !== 'children') {
      providerProps.restHandlerProps[key] = props[key]
    }
  }

  return (
    <DataContextProvider {...providerProps}>
      <WrappedComponent wrapper={wrapper}>
        {decoupleForm ? children : <FormElement>{children}</FormElement>}
      </WrappedComponent>
    </DataContextProvider>
  )
}

type WrappedComponentProps = {
  wrapper?: Props['wrapper']
  children: React.ReactNode
}

function WrappedComponent({ wrapper, children }: WrappedComponentProps) {
  if (!wrapper) {
    return children
  }

  if (!Array.isArray(wrapper)) {
    wrapper = [wrapper]
  }

  return wrapper.reduceRight(
    (acc, Component) => createElement(Component, null, acc),
    children
  )
}
