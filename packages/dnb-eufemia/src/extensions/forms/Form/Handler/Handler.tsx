import React from 'react'
import { JsonObject } from 'json-pointer'
import Provider, {
  Props as ProviderProps,
} from '../../DataContext/Provider'
import FormElement from '../Element'
import type { ElementAllProps } from '../../../../elements/Element'

export type Props = Omit<ElementAllProps, 'data' | 'as'>

export default function FormHandler<Data extends JsonObject>({
  children,
  defaultData,
  data,
  schema,
  onChange,
  onPathChange,
  onSubmit,
  onSubmitRequest,
  scrollTopOnSubmit,
  sessionStorageId,
  ...rest
}: ProviderProps<Data> & Props) {
  const providerProps = {
    defaultData,
    data,
    schema,
    onChange,
    onPathChange,
    onSubmit: (data: Data) => {
      if (typeof onSubmit === 'function') {
        onSubmit(data)
      }
    },
    onSubmitRequest,
    scrollTopOnSubmit,
    sessionStorageId,
  } as Omit<ProviderProps<Data>, 'children'>

  return (
    <Provider {...providerProps}>
      <FormElement {...rest}>{children}</FormElement>
    </Provider>
  )
}
