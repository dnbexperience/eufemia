import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import pointer, { JsonObject } from 'json-pointer'
import { Context, Provider } from '../../DataContext'
import { Props as ProviderProps } from '../../DataContext/Provider'
import { Path } from '../../types'
import { extendDeep } from '../../../../shared/component-helper'
import IsolationDispatchButton from './IsolationDispatchButton'

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
   * A ref (function) that you can call in order to dispatch the data programmatically to the outer context.
   */
  dispatchHandleRef?: React.MutableRefObject<() => void>

  /**
   * Will be called when the isolated context is dispatched (submitted).
   */
  onDispatch?: (data: Data) => void
}

function IsolationProvider<Data extends JsonObject>(
  props: IsolationProps<Data>
) {
  const {
    children,
    onPathChange,
    onDispatch,
    dispatchHandleRef,
    data,
    defaultData,
  } = props

  const nestedContext = useContext(Context)
  const { handlePathChange } = nestedContext ?? {}

  const dataRef = useRef<Partial<Data>>({})
  const getData = useCallback(() => {
    return extendDeep({}, nestedContext?.data, dataRef.current) as Data
  }, [nestedContext?.data])

  useEffect(() => {
    if (dispatchHandleRef) {
      dispatchHandleRef.current = () => {
        handlePathChange?.('/', getData())
      }
    }
  }, [getData, handlePathChange, dispatchHandleRef])

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
    onDispatch,
    isolate: true,
  }

  // Update the isolated data with the outside context data
  providerProps.data = useMemo(() => {
    if (!defaultData && !data) {
      return getData()
    }
    return providerProps.data
  }, [data, defaultData, getData, providerProps.data])

  return <Provider {...providerProps}>{children}</Provider>
}

IsolationProvider.DispatchButton = IsolationDispatchButton
IsolationProvider._supportsSpacingProps = undefined

export default IsolationProvider
