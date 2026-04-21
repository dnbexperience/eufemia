import { useCallback, useEffect, useReducer, useRef } from 'react'

type SegmentedFieldValue<T extends string> = {
  [_K in T]: string
}

type SegmentedFieldDefinition<T extends string> = {
  id: T
}

type UseSegmentedFieldValuesProps<T extends string> = {
  inputs: SegmentedFieldDefinition<T>[]
  defaultValues?: SegmentedFieldValue<T>
}

export function useSegmentedFieldValues<T extends string>({
  inputs,
  defaultValues,
}: UseSegmentedFieldValuesProps<T>) {
  const valuesRef = useRef<SegmentedFieldValue<T>>(
    defaultValues ? defaultValues : createDefaultValues(inputs)
  )
  const [, forceUpdate] = useReducer(() => ({}), {})
  const previousDefaultValuesRef = useRef(defaultValues)

  useEffect(() => {
    if (
      defaultValues &&
      defaultValues !== previousDefaultValuesRef.current
    ) {
      const previousValues = previousDefaultValuesRef.current
      const hasChanges =
        !previousValues ||
        Object.keys(defaultValues).some(
          (key) => previousValues[key as T] !== defaultValues[key as T]
        )

      if (hasChanges) {
        valuesRef.current = defaultValues
        forceUpdate()
      }

      previousDefaultValuesRef.current = defaultValues
    }
  }, [defaultValues])

  const onChange = useCallback((updatedValues: SegmentedFieldValue<T>) => {
    valuesRef.current = updatedValues
    forceUpdate()
  }, [])

  return [valuesRef.current, onChange] as const
}

function createDefaultValues(inputs: SegmentedFieldDefinition<string>[]) {
  return inputs.reduce((values, input) => {
    values[input.id] = ''

    return values
  }, {} as SegmentedFieldValue<string>)
}
