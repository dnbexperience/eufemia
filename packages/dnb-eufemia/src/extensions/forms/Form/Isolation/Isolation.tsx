import React, { useCallback, useContext, useMemo, useRef } from 'react'
import pointer, { JsonObject } from 'json-pointer'
import { Context, Provider } from '../../DataContext'
import { Props as ProviderProps } from '../../DataContext/Provider'
import { Path } from '../../types'
import { extendDeep } from '../../../../shared/component-helper'
import IsolationCommitButton from './IsolationCommitButton'

export type IsolationProps<Data> = Omit<
  ProviderProps<Data>,
  | 'onSubmit'
  | 'onSubmitRequest'
  | 'onSubmitComplete'
  | 'minimumAsyncBehaviorTime'
  | 'asyncSubmitTimeout'
  | 'scrollTopOnSubmit'
  | 'sessionStorageId'
  | 'filterSubmitData'
  | 'globalStatusId'
> & {
  /**
   * A ref (function) that you can call in order to commit the data programmatically to the outer context.
   */
  commitHandleRef?: React.MutableRefObject<() => void>

  /**
   * A function that will be called when the isolated context is committed.
   * It will receive the data from the isolated context and the data from the outer context.
   * You can use this to transform the data before it is committed.
   */
  transformOnCommit?: (isolatedData: Data, handlerData: Data) => Data

  /**
   * Will be called when the isolated context is committed.
   */
  onCommit?: (data: Data) => void
}

function IsolationProvider<Data extends JsonObject>(
  props: IsolationProps<Data>
) {
  const {
    children,
    onPathChange,
    onCommit,
    commitHandleRef,
    data,
    defaultData,
  } = props

  const outerContext = useContext(Context)

  const dataRef = useRef<Partial<Data>>({})
  const getData = useCallback(() => {
    return extendDeep({}, outerContext?.data, dataRef.current) as Data
  }, [outerContext?.data])

  const onPathChangeHandler = useCallback(
    async (path: Path, value: any) => {
      pointer.set(dataRef.current, path, value)

      return await onPathChange?.(path, value)
    },
    [onPathChange]
  )

  const providerProps: IsolationProps<Data> = {
    ...props,
    data,
    defaultData,
    onPathChange: onPathChangeHandler,
    onCommit,
    isolate: true,
  }

  // Update the isolated data with the outside context data
  providerProps.data = useMemo(() => {
    if (!defaultData && !data) {
      return getData()
    }
    return providerProps.data
  }, [data, defaultData, getData, providerProps.data])

  return (
    <Provider {...providerProps}>
      <Context.Consumer>
        {(dataContext) => {
          if (commitHandleRef) {
            commitHandleRef.current = dataContext?.handleSubmit
          }

          return children
        }}
      </Context.Consumer>
    </Provider>
  )
}

IsolationProvider.CommitButton = IsolationCommitButton
IsolationProvider._supportsSpacingProps = undefined

export default IsolationProvider
