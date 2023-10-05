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
  data,
  schema,
  onChange,
  onPathChange,
  onSubmit,
  onSubmitRequest,
  scrollTopOnSubmit,
  ...rest
}: ProviderProps<Data> & Props) {
  const ProviderProps = {
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
  }

  return (
    <Provider {...ProviderProps}>
      <FormElement {...rest}>{children}</FormElement>
    </Provider>
  )
}
