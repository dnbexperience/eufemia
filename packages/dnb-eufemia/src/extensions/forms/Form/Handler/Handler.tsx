import React from 'react'
import { JsonObject } from 'json-pointer'
import Provider, {
  Props as ProviderProps,
} from '../../DataContext/Provider'
import FormElement from '../Element'
import type { ElementAllProps } from '../../../../elements/Element'

export type Props = Omit<
  ElementAllProps,
  'data' | 'as' | 'autoComplete'
> & {
  /**
   * Will enable autoComplete for all nested Field.String fields
   */
  autoComplete?: boolean
}

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
  autoComplete,
  ...rest
}: ProviderProps<Data> & Omit<Props, keyof ProviderProps<Data>>) {
  const providerProps = {
    id: rest.id,
    defaultData,
    data,
    schema,
    onChange,
    onPathChange,
    onSubmit: (...args) => {
      if (typeof onSubmit === 'function') {
        onSubmit(...args)
      }
    },
    onSubmitRequest,
    scrollTopOnSubmit,
    sessionStorageId,
    autoComplete,
  } as Omit<ProviderProps<Data>, 'children'>

  return (
    <Provider {...providerProps}>
      <FormElement {...rest}>{children}</FormElement>
    </Provider>
  )
}
