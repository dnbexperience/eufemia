import { useRef, useCallback, useMemo } from 'react'
import {
  EventReturnWithStateObjectAndSuccess,
  EventStateObjectWithSuccess,
  Identifier,
  FieldStatus,
} from '../types'
import { FormError } from '../utils'
import { isAsync } from '../../../shared/helpers/isAsync'
import type {
  SubmitStateWithValidating,
  PersistErrorStateMethod,
  ErrorInitiator,
} from './useFieldError'

export type AsyncProcesses =
  | 'onChangeValidator'
  | 'onBlurValidator'
  | 'onChangeLocal'
  | 'onChangeContext'

type AsyncProcessesBuffer = {
  resolve: () => void
  validateProcesses: () => boolean
}

export type UseFieldAsyncParams<Value> = {
  onChange: (...args: unknown[]) => unknown
  onChangeContext: (...args: unknown[]) => unknown
  valueRef: React.RefObject<Value>
  forceUpdate: () => void

  // Error methods (from useFieldError)
  persistErrorState: (
    method: PersistErrorStateMethod,
    initiator: ErrorInitiator,
    error?: Error | FormError | Array<Error | FormError>
  ) => void
  revealError: () => void
  setFieldState: (state: SubmitStateWithValidating) => void
  hasError: () => boolean
  warningRef: React.RefObject<FieldStatus['warning']>
  infoRef: React.RefObject<FieldStatus['info']>
  fieldStateRef: React.RefObject<SubmitStateWithValidating>

  // Refs for breaking circular dep with useFieldValidation
  removeErrorRef: React.RefObject<() => void>

  // Context
  hasPath: boolean
  identifier: Identifier
  executeOnChangeRegardlessOfError: boolean
  handlePathChangeDataContext: (
    identifier: Identifier
  ) =>
    | EventReturnWithStateObjectAndSuccess
    | Promise<EventReturnWithStateObjectAndSuccess>
}

