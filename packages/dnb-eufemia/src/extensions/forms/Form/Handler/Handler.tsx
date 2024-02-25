import React, { useContext } from 'react'
import { JsonObject } from 'json-pointer'
import DataContextProvider, {
  Props as ProviderProps,
} from '../../DataContext/Provider'
import DataContext from '../../DataContext/Context'
import FormElement from '../Element'
import type { ElementAllProps } from '../../../../elements/Element'
import FormStatus from '../../../../components/FormStatus'
import useId from '../../../../shared/helpers/useId'
import { combineLabelledBy } from '../../../../shared/component-helper'

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
  ajvInstance,
  errorMessages,
  filterData,
  onChange,
  onPathChange,
  onSubmit,
  onSubmitRequest,
  onSubmitComplete,
  minimumAsyncBehaviorTime,
  asyncBehaviorTimeout,
  enableAsyncBehavior,
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
    ajvInstance,
    errorMessages,
    filterData,
    onChange,
    onPathChange,
    onSubmit,
    onSubmitRequest,
    onSubmitComplete,
    minimumAsyncBehaviorTime,
    asyncBehaviorTimeout,
    enableAsyncBehavior,
    scrollTopOnSubmit,
    sessionStorageId,
    autoComplete,
  } as Omit<ProviderProps<Data>, 'children'>

  return (
    <DataContextProvider {...providerProps}>
      <FormElementWithState {...rest}>{children}</FormElementWithState>
    </DataContextProvider>
  )
}

function FormElementWithState({ children, ...rest }) {
  const id = useId()
  const { submitError } = useContext(DataContext) || {}
  const showSubmitError = Boolean(submitError)

  return (
    <FormElement
      {...rest}
      aria-labelledby={
        showSubmitError
          ? combineLabelledBy(rest, [`${id}-form-status`])
          : undefined
      }
    >
      {children}

      <FormStatus
        id={`${id}-form-status`}
        show={showSubmitError}
        no_animation={false}
        shellSpace={{ top: true, bottom: true }}
      >
        {String(submitError?.message || submitError || '')}
      </FormStatus>
    </FormElement>
  )
}
