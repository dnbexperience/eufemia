import { isAsync } from '../../../shared/helpers/isAsync'
import { ConnectorProps } from '../types'

import { useCallback } from 'react'

export default function useConnector<Value>(
  connector: ConnectorProps<Value> = {},
  props: Record<string, unknown> & ConnectorProps<Value> = {}
): {
  onChange: ConnectorProps<Value>['onChange']
  onBlurValidator: ConnectorProps<Value>['onBlurValidator']
} {
  const { handler: onBlurValidator, asyncHandler: onBlurValidatorAsync } =
    useCombinedHandlers(connector.onBlurValidator, props.onBlurValidator)
  const { handler: onChange, asyncHandler: onChangeAsync } =
    useCombinedHandlers(connector.onChange, props.onChange)

  const onChangeRefs = [connector.onChange, props.onChange]
  const onBlurValidatorRefs = [
    connector.onBlurValidator,
    props.onBlurValidator,
  ]

  return {
    onChange: isFunctionInArray(onChangeRefs)
      ? isAsyncInArray(onChangeRefs)
        ? onChangeAsync
        : onChange
      : undefined,
    onBlurValidator: isFunctionInArray(onBlurValidatorRefs)
      ? isAsyncInArray(onBlurValidatorRefs)
        ? onBlurValidatorAsync
        : onBlurValidator
      : undefined,
  }
}

function useCombinedHandlers(
  connectorFn?: (...args: unknown[]) => unknown,
  propsFn?: (...args: unknown[]) => unknown
) {
  const handler = useCallback(
    (...args: unknown[]) => {
      {
        const result = propsFn?.apply(this, args)
        if (result) {
          return result
        }
      }

      {
        const result = connectorFn?.apply(this, args)
        if (result) {
          return result
        }
      }
    },
    [connectorFn, propsFn]
  )

  const asyncHandler = useCallback(
    async (...args: unknown[]) => {
      {
        const result = await propsFn?.apply(this, args)
        if (result) {
          return result
        }
      }

      {
        const result = await connectorFn?.apply(this, args)
        if (result) {
          return result
        }
      }
    },
    [connectorFn, propsFn]
  )

  return {
    handler:
      [connectorFn, propsFn].filter(Boolean).length > 0
        ? handler
        : undefined,
    asyncHandler:
      [connectorFn, propsFn].filter(Boolean).length > 0
        ? asyncHandler
        : undefined,
  }
}

function isAsyncInArray(array: Array<unknown>) {
  return array.some((fn) => {
    return isAsync(fn)
  })
}
function isFunctionInArray(array: Array<unknown>) {
  return array.some((fn) => {
    return typeof fn === 'function'
  })
}
