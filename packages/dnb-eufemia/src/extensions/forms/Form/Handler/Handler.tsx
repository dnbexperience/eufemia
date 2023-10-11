import React from 'react'
import { JsonObject } from 'json-pointer'
import Provider, {
  Props as ProviderProps,
} from '../../DataContext/Provider'
import FormElement from '../Element'
import type { SpacingProps } from '../../../../shared/types'

export type Props = React.HTMLAttributes<HTMLFormElement> & SpacingProps

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
  const ProviderProps = {
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
  }

  return (
    <Provider {...ProviderProps}>
      <FormElement {...rest}>{children}</FormElement>
    </Provider>
  )
}
