import React from 'react'
import { JsonObject } from 'json-pointer'
import DataContextProvider, {
  Props as ProviderProps,
} from '../../DataContext/Provider'
import FormElement from '../Element'
import type { ElementAllProps } from '../../../../elements/Element'
import FormStatus from '../../../../components/FormStatus'
import useId from '../../../../shared/helpers/useId'
import useDataContext from '../data-context/useDataContext'
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
  globalStatusId,
  filterData,
  onChange,
  onPathChange,
  onSubmit,
  onSubmitRequest,
  onSubmitComplete,
  minimumAsyncBehaviorTime,
  asyncSubmitTimeout,
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
    globalStatusId,
    filterData,
    onChange,
    onPathChange,
    onSubmit,
    onSubmitRequest,
    onSubmitComplete,
    minimumAsyncBehaviorTime,
    asyncSubmitTimeout,
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
  const { submitState } = useDataContext()
  const states = Object.entries(submitState).filter(([, value]) => value)

  return (
    <FormElement
      {...rest}
      aria-labelledby={
        combineLabelledBy(
          rest,
          states.map(([key]) => {
            return `${id}-form-status-${key}`
          })
        ) || undefined
      }
    >
      {children}

      {['error', 'warning', 'info'].map((key) => {
        const value = submitState[key]
        return (
          <FormStatus
            key={key}
            state={key}
            id={`${id}-form-status-${key}`}
            show={Boolean(value)}
            no_animation={false}
            shellSpace={{ top: 'x-small' }}
          >
            {String(value?.['message'] || value || '')}
          </FormStatus>
        )
      })}
    </FormElement>
  )
}
