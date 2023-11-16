import { MutableRefObject, useEffect, useRef } from 'react'

function useHandleCursorPosition(
  inputRefs: MutableRefObject<HTMLInputElement>[],
  keysToHandle?: RegExp | { [inputId: string]: RegExp[] }
) {
  const inputList = useRef(refsToInputList(inputRefs))

  // To keep the refs.current in synch with component of use, or else it wont be possible to navigate to the next input, without triggering a re-render first.
  useEffect(() => {
    inputList.current = refsToInputList(inputRefs)
  }, [inputRefs])

  function onKeyDown(event: React.KeyboardEvent) {
    const inputs = inputList.current
    const input = event.target as HTMLInputElement

    const pressedKey = event.key

    const hasPressedKeysToHandle =
      getKeysToHandle({ keysToHandle, input })?.test(pressedKey) ||
      /(ArrowRight|ArrowLeft|Backspace)/.test(pressedKey)

    const initialSelectionStart = input.selectionStart

    const inputPosition = getInputPosition(input, inputs)

    window.requestAnimationFrame(() => {
      const caretPosition = getCaretPosition(input)

      if (!hasPressedKeysToHandle) {
        return // stop here
      }

      if (
        caretPosition === 'last' &&
        inputPosition !== 'last' &&
        !(initialSelectionStart === 1 && pressedKey === 'ArrowRight')
      ) {
        return goToInput('next', input, inputs)
      }

      if (
        caretPosition === 'first' &&
        inputPosition !== 'first' &&
        !(
          initialSelectionStart === 1 &&
          (pressedKey === 'ArrowLeft' || pressedKey === 'Backspace')
        )
      ) {
        return goToInput('previous', input, inputs)
      }
    })
  }

  return { onKeyDown }
}

// Helpers
function refsToInputList(inputRefs: MutableRefObject<HTMLInputElement>[]) {
  return inputRefs.map((ref) => ref.current).filter(Boolean)
}

type GetKeysToHandleParams = {
  keysToHandle: RegExp | { [inputId: string]: RegExp[] }
  input: HTMLInputElement
}

function getKeysToHandle({ keysToHandle, input }: GetKeysToHandleParams) {
  if (!keysToHandle) {
    return undefined
  }

  if (keysToHandle instanceof RegExp) {
    return keysToHandle
  }

  const masks = keysToHandle[input.dataset.maskId]

  const selection =
    input.selectionStart === input.selectionEnd
      ? input.selectionStart
      : undefined

  if (!selection) {
    return undefined
  }

  const maskIndex = selection === input.size ? masks.length - 1 : selection

  return masks[maskIndex]
}

function getInputPosition(
  input: HTMLInputElement,
  inputs: HTMLInputElement[]
) {
  const firstInput = inputs[0]
  const lastInput = inputs[inputs.length - 1]

  if (input === firstInput) {
    return 'first'
  }

  if (input === lastInput) {
    return 'last'
  }

  return 'non-initial'
}

function getSelectionPositions(input: HTMLInputElement) {
  return { start: 0, end: Number(input.size) }
}

function getCaretPosition(input: HTMLInputElement) {
  const { start, end } = getSelectionPositions(input)

  const selectionStart = input.selectionStart
  const selectionEnd = input.selectionEnd

  if (selectionStart === start && selectionEnd === start) {
    return 'first'
  }

  if (selectionStart === end && selectionEnd === end) {
    return 'last'
  }

  return 'non-initial'
}

function goToInput(
  to: 'next' | 'previous',
  input: HTMLInputElement,
  inputs: HTMLInputElement[]
) {
  const currentInputIndex = inputs.indexOf(input)

  const siblingIndex =
    to === 'next'
      ? currentInputIndex + 1
      : to === 'previous'
      ? currentInputIndex - 1
      : 0

  const siblingInput = inputs[siblingIndex]

  const { start, end } = getSelectionPositions(siblingInput)

  siblingInput.focus()

  if (to === 'next') {
    return siblingInput.setSelectionRange(start, start)
  }

  if (to === 'previous') {
    return siblingInput.setSelectionRange(end, end)
  }
}

export default useHandleCursorPosition
