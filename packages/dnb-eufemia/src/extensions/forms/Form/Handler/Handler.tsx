import React, { useEffect, useRef } from 'react'
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
}

type AllowedProviderContextProps = ProviderProps<unknown> &
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
  const { decoupleForm, children } = props

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
      {decoupleForm ? children : <FormElement>{children}</FormElement>}
    </DataContextProvider>
  )
}