export default function useFieldAsync<Value>({
  onChange,
  onChangeContext,
  valueRef,
  forceUpdate,
  persistErrorState,
  revealError,
  setFieldState,
  hasError,
  warningRef,
  infoRef,
  fieldStateRef,
  removeErrorRef,
  hasPath,
  identifier,
  executeOnChangeRegardlessOfError,
  handlePathChangeDataContext,
}: UseFieldAsyncParams<Value>) {
  // -- Async behavior detection --

  const asyncBehaviorIsEnabled = useMemo(() => {
    return isAsync(onChange) || isAsync(onChangeContext)
  }, [onChangeContext, onChange])

  // -- Async process tracking --

  const validatedValueRef = useRef<Value>(undefined)
  const changeEventResultRef = useRef<EventStateObjectWithSuccess | null>(
    null
  )
  const asyncProcessRef = useRef<AsyncProcesses | null>(null)

  const defineAsyncProcess = useCallback((name: AsyncProcesses) => {
    asyncProcessRef.current = name
  }, [])

  // -- Async buffer processing --

  const asyncBufferRef = useRef<Record<string, AsyncProcessesBuffer>>({})

  for (const key in asyncBufferRef.current) {
    const { resolve, validateProcesses } = (asyncBufferRef.current[key] ||
      {}) as AsyncProcessesBuffer
    if (validateProcesses?.() === false) {
      delete asyncBufferRef.current[key]
      if (typeof resolve === 'function') {
        window.requestAnimationFrame(resolve)
      }
    }
  }

  // -- Event pool --

  const eventPool = useRef({
    onChangeValidator: null,
    onBlurValidator: null,
    onChangeContext: null,
    onChangeLocal: null,
  })

  const addToPool = useCallback(
    (name: keyof typeof eventPool.current, fn, runAsync) => {
      if (!eventPool.current[name]) {
        eventPool.current[name] = { fn, runAsync }
      }
    },
    []
  )

  const runPool = useCallback(async (cb = null) => {
    for (const key in eventPool.current) {
      if (!eventPool.current[key]) {
        continue
      }

      const { fn, runAsync } = eventPool.current[key] || {}
      if (fn) {
        eventPool.current[key] = null

        if (runAsync) {
          await fn()
        } else {
          fn()
        }
      }
    }

    // use a callback in order to avoid any async/await,
    // because it will delay the execution of the following code
    cb?.()
  }, [])

  // -- yieldAsyncProcess --

  const yieldAsyncProcess = useCallback(
    async ({
      name,
      waitFor,
    }: {
      name: 'onChangeLocal' | 'onChangeContext' | 'onSubmitContext'
      waitFor: Array<{
        processName?: AsyncProcesses
        withStates: Array<SubmitStateWithValidating>
        hasValue?: Value
      }>
    }) => {
      return new Promise<void>((resolve) => {
        const validateProcesses = () => {
          const result = waitFor.some(
            ({ processName, withStates, hasValue }) => {
              const hasMatchingValue =
                hasValue === validatedValueRef.current

              const result =
                (typeof hasValue === 'undefined'
                  ? false
                  : !hasMatchingValue) ||
                ((processName
                  ? processName === asyncProcessRef.current
                  : true) &&
                  withStates?.some((state) => {
                    return state === fieldStateRef.current
                  }))

              return result
            }
          )

          return result
        }

        if (validateProcesses() === true) {
          asyncBufferRef.current[name] = { resolve, validateProcesses }
        } else {
          resolve()
          setFieldState('pending')
        }
      })
    },
    [setFieldState, fieldStateRef]
  )

  // -- handleChangeEventResult --

  const handleChangeEventResult = useCallback(async () => {
    const result: EventStateObjectWithSuccess =
      changeEventResultRef.current || ({} as EventStateObjectWithSuccess)

    if ('error' in result) {
      if (!result.error) {
        removeErrorRef.current()
      } else {
        persistErrorState('gracefully', 'onChangeValidator', result.error)
        revealError()
      }
    }
    if ('warning' in result) {
      warningRef.current = result.warning
    }
    if ('info' in result) {
      infoRef.current = result.info
    }

    if (asyncBehaviorIsEnabled) {
      await yieldAsyncProcess({
        name: 'onSubmitContext',
        waitFor: [{ withStates: ['validating'] }],
      })
    }

    defineAsyncProcess(undefined)

    if (result?.success === 'saved') {
      setFieldState('success')
    } else if (result?.error) {
      setFieldState('error')
    } else if (asyncBehaviorIsEnabled) {
      setFieldState('complete')
    }

    forceUpdate()
  }, [
    asyncBehaviorIsEnabled,
    defineAsyncProcess,
    removeErrorRef,
    persistErrorState,
    revealError,
    yieldAsyncProcess,
    setFieldState,
    warningRef,
    infoRef,
    forceUpdate,
  ])

  // -- setEventResult --

  const setEventResult = useCallback(
    async (result: EventReturnWithStateObjectAndSuccess) => {
      if (result instanceof Error) {
        result = { error: result }
      }
      changeEventResultRef.current = {
        ...changeEventResultRef.current,
        ...result,
      } as EventStateObjectWithSuccess

      await handleChangeEventResult()
    },
    [handleChangeEventResult]
  )

  // -- callOnChangeContext --

  const callOnChangeContext = useCallback(async () => {
    if (asyncBehaviorIsEnabled && !executeOnChangeRegardlessOfError) {
      await yieldAsyncProcess({
        name: 'onChangeContext',
        waitFor: [
          {
            processName: 'onChangeValidator',
            withStates: ['validating', 'error'],
            hasValue: valueRef.current,
          },
          {
            processName: 'onBlurValidator',
            withStates: ['validating', 'error'],
            hasValue: valueRef.current,
          },
        ],
      })
    }

    if (hasPath) {
      if (isAsync(onChangeContext)) {
        defineAsyncProcess('onChangeContext')

        // Skip sync errors, such as required
        if (!hasError() || executeOnChangeRegardlessOfError) {
          await setEventResult(
            (await handlePathChangeDataContext?.(
              identifier
            )) as EventReturnWithStateObjectAndSuccess
          )
        } else {
          await setEventResult(null)
        }
      } else if (onChangeContext || !asyncBehaviorIsEnabled) {
        setEventResult(
          handlePathChangeDataContext?.(
            identifier
          ) as EventReturnWithStateObjectAndSuccess
        )
      }
    }

    forceUpdate()
  }, [
    asyncBehaviorIsEnabled,
    executeOnChangeRegardlessOfError,
    hasPath,
    yieldAsyncProcess,
    onChangeContext,
    defineAsyncProcess,
    hasError,
    setEventResult,
    handlePathChangeDataContext,
    identifier,
    forceUpdate,
    valueRef,
  ])

  return {
    asyncBehaviorIsEnabled,
    defineAsyncProcess,
    addToPool,
    runPool,
    yieldAsyncProcess,
    handleChangeEventResult,
    setEventResult,
    callOnChangeContext,

    // Refs needed by other hooks
    asyncProcessRef,
    validatedValueRef,
    changeEventResultRef,
  }
}
