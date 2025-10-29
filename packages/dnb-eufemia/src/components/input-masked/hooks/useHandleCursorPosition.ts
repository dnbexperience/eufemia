import { MutableRefObject, useRef } from 'react'

function useHandleCursorPosition(
  inputRefs: MutableRefObject<HTMLInputElement>[],
  keysToHandle?: RegExp | { [inputId: string]: RegExp[] }
) {
  // Track a virtual caret for empty inputs to preserve Arrow navigation semantics
  const virtualCaretRef = useRef(new WeakMap<HTMLInputElement, number>())

  function onKeyDown(event: React.KeyboardEvent) {
    // Always compute a fresh list to avoid stale refs
    const inputs = refsToInputList(inputRefs)
    const input = event.target as HTMLInputElement

    const pressedKey = event.key

    const allowedByMask = getKeysToHandle({ keysToHandle, input })?.test(
      pressedKey
    )
    const isNavKey = /(ArrowRight|ArrowLeft|Backspace)/.test(pressedKey)
    const hasPressedKeysToHandle = allowedByMask || isNavKey

    const hasSelection = hasSelectedValue(input)

    const inputPosition = !hasSelection && getInputPosition(input, inputs)

    const initialSelectionStart = input.selectionStart

    window.requestAnimationFrame(() => {
      // Recompute in case refs changed between frames
      const latestInputs = refsToInputList(inputRefs)
      if (!latestInputs.length) return

      if (!hasPressedKeysToHandle || hasSelection) {
        return // stop here
      }

      const caretPosition = getCaretPosition(input)

      const size = Number((input as any).size ?? 0)

      // Handle Backspace on empty inputs: move to previous only if it contains content
      if (pressedKey === 'Backspace' && (input.value ?? '').length === 0) {
        const idx = latestInputs.findIndex((el) => el?.id === input.id)
        const prev = idx > 0 ? latestInputs[idx - 1] : undefined
        if (prev && (prev.value ?? '').length > 0) {
          return goToInput('previous', input, latestInputs)
        }
        return
      }

      // Handle Arrow navigation for empty values using a virtual caret
      if (size > 0 && (input.value ?? '').length === 0) {
        const map = virtualCaretRef.current
        const currentPos = map.get(input) ?? 0
        if (pressedKey === 'ArrowRight') {
          if (currentPos === 0) {
            // Simulate jump to end on first ArrowRight (as with visual mask)
            map.set(input, size)
            return
          } else if (currentPos < size) {
            map.set(input, currentPos + 1)
            return
          } else if (inputPosition !== 'last') {
            map.set(input, 0)
            return goToInput('next', input, latestInputs)
          }
        } else if (pressedKey === 'ArrowLeft') {
          if (currentPos > 0) {
            map.set(input, currentPos - 1)
          } else if (inputPosition !== 'first') {
            return goToInput('previous', input, latestInputs)
          }
          return
        }
      }

      // Arrow navigation based on pre-keydown caret position
      if (pressedKey === 'ArrowRight') {
        const nextPos = Math.min((initialSelectionStart ?? 0) + 1, size)
        if (nextPos >= size && inputPosition !== 'last') {
          return goToInput('next', input, latestInputs)
        }
      }
      if (pressedKey === 'ArrowLeft') {
        const prevPos = Math.max((initialSelectionStart ?? 0) - 1, 0)
        if (prevPos <= 0 && inputPosition !== 'first') {
          return goToInput('previous', input, latestInputs)
        }
      }

      // Auto-advance on data entry when the current input becomes full
      // Use the pre-keydown selectionStart to infer that the key press will fill the field
      if (!isNavKey && allowedByMask) {
        if (
          size > 0 &&
          initialSelectionStart != null &&
          initialSelectionStart >= size - 1 &&
          inputPosition !== 'last'
        ) {
          return goToInput('next', input, latestInputs)
        }
      }

      if (
        caretPosition === 'last' &&
        inputPosition !== 'last' &&
        !(initialSelectionStart === 1 && pressedKey === 'ArrowRight')
      ) {
        return goToInput('next', input, latestInputs)
      }

      if (
        caretPosition === 'first' &&
        inputPosition !== 'first' &&
        !(
          initialSelectionStart === 1 &&
          (pressedKey === 'ArrowLeft' || pressedKey === 'Backspace')
        )
      ) {
        return goToInput('previous', input, latestInputs)
      }
    })
  }

  return { onKeyDown }
}

// Helpers
function refsToInputList(inputRefs: MutableRefObject<HTMLInputElement>[]) {
  const byRefs = inputRefs.map((ref) => ref.current).filter(Boolean)
  if (byRefs.length) return byRefs as HTMLInputElement[]
  // Fallback to DOM query if refs are not ready
  return Array.from(
    document.querySelectorAll<HTMLInputElement>(
      '.dnb-multi-input-mask__input'
    )
  )
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

  // Important: selection can be 0 which is a valid index
  if (selection === undefined || selection === null) {
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
  const end = Number((input as any).size ?? (input as any).maxLength ?? input.value?.length ?? 0)
  return { start: 0, end }
}

function hasSelectedValue(input: HTMLInputElement) {
  return input.selectionEnd > input.selectionStart
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
  const currentInputIndex = inputs.findIndex((el) => el?.id === input.id)

  const siblingIndex =
    to === 'next'
      ? currentInputIndex + 1
      : to === 'previous'
      ? currentInputIndex - 1
      : 0

  const siblingInput = inputs[siblingIndex]
  if (!siblingInput) {
    return
  }

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
