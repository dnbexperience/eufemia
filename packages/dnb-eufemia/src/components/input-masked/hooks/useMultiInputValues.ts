import { useState } from 'react'
import {
  MultiInputMaskProps,
  MultiInputMaskValue,
} from '../MultiInputMask'

type UseMultiInputValues<T extends string> = {
  inputs: MultiInputMaskProps<T>['inputs']
  defaultValues?: MultiInputMaskProps<T>['values']
  callback?: (values: MultiInputMaskProps<T>['values']) => void
}

export function useMultiInputValue<T extends string>({
  inputs,
  defaultValues,
  callback,
}: UseMultiInputValues<T>) {
  const [values, setValues] = useState<MultiInputMaskValue<T>>(
    defaultValues ? defaultValues : createDefaultValues()
  )

  function createDefaultValues() {
    return inputs.reduce((values, input) => {
      values[input.id] = ''

      return values
    }, {} as MultiInputMaskValue<T>)
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
