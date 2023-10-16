import { useState } from 'react'
import { SteppedMaskProps, SteppedMaskValue } from '../SteppedMask'

type SteppedValuesHook<T extends string> = {
  steps: SteppedMaskProps<T>['steps']
  defaultValues?: SteppedMaskProps<T>['values']
  callback?: (values: SteppedMaskProps<T>['values']) => void
}

export function useSteppedValues<T extends string>({
  steps,
  defaultValues,
  callback,
}: SteppedValuesHook<T>) {
  const [values, setValues] = useState<SteppedMaskValue<T>>(
    defaultValues ?? createDefaultValues()
  )

  function createDefaultValues() {
    return steps.reduce((values, step) => {
      values[step.id] = ''

      return values
    }, {} as SteppedMaskValue<T>)
  }

  function onChange(id: string, value: string) {
    const updatedValues = { ...values, [id]: value }

    setValues(updatedValues)
    if (callback) {
      callback(updatedValues)
    }
  }

  return [values, onChange] as const
}
