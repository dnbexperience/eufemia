import { useRef, useCallback } from 'react'
import type { ProvideAdditionalEventArgs } from '../types'

export interface TransformerFns<Value> {
  transformIn: (external: unknown) => Value
  transformOut: (internal: Value, args?: unknown) => unknown
  toInput: (value: Value) => Value
  fromInput: (value: Value) => Value
  toEvent: (value: Value, eventName?: string) => Value
  transformValue: (value: Value, currentValue?: Value) => Value
  provideAdditionalArgs: (
    value: Value,
    additionalArgs?: ProvideAdditionalEventArgs
  ) => ProvideAdditionalEventArgs
  fromExternal: (value: Value) => Value
  validateRequired: (
    value: Value,
    options: {
      emptyValue: unknown
      required: boolean
      isChanged: boolean
      error: Error
    }
  ) => Error | undefined
}

export default function useFieldTransform<Value>({
  transformIn,
  transformOut,
  toInput,
  fromInput,
  toEvent,
  transformValue,
  provideAdditionalArgs,
  fromExternal,
  validateRequired,
  valueRef,
}: {
  transformIn: TransformerFns<Value>['transformIn']
  transformOut: TransformerFns<Value>['transformOut']
  toInput: TransformerFns<Value>['toInput']
  fromInput: TransformerFns<Value>['fromInput']
  toEvent: TransformerFns<Value>['toEvent']
  transformValue: TransformerFns<Value>['transformValue']
  provideAdditionalArgs: TransformerFns<Value>['provideAdditionalArgs']
  fromExternal: TransformerFns<Value>['fromExternal']
  validateRequired: TransformerFns<Value>['validateRequired']
  valueRef: React.RefObject<Value>
}) {
  const transformers = useRef<TransformerFns<Value>>({
    transformIn,
    transformOut,
    toInput,
    fromInput,
    toEvent,
    transformValue,
    provideAdditionalArgs,
    fromExternal,
    validateRequired,
  })

  const getEventArgs = useCallback(
    ({
      eventName,
      additionalArgs,
      overrideValue = undefined,
    }: {
      eventName: string
      additionalArgs: ProvideAdditionalEventArgs
      overrideValue?: Value
    }): [Value] | [Value, ProvideAdditionalEventArgs] => {
      const value = transformers.current.toEvent(
        overrideValue ?? valueRef.current,
        eventName
      )
      const args = transformers.current.provideAdditionalArgs(
        value,
        additionalArgs
      )
      const transformedValue = transformers.current.transformOut(
        value,
        args
      ) as Value

      if (typeof args !== 'undefined') {
        return [transformedValue, args]
      }

      return [transformedValue]
    },
    // valueRef is a stable ref identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return { transformers, getEventArgs }
}
