import { useEffect, useRef, useCallback, useReducer } from 'react'
import {
  MultiInputMaskProps,
  MultiInputMaskValue,
} from '../MultiInputMask'

type UseMultiInputValues<T extends string> = {
  inputs: MultiInputMaskProps<T>['inputs']
  defaultValues?: MultiInputMaskProps<T>['values']
}

export function useMultiInputValue<T extends string>({
  inputs,
  defaultValues,
}: UseMultiInputValues<T>) {
  const valuesRef = useRef<MultiInputMaskValue<T>>(
    defaultValues ? defaultValues : createDefaultValues(inputs)
  )
  // Use reducer to force re-renders when values change
  const [, forceUpdate] = useReducer(() => ({}), {})
  const prevDefaultValuesRef = useRef(defaultValues)

  // Sync with prop changes (for controlled component behavior)
  // Only update if values actually changed to avoid unnecessary renders
  useEffect(() => {
    if (defaultValues && defaultValues !== prevDefaultValuesRef.current) {
      // Check if any values actually changed
      const prev = prevDefaultValuesRef.current
      const hasChanges =
        !prev ||
        Object.keys(defaultValues).some(
          (key) => prev[key as T] !== defaultValues[key as T]
        )
      if (hasChanges) {
        valuesRef.current = defaultValues
        forceUpdate()
      }
      prevDefaultValuesRef.current = defaultValues
    }
  }, [defaultValues])

  const onChange = useCallback((updatedValues: MultiInputMaskValue<T>) => {
    valuesRef.current = updatedValues

    // Force re-render to update the component
    forceUpdate()
  }, [])

  // Return ref value for current state, but use forceUpdate for re-renders
  return [valuesRef.current, onChange] as const
}

function createDefaultValues(
  inputs: MultiInputMaskProps<string>['inputs']
) {
  return inputs.reduce((values, input) => {
    values[input.id] = ''

    return values
  }, {} as MultiInputMaskValue<string>)
}
